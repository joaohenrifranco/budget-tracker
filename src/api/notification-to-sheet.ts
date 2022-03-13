import dotenv from 'dotenv';
dotenv.config();
import { Handler } from "@netlify/functions";
import { ProcessNotification } from "../services/process-notification";
import { AddToSheets } from "../services/add-to-sheets";
import { NormalizeData } from '../services/normalize-data';

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

        if (!notificationMessage) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Missing notificationMessage",
                }),
            };
        }

        const notificationData = ProcessNotification.execute(notificationMessage);
        console.log("Notification data:", notificationData);

        const normalizedData = NormalizeData.execute(notificationMessage);
        console.log("Normalized data:", normalizedData);
        
        const response = await AddToSheets.execute(normalizedData);

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
};

export { handler };