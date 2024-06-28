const twilio = require('twilio')
const accountSid = process.env.TWILIO_ACCOUNT;
const accountToken = process.env.TWILIO_PASS; 
if (!accountToken) {
    throw new Error('TWILIO_PASS no está definido en el archivo .env');
  }
const client = new twilio(accountSid,accountToken);
exports.sendMessage = (to,message)=>{
    client.messages.create({
        body: message,
        from : 'whatsapp:+14155238886',
        to: `whatsapp:+1${to}`
    }).then(message=> console.log(message.sid))
    .catch(error=>console.log(error));
}