export const TEMPLATE_VARS = {
    AMOUNT: `amount`,
    DESCRIPTION: `description`,
    CARD_NUMBER: `cardNumber`,
    DATE: `date`,
    TIME: `time`,
    REMAINING_CREDIT: `remainingCredit`,
    HOLDER_NAME: `holderName`,
} as const;

type Template = {
    message: string,
    method: PaymentMethod,
    type: TransactionType,
}

type PaymentMethod = {
    name: string,
    type: PaymentMethodType,
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

const V = TEMPLATE_VARS
export const Templates: Template[] = [
    {
        method: PaymentMethods.nubank,
        message: `Compra de R$ [[${V.AMOUNT}]] APROVADA em [[${V.DESCRIPTION}]]`,
        type: 'expense'
    },
    {
        method: PaymentMethods.nubank,
        message: `A compra em [[${V.DESCRIPTION}]] no valor de R$ [[${V.AMOUNT}]] foi estornada.`,
        type: 'refund'
    },
    {
        method: PaymentMethods.nuconta,
        message: `Você recebeu uma transferência de R$ [[${V.AMOUNT}]] de [[${V.DESCRIPTION}]].`,
        type: 'revenue',
    },
    {
        method: PaymentMethods.pda,
        type: 'expense',
        message: `Compra aprovada no PAO ACUCAR VS PLAT p/ [[${V.HOLDER_NAME}]] - [[${V.DESCRIPTION}]] valor RS [[${V.AMOUNT}]] em [[${V.DATE}]] as [[${V.TIME}]].`,

    },
    {
        method: PaymentMethods.pda,
        type: 'refund',
        message: `Confirmamos o estorno da compra no seu PAO ACUCAR VS PLAT p/ [[${V.HOLDER_NAME}]] - [[${V.DESCRIPTION}]] valor RS [[${V.AMOUNT}]] em [[${V.DATE}]] as [[${V.TIME}]].`,
    },
    {
        method: PaymentMethods.caixa,
        type: 'expense',
        message: `CAIXA: Compra aprovada [[${V.DESCRIPTION}]] R$ [[${V.AMOUNT}]] [[${V.DATE}]] as [[${V.TIME}]], VISA final [[${V.CARD_NUMBER}]]. Caso nao reconheca a transacao, envie BL1759 p/cancelar cartao`,
    },
    {
        method: PaymentMethods.caixa,
        type: 'refund',
        message: `CAIXA: Compra CANCELADA no [[${V.DESCRIPTION}]] R$ [[${V.AMOUNT}]], [[${V.DATE}]] as [[${V.TIME}]] VISA final [[${V.CARD_NUMBER}]]. Duvidas: 4004-0104 OU 0800-104-0104.`
    }
];