import { google } from 'googleapis';
import { gapiCredentials } from '../config/gapi-credentials';

async function createSheetsInstance(credentials: typeof gapiCredentials) {
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const authClient = await auth.getClient();
    return google.sheets({ version: 'v4', auth: authClient });
}

async function execute(dataDict: { [key: string]: string }) {
    const sheetsInstance = await createSheetsInstance(gapiCredentials);

    const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'A1:Z9999',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [
                dataDict.date, 
                dataDict.method, 
                dataDict.type, 
                "", 
                "", 
                dataDict.description, 
                dataDict.amount
            ]
        },

        // auth: authClient,
    };

    try {
        const response = (await sheetsInstance.spreadsheets.values.append(request)).data;
        console.log(JSON.stringify(response, null, 2));
    } catch (err) {
        console.error(err);
    }

}

export const AddToSheets = { execute };