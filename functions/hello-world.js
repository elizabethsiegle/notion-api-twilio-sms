const superagent = require('superagent');
const fetch = require('node-fetch');
exports.handler = async function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  let inbMsg = event.Body.trim();
  superagent.post(`https://api.notion.com/v1/pages`, 
  { "parent": { 
    "database_id": `${context.NOTION_DB_ID}`
  }, "properties": 
  { "Name": 
  { "title": 
  [ { "text": { "content": `${inbMsg}` } } ] } } })
  .set('Authorization', `Bearer ${context.NOTION_API_KEY}`)
  .set('Content-Type', 'application/json')
  .set('Notion-Version', '2021-05-13')
  .end((err, res) => {
    twiml.message(`posted ${inbMsg} to the database!`);
    callback(null, twiml);
  });
};
