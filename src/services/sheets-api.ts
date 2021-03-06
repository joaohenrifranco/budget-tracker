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

async function insertRow(rowData: string[]) {
    const sheetsInstance = await createSheetsInstance(gapiCredentials);

    const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: process.env.SPREADSHEET_RANGE,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            majorDimension: "ROWS",
            values: [ rowData ]
        },
    };


    return (await sheetsInstance.spreadsheets.values.append(request)).data;
}

export const SheetsAPI = { insertRow };