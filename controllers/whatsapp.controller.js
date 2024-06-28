const twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountToken = process.env.TWILIO_AUTH_TOKEN; 
const client = new twilio(accountSid,accountToken);
exports.sendMessage = (to,message)=>{
    client.messages.create({
        body: message,
        from : 'whatsapp:+14155238886',
        to: `whatsapp:+1${to}`
    }).then(message=> console.log(message))
    .catch(error=>console.log(error));
}