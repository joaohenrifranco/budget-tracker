import { PAYMENT_METHODS, PaymentMethod, Template } from '../config/notifications';
import { ReverseParser } from '../utils/reverse-parser';

function matchTemplate(message: string) {
    const templates = PAYMENT_METHODS.reduce((templates: Template[], paymentMethod: PaymentMethod) => {
        return templates.concat(paymentMethod.templates)
    }, []);

    const match = templates.reduce((currentMatch, template) => {
        const literals = template.message.replace(/\[\[.*?\]\]/g, "").split(" ").filter(Boolean);
        const expectedScore = literals.length;
        const score = literals.filter(word => message.includes(word)).length;
        return score < currentMatch.score ? currentMatch : { score, template, expectedScore };
    }, { template: templates[0], score: 0, expectedScore: 0 })

    if (match.score !== match.expectedScore) {
        console.warn("Match is not perfect. Please adjust your config file.", message, match);
    }

    return match.template;
}

export function execute(message: string) {
    const template = matchTemplate(message);
    const parser = new ReverseParser(template.message);
    const parsedMessage = parser.parse(message);
    return parsedMessage;
}