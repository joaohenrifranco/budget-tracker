import { Handler, APIGatewayEvent, Context } from `@netlify/functions`;

const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello World` }),
    };
};

export { handler };