export type Template = {
    message: string,
    type: "refund" | "expense" | "revenue"
}

type PaymentMethod = {
    label: string,
    appName: string,
    templates: Template[],
}

export const VARIABLES = {
    amount: `amount`,
    description: `description`,
    cardNumber: `cardNumber`,
    date: `date`,
    time: `time`,
    remainingCredit: `remainingCredit`,
}

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        label: `Nuconta`,
        appName: `Nubank`,
        templates: [
            {
                message: `Compra de R$ [[${VARIABLES.amount}]] APROVADA em [[${VARIABLES.description}]]`,
                type: 'expense'
            },
            {
                message: `A compra em [[${VARIABLES.description}]] no valor de R$ [[${VARIABLES.amount}]] foi estornada.`,
                type: 'refund'
            }
        ]
    },
    {
        label: `Nubank`,
        appName: `Nubank`,
        templates: [
            {
                type: 'revenue',
                message: `Você recebeu uma transferência de R$ [[${VARIABLES.amount}]] de [[${VARIABLES.description}]].`
            }
        ],
    },
    {
        label: `Itaú PDA`,
        appName: `Mensagens`,
        templates: [
            {
                type: 'expense',
                message: `Compra aprovada no seu PAO ACUCAR VS PLAT final [[${VARIABLES.cardNumber}]] - [[${VARIABLES.description}]] valor RS [[${VARIABLES.amount}]] em [[${VARIABLES.date}]] as [[${VARIABLES.time}]]. Limite Disponivel de [[${VARIABLES.remainingCredit}]].`,

            },
            {
                type: 'refund',
                message: `Confirmamos o estorno da compra no seu PAO ACUCAR VS PLAT final [[${VARIABLES.cardNumber}]] - [[${VARIABLES.description}]] valor RS [[${VARIABLES.amount}]] em [[${VARIABLES.date}]] as [[${VARIABLES.time}]].`,

            }
        ],
    },
    {
        label: `Caixa`,
        appName: `Mensagens`,
        templates: [
            {
                type: 'expense',
                message: `CAIXA: Compra aprovada [[${VARIABLES.description}]] R$ [[${VARIABLES.amount}]] [[${VARIABLES.date}]] as [[${VARIABLES.time}]], VISA final [[${VARIABLES.cardNumber}]]. Caso nao reconheca a transacao, envie BL1759 p/cancelar cartao`,
            },
            {
                type: 'refund',
                message: `CAIXA: Compra CANCELADA no [[${VARIABLES.description}]] R$ [[${VARIABLES.amount}]], [[${VARIABLES.date}]] as [[${VARIABLES.time}]] VISA final [[${VARIABLES.cardNumber}]]. Duvidas: 4004-0104 OU 0800-104-0104.`
            }
        ]

    }
]