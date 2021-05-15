const superagent = require('superagent');
exports.handler = async function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  let inbMsg = event.Body.trim();
  superagent.get(
    `https://api.notion.com/v1/databases/920339cdab384bb29f087c10336cce32/`)
    .set('Authorization', `Bearer ${context.NOTION_API_KEY}`)
    .end((err, res) => {
      twiml.message(res.text);
      callback(null, twiml);
    })
  
};
