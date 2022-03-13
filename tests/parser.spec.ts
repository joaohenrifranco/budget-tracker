import { ReverseParser } from '../src/utils/reverse-parser';

describe('ReverseParser', () => {
    it('should reverse message from template correctly', () => {
        const message = "Compra de R$ 100,00 APROVADA em LOJA ABC em 01/01/2020 as 10:00.";
        const template = "Compra de R$ [[amount]] APROVADA em [[description]] em [[date]] as [[time]].";
        const startSeparator = "\[\[";
        const endSeparator = "\]\]";
        const parser = new ReverseParser(
            template,
            startSeparator,
            endSeparator
        )

        const values = parser.parse(message);

        expect(values).toEqual({
            amount: '100,00',
            description: 'LOJA ABC',
            date: '01/01/2020',
            time: '10:00'
        });
    });
});
