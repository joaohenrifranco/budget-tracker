import dotenv from 'dotenv';
dotenv.config();
import { Handler } from "@netlify/functions";
import { ProcessNotification } from "../services/process-notification";
import { AddToSheets } from "../services/add-to-sheets";
import { NormalizeData } from '../services/normalize-data';

async function process(body: string | null): Promise<{ statusCode: number, body: string }> {
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

        const lastLine = notificationMessage.split('\n').pop();

        const notificationData = ProcessNotification.execute(lastLine);

        if (!notificationData) {
            return {
                statusCode: 200,
                body: "No template matched.",
            };
        }

        const normalizedData = NormalizeData.execute({ ...notificationData, receivedAt });

        const response: any = await AddToSheets.execute(normalizedData);

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
    const response = await process(body);

    console.log(body);
    console.log(response);

    return response;
};

export { handler };