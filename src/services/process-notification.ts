import { Templates } from '../config/notifications';
import { ReverseParser } from '../utils/reverse-parser';

function matchTemplate(message: string) {
    const match = Templates.reduce((currentMatch, template) => {
        const literals = template.message.replace(/\[\[.*?\]\]/g, "").split(" ").filter(Boolean);
        const expectedScore = literals.length;
        const score = literals.filter((word: string) => message.includes(word)).length;
        const error = Math.abs(expectedScore - score)
        return error > currentMatch.error ? currentMatch : { template, error };
    }, { template: Templates[0], error: Infinity })

    // Completely arbitrary threshold
    if (match.error > 2) {
        return null;
    }

    return match.template;
}

function execute(message: string) {
    const template = matchTemplate(message);

    if (!template) {
        return null;
    }

    const parser = new ReverseParser(template.message);
    const parsedMessage = parser.parse(message);
    
    return {
        methodName: template.method.name,
        methodType: template.method.type,
        transactionType: template.type,
        ...parsedMessage,
    }
}

export const ProcessNotification = { execute };