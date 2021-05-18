const superagent = require('superagent');
exports.handler = async function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  let inbMsg = event.Body.trim();
  let propObj;
  
  if(inbMsg.includes(",")) {
    let firstCell = inbMsg.split(',')[0];
    let secondCell = inbMsg.split(',')[1];
    propObj = {
      "Time": [
        {
          "text": {
            "content": `${firstCell}`
          }
        }
      ],
      "Topic": [
        {
          "text": {
            "content": `${secondCell}`
          }
        }
      ],
    }
  }
  else {
    propObj = {
      "Time": [
        {
          "text": {
            "content": `${inbMsg}`
          }
        }
      ]
    }
  }
  superagent.post(`https://api.notion.com/v1/pages`, 
  { "parent": { 
    "database_id": `${context.NOTION_DB_ID}`
  }, "properties": propObj
})
  .set('Authorization', `Bearer ${context.NOTION_API_KEY}`)
  .set('Content-Type', 'application/json')
  .set('Notion-Version', '2021-05-13')
  .end((err, res) => {
    twiml.message(`posted ${inbMsg} to the database!`);
    callback(null, twiml);
  });
};