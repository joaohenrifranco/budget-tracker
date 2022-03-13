import { Handler, APIGatewayEvent, Context } from `@netlify/functions`;
import process from "../services/proccess-notification";
 
const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
    const { body } = event;

    const { notificationTitle, appName, notificationMessage, receivedAt } = JSON.parse(body);

    const execute(notificationMessage);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello World` }),
    };
};

export { handler };