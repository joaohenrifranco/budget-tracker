import { TEMPLATE_VARS } from "../config/notifications";

const methodTypeLabels = {
    'debit': 'Débito',
    'credit': 'Crédito',
}

// Values of TEMPLATE_VARS
type VariableInputDataDict = {
    [key in typeof TEMPLATE_VARS[keyof typeof TEMPLATE_VARS]]?: string;
}

type InputDataDict = {
    receivedAt: string,
    methodName: string,
    methodType: PaymentMethodType,
    transactionType: TransactionType,
} & VariableInputDataDict;

function execute(inputDataDict: InputDataDict): string[] {
    const data = {
        moment: inputDataDict.receivedAt,
        methodName: inputDataDict.methodName,
        methodType: methodTypeLabels[inputDataDict.methodType as keyof typeof methodTypeLabels],
        budget: "FILL",
        category: "FILL",
        description: inputDataDict.description,
        amount: inputDataDict.transactionType !== 'expense' ? inputDataDict.amount : '-' + inputDataDict.amount,
    };

    return Object.keys(data).map(key => data[key]);
}

export const BuildRow = {
    execute
}