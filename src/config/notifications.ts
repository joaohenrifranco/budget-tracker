const VARS = {
    AMOUNT: `amount`,
    DESCRIPTION: `description`,
    CARD_NUMBER: `cardNumber`,
    DATE: `date`,
    TIME: `time`,
    REMAINING_CREDIT: `remainingCredit`,
}

type Template = {
    message: string,
    method: PaymentMethod,
    type: "refund" | "expense" | "revenue"
}

type PaymentMethod = {
    name: string,
    type: 'debit' | 'credit',
}

const PaymentMethods: { [key: string]: PaymentMethod } = {
    nubank: {
        name: `Nubank`,
        type: 'credit',
    },
    nuconta: {
        name: 'Nuconta',
        type: 'debit',
    },
    pda: {
        name: 'PDA Itaucard',
        type: 'credit',
    },
    caixa: {
        name: 'Caixa',
        type: 'debit',
    }
}

export const Templates: Template[] = [
    {
        method: PaymentMethods.nubank,
        message: `Compra de R$ [[${VARS.AMOUNT}]] APROVADA em [[${VARS.DESCRIPTION}]]`,
        type: 'expense'
    },
    {
        method: PaymentMethods.nubank,
        message: `A compra em [[${VARS.DESCRIPTION}]] no valor de R$ [[${VARS.AMOUNT}]] foi estornada.`,
        type: 'refund'
    },
    {
        method: PaymentMethods.nuconta,
        message: `Você recebeu uma transferência de R$ [[${VARS.AMOUNT}]] de [[${VARS.DESCRIPTION}]].`,
        type: 'revenue',
    },
    {
        method: PaymentMethods.pda,
        type: 'expense',
        message: `Compra aprovada no seu PAO ACUCAR VS PLAT final [[${VARS.CARD_NUMBER}]] - [[${VARS.DESCRIPTION}]] valor RS [[${VARS.AMOUNT}]] em [[${VARS.DATE}]] as [[${VARS.TIME}]]. Limite Disponivel de [[${VARS.REMAINING_CREDIT}]].`,

    },
    {
        method: PaymentMethods.pda,
        type: 'refund',
        message: `Confirmamos o estorno da compra no seu PAO ACUCAR VS PLAT final [[${VARS.CARD_NUMBER}]] - [[${VARS.DESCRIPTION}]] valor RS [[${VARS.AMOUNT}]] em [[${VARS.DATE}]] as [[${VARS.TIME}]].`,

    },
    {
        method: PaymentMethods.caixa,
        type: 'expense',
        message: `CAIXA: Compra aprovada [[${VARS.DESCRIPTION}]] R$ [[${VARS.AMOUNT}]] [[${VARS.DATE}]] as [[${VARS.TIME}]], VISA final [[${VARS.CARD_NUMBER}]]. Caso nao reconheca a transacao, envie BL1759 p/cancelar cartao`,
    },
    {
        method: PaymentMethods.caixa,
        type: 'refund',
        message: `CAIXA: Compra CANCELADA no [[${VARS.DESCRIPTION}]] R$ [[${VARS.AMOUNT}]], [[${VARS.DATE}]] as [[${VARS.TIME}]] VISA final [[${VARS.CARD_NUMBER}]]. Duvidas: 4004-0104 OU 0800-104-0104.`
    }
];