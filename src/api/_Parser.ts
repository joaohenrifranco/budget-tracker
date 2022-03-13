class ReverseParser {
    template: string;
    regex: RegExp;

    getRegex(startSeparator: string, endSeparator?: string): RegExp {
        return new RegExp(`(?<=is ${startSeparator})(.*?)(?=\s*${endSeparator || startSeparator})`, 'g');
    }

    constructor(template: string, startSeparator: string, endSeparator?: string) {
        this.template = template;
        this.regex = this.getRegex(startSeparator, endSeparator)
    }

    getExtractedValues(message: string) {
        const messageMatches = this.regex.exec(message);
        const templateMatches = this.regex.exec(this.template);

        console.log(messageMatches, templateMatches);

        if (!messageMatches || !templateMatches) {
            throw new Error('Invalid message or template');
        }

        return messageMatches.reduce((acc: {[key: string]: string}, msgMatch: string) => {
            const templateMatch = templateMatches.shift();
            if (!templateMatch || !msgMatch) return acc;
            acc[templateMatch] = msgMatch;
            return acc;
        }, {});
    }
}

export { ReverseParser };