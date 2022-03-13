type Template = {
    message: string,
    type: "refund" | "expense" | "revenue"
}

type PaymentMethod = {
    label: string,
    appName: string,
    templates: Template[],
}

const VARS = {
    AMOUNT: `AMOUNT`,
    DESCRIPTION: `DESCRIPTION`,
    CARD_NUMBER: `CARD_NUMBER`,
    DATE: `DATE`,
    TIME: `TIME`,
    REMAINING_CREDIT: `REMAINING_CREDIT`,
}

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        label: `Nubank`,
        appName: `Nubank`,
        templates: [
            {
                message: `Compra de R$ [[${VARS.AMOUNT}]] APROVADA em [[${VARS.DESCRIPTION}]]`,
                type: 'expense'
            },
            {
                message: `A compra em [[${VARS.DESCRIPTION}]] no valor de R$ [[${VARS.AMOUNT}]] foi estornada.`,
                type: 'refund'
            }
        ]
    },
    {
        label: `Nuconta`,
        appName: `Nubank`,
        templates: [
            {
                type: 'revenue',
                message: `Você recebeu uma transferência de R$ [[${VARS.AMOUNT}]] de [[${VARS.DESCRIPTION}]].`
            }
        ],
    },
    {
        label: `Itaú PDA`,
        appName: `Mensagens`,
        templates: [
            {
                type: 'expense',
                message: `Compra aprovada no seu PAO ACUCAR VS PLAT final [[${VARS.CARD_NUMBER}]] - [[${VARS.DESCRIPTION}]] valor RS [[${VARS.AMOUNT}]] em [[${VARS.DATE}]] as [[${VARS.TIME}]]. Limite Disponivel de [[${VARS.REMAINING_CREDIT}]].`,

            },
            {
                type: 'refund',
                message: `Confirmamos o estorno da compra no seu PAO ACUCAR VS PLAT final [[${VARS.CARD_NUMBER}]] - [[${VARS.DESCRIPTION}]] valor RS [[${VARS.AMOUNT}]] em [[${VARS.DATE}]] as [[${VARS.TIME}]].`,

            }
        ],
    },
    {
        label: `Caixa`,
        appName: `Mensagens`,
        templates: [
            {
                type: 'expense',
                message: `CAIXA: Compra aprovada [[${VARS.DESCRIPTION}]] R$ [[${VARS.AMOUNT}]] [[${VARS.DATE}]] as [[${VARS.TIME}]], VISA final [[${VARS.CARD_NUMBER}]]. Caso nao reconheca a transacao, envie BL1759 p/cancelar cartao`,
            },
            {
                type: 'refund',
                message: `CAIXA: Compra CANCELADA no [[${VARS.DESCRIPTION}]] R$ [[${VARS.AMOUNT}]], [[${VARS.DATE}]] as [[${VARS.TIME}]] VISA final [[${VARS.CARD_NUMBER}]]. Duvidas: 4004-0104 OU 0800-104-0104.`
            }
        ]

    }
]