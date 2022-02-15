// const Airtable = require('airtable')
// /** The next 2 lines refer to environment variables configured in Netlify settings (found in "Site settings > Build & deploy > Environment" as of this writing) */
// const { AIRTABLE_API_KEY } = process.env
// const { AIRTABLE_BASE_ID } = process.env
// const at_base = new Airtable({
// 		apiKey: AIRTABLE_API_KEY
// 	})
// 	.base(AIRTABLE_BASE_ID)
// const at_table_movies = at_base('movies')

export async function handler(event, context, callback) {
    return {
        "statusCode": 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event,
            context,
            callback,
        })
    }
}