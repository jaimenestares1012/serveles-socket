
import * as AWS from 'aws-sdk'

const SES = new AWS.SES()
exports.handler = async event =>{
    console.log("evente", event);
    const email = event.Input.Payload.email

    const message =   `Hi, 
    we saw that yoy signed up for our gaming but haven't palyed yet.
    we hope you play soon`
    const params = {
        Destination: {
          ToAddresses: [email]
        },
        Message: {
          Body: {
            Text: { Data: message }
          },
          Subject: { Data: 'Remember to use gaming plataform' }
        },
        Source: 'jaimenestares1210@gmail.com'
      };
    try {
        await SES.sendEmail(params).promise()
        return 
    } catch (error) {
        console.log("error send email", error);
        throw error
    }
}