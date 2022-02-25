import { PAYMENT_METHODS } from "./config.js";

function matchTemplate(message: string) {
    const templates = PAYMENT_METHODS.reduce((acc, paymentMethod) => {
        return acc.concat(paymentMethod.templates)
    }, [])

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

export function parseTemplate(message: string) {
    const template = matchTemplate(message);
    const literals = template.message.replace(/\[\[.*?\]\]/g, "").split(" ").filter(Boolean);
    const templateVariables = template.message.match(/\[\[.*?\]\]/g).map(variable => variable.replace(/\[\[|\]\]/g, ""));
    const messageWords = message.split(" ");

    let variableIndex = 0;
    let isReadingVariable = false;
    let literalIndex = 0;
    const parsedData = {};
    messageWords.forEach((word) => {
        if (word === literals[literalIndex] && isReadingVariable) {
            console.log(word, literals[literalIndex], isReadingVariable, templateVariables[variableIndex]);

            isReadingVariable = false;
            literalIndex++;
            variableIndex++;

            return;
        }


        if (word === literals[literalIndex] && !isReadingVariable) {
            console.log(word, literals[literalIndex], isReadingVariable, templateVariables[variableIndex]);

            literalIndex ++;

            return;
        }

        if (word.endsWith(literals[literalIndex]) && isReadingVariable) {
            console.log(word, literals[literalIndex], isReadingVariable, templateVariables[variableIndex]);


            isReadingVariable = false;
            literalIndex++;
            variableIndex++;
            parsedData[templateVariables[variableIndex]] = parsedData[templateVariables[variableIndex]] || "" + word.replace(literals[literalIndex], "") + " ";
            return;
        }

        if (word.endsWith(literals[literalIndex]) && !isReadingVariable) {
            console.log(word, literals[literalIndex], isReadingVariable, templateVariables[variableIndex], literals[literalIndex]);
            parsedData[templateVariables[variableIndex]] = parsedData[templateVariables[variableIndex]] || "" + word.replace(literals[literalIndex], "") + " ";

            variableIndex++;

            literalIndex++;
            return;
        }


        console.log(word, literals[literalIndex], isReadingVariable);

        console.log("append", templateVariables[variableIndex], word)
        isReadingVariable = true;
        parsedData[templateVariables[variableIndex]] = parsedData[templateVariables[variableIndex]] || "" + word + " ";
    })


    return parsedData
}

export function parseMessage(message: string) {
    const lastLine = message.split("\n").pop();
    return parseTemplate(lastLine);
}

console.log(parseMessage("Compra aprovada no seu PAO ACUCAR VS PLAT final 3871 - PAG*NETPDVSOLUCOES valor RS 52,00 em 13/02/2022 as 21h00. Limite Disponivel de 4.047,49.\nCompra aprovada no seu PAO ACUCAR VS PLAT final 3871 - PAG*NETPDVSOLUCOES valor RS 52,00 em 14/02/2022 as 00h23. Limite Disponivel de 3.995,49.\nCompra aprovada no seu PAO ACUCAR VS PLAT final 3871 - PAG*NETPDVSOLUCOES valor RS 8,00 em 14/02/2022 as 01h26. Limite Disponivel de 3.987,49.\nCompra aprovada no seu PAO ACUCAR VS PLAT final 3871 - PAG*NETPDVSOLUCOES valor RS 40,00 em 14/02/2022 as 01h30. Limite Disponivel de 3.947,49.\nCompra aprovada no seu PAO ACUCAR VS PLAT final 3871 - PAG*NETPDVSOLUCOES valor RS 8,00 em 14/02/2022 as 02h20. Limite Disponivel de 3.939,49.\nCompra aprovada no seu PAO ACUCAR VS PLAT final 3871 - PAG*NETPDVSOLUCOES valor RS 16,00 em 14/02/2022 as 03h39. Limite Disponivel de 3.923,49."))