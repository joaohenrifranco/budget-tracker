import { Handler } from "@netlify/functions";

const variables = {
    amount: "amount",
    description: "description",
    cardNumber: "cardNumber",
    date: "date",
    time: "time",
    remainingCredit: "remainingCredit",
}

const payment_methods = [
    {
        label: "Nuconta",
        appName: "Nubank",
        templates: {
            expense: "Compra de R$ [[${variables.amount}]] APROVADA em [[${variables.description}]]",
            refund: "A compra em [[${variables.description}]] no valor de R$ [[${variables.amount}]] foi estornada."
        }
    },
    {
        label: "Nubank",
        appName: "Nubank",
        templates: {
            revenue: "Você recebeu uma transferência de R$ [[${variables.amount}]] de [[${variables.description}]]."
        }
    },
    {
        label: "Itaú PDA",
        template: {
            expense: "Compra aprovada no seu PAO ACUCAR VS PLAT final [[${variables.cardNumber}]] - [[${variables.description}]] valor RS {{}} em [[${variables.date}]] as [[${variables.time}]]. Limite Disponivel de {{remainingCredit}}.",
            refund: "Confirmamos o estorno da compra no seu PAO ACUCAR VS PLAT final [[${variables.cardNumber}]] - [[${variables.description}]] valor RS [[${variables.amount}]] em [[${variables.date}]] as [[${variables.time}]]."
        }
    },
    {
        label: "Caixa",
        template: {
            expense: "CAIXA: Compra aprovada [[${variables.description}]] R$ [[${variables.amount}]] [[${variables.date}]] as [[${variables.time}]], VISA final [[${variables.cardNumber}]]. Caso nao reconheca a transacao, envie BL1759 p/cancelar cartao"
        }
    },

]

function match() {

}

const handler: Handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World" }),
    };
};

export { handler };