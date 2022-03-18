const AUX_SEPARATOR ="|";
class ReverseParser {
    template: string;
    templateMatches: RegExpExecArray[];
    templateVariableNames: string[];

    constructor(template: string) {
        this.template = template;
        this.templateMatches = this.getTemplateMatches();
        this.templateVariableNames = this.getTemplateVariableNames();
    }

    private getTemplateMatches(): RegExpExecArray[] {
        const regex = new RegExp(/\[\[(.*?)\]\]/, "g");
        const matches = [];
        let match;
        while (match !== null) {
            match = regex.exec(this.template);
            if (match) {
                matches.push(match);
            }
        }
        return matches;
    }

    private getTemplateVariableNames(): string[] {
        return this.templateMatches
            .map(templateMatch => templateMatch[0]
            .replace("[[", "")
            .replace("]]", ""));
    }


    parse(message: string) {
        const messageLiterals = this.templateMatches.reduce((acc: string, templateMatch: RegExpExecArray) => {
            acc = acc.replace(templateMatch[0], AUX_SEPARATOR);
            return acc;
        }, this.template).split(AUX_SEPARATOR).filter(Boolean);

        const messageVariables = messageLiterals.reduce((acc: {original: string, splitted: string}, curr: string) => {
            const replaced = acc.original.replace(curr, AUX_SEPARATOR);
            const parts = replaced.split(AUX_SEPARATOR).filter(Boolean);

            if (parts.length > 1) {
                return {
                    original: parts[1],
                    splitted: acc.splitted + parts[0] + AUX_SEPARATOR
                }
            }
            return {
                original: replaced,
                splitted: acc.splitted
        }}, {
            original: message,
            splitted: "",
        }).splitted.split(AUX_SEPARATOR).filter(Boolean);

        if (!messageVariables) {
            throw new Error('Invalid message or template');
        }

        const variableNameQueue = [...this.templateVariableNames];

        return messageVariables.reduce((acc: {[key: string]: string}, msgMatch: string) => {
            const templateMatch = variableNameQueue.shift();
            if (!templateMatch || !msgMatch) return acc;
            acc[templateMatch] = msgMatch;
            return acc;
        }, {});
    }
}

export { ReverseParser };