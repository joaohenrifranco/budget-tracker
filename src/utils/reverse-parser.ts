const AUX_SEPARATOR ="|";
class ReverseParser {
    template: string;
    templateMatches: RegExpExecArray[];
    templateVariableNames: string[];
    // startSeparator: string;
    // endSeparator: string;

    constructor(template: string) {
        this.template = template;
        // this.startSeparator = startSeparator;
        // this.endSeparator = endSeparator || startSeparator;
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


        const messageVariables = messageLiterals.reduce((acc: string, curr: string) => {
            acc = acc.replace(curr, AUX_SEPARATOR);
            return acc;
        }, message).split(AUX_SEPARATOR).filter(Boolean);;

        
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