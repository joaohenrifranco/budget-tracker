import { Templates } from '../config/notifications';
import { ReverseParser } from '../utils/reverse-parser';

function matchTemplate(message: string) {
    const match = Templates.reduce((currentMatch, template) => {
        const literals = template.message.replace(/\[\[.*?\]\]/g, "").split(" ").filter(Boolean);
        const expectedScore = literals.length;
        const score = literals.filter((word: string) => message.includes(word)).length;
        return score < currentMatch.score ? currentMatch : { score, template, expectedScore };
    }, { template: Templates[0], score: 0, expectedScore: 0 })

    if (match.score !== match.expectedScore) {
        console.warn("Match is not perfect. Please adjust your config file.", message, match);
    }

    return match.template;
}

function execute(message: string) {
    const template = matchTemplate(message);
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