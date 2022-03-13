# Budget Tracker
- Webhook that takes android notifications captured by IFTTT, parses its text and inserts rows in a Google Sheet.
- It currently parses some notifications from the following brazilian banks: Nubank, Caixa and Itaucard.
- This repository is structured in order to work with Netlify lambda functions.

## How to deploy

### Setup Google API
- Create a project in console.cloud.google.com
- Add Google Sheets API
- Generate service credentials for the Google Sheets API
- Download the JSON file containing the credentials 
- Fill `.env` file using the downloaded JSON file

### Setup Google Sheet
- Create new sheet or choose existing on google drive
- Share sheet via web interface with your service account email (created above)
- Fill spreadsheet id in `.env` file (found in the url: docs.google.com/spreadsheets/d/SPREADSHEET_ID)
- Fill the spreadsheet range in the A1 format (something like `Sheet1!A1:G1`)

### Deploy service on Netlify
- Fork this repository
- Select it on Netlify web interface
- You may use netlify CLI to automatically upload your env vars from `.env`:
    `netlify env:import .env`
- Should work without any additional config

## Customizing
- Templates are easily extended by altering the `config/notifications.ts` file