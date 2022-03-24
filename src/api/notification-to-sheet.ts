import { Handler } from "@netlify/functions";
import { ProcessNotification } from "../services/process-notification";
import { SheetsAPI } from "../services/sheets-api";
import { BuildRow } from '../services/build-row';

async function run(body: string | null): Promise<{ statusCode: number, body: string }> {
    try {
        if (!body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Missing body.",
                }),
            };
        }

        const {
            notificationTitle,
            appName,
            notificationMessage,
            receivedAt
        } = JSON.parse(body);

        if (!notificationMessage || !receivedAt) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Missing params.",
                }),
            };
        }

        const lastLine = notificationMessage.split('\\n').pop();

        const notificationData = ProcessNotification.execute(lastLine);

        if (!notificationData) {
            return {
                statusCode: 200,
                body: "No template matched.",
            };
        }

        console.log(`Parsed data: ${JSON.stringify(notificationData)}`);

        const normalizedData = BuildRow.execute({ ...notificationData, receivedAt });

        console.log(`Inserting row: ${normalizedData}`);

        const response: any = await SheetsAPI.insertRow(normalizedData);

        if (!response || (response.code && response.code !== 200)) {
            return {
                statusCode: response.code || 500,
                body: response.errors && response.errors.join(', '),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: (error as Error).message }),
        };
    }
}


const handler: Handler = async (event, context) => {
    const { body } = event;
    console.log("Received:", body); 

    const response = await run(body);
    console.log("Returning:", response); 

    return response;
};

export { handler };