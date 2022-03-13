import dotenv from 'dotenv';
dotenv.config();
import { Handler } from "@netlify/functions";
import { ProcessNotification } from "../services/process-notification";
import { AddToSheets } from "../services/add-to-sheets";

const handler: Handler = async (event, context) => {
    try {
        const { body } = event;

        if (!body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Missing body",
                }),
            };
        }

        const {
            notificationTitle,
            appName,
            notificationMessage,
            receivedAt
        } = JSON.parse(body);

        const notificationData = ProcessNotification.execute(notificationMessage);
        const response = await AddToSheets.execute(notificationData);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Hello World` }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error }),
        };
    }
};

export { handler };