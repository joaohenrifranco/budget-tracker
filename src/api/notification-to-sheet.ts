import { Handler } from "@netlify/functions";
import { ProcessNotification } from "../services/process-notification";
import { SheetsAPI } from "../services/sheets-api";
import { NormalizeData } from '../services/normalize-data';

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

        const normalizedData = NormalizeData.execute({ ...notificationData, receivedAt });

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
    const response = await run(body);

    return response;
};

export { handler };