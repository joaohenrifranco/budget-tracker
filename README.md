# Budget Tracker
Webhook that takes android notifications captured by IFTTT, parses its text and appends in a Google Sheet with the data.

It currently parses some notifications from the following brazilian banks: Nubank, Caixa and Itaucard.

This repository is structured in order to work with Netlify lambda functions.

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
    ```sh
    $ netlify env:import .env
    ```
- Should work without any additional config

### Setup IFTTT
- Create new applet
- Setup trigger: If > Android Notification
- Setup action: Webhooks > Make web request
    - URL: `https://YOUR-APP-URL/.netlify/functions/notification-to-sheet`
    - Method: POST
    - Content-type: application/json
    - Additional headers: none
    - Body:
    ```json
    {
        "receivedAt": "{{ReceivedAt}}",
        "notificationMessage": "{{NotificationMessage}}"
    }
    ```

## Customizing
- Templates are easily extended by altering the `config/notifications.ts` file

## Todo
- Basic authentication via secret
