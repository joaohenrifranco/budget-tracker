import { google } from 'googleapis';
import { gapiCredentials } from '../config/gapi-credentials';
import { NormalizeData } from './normalize-data';

async function createSheetsInstance(credentials: typeof gapiCredentials) {
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const authClient = await auth.getClient();
    return google.sheets({ version: 'v4', auth: authClient });
}

async function execute(dataDict: NormalizeData) {
    const sheetsInstance = await createSheetsInstance(gapiCredentials);

    const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Página2!A1:G1',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            majorDimension: "ROWS",
            values: [
                [
                    dataDict.moment,
                    dataDict.methodName,
                    dataDict.methodType,
                    "FILL",
                    "FILL",
                    dataDict.description,
                    dataDict.amount
                ]
            ]
        },
    };


    const response = (await sheetsInstance.spreadsheets.values.append(request)).data;
    return response;
}

export const AddToSheets = { execute };