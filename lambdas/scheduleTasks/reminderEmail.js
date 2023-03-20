
const AWS = require('aws-sdk')
const Responses = require('../common/API_Responses')

const SES = new AWS.SES()

exports.handler = async event =>{
    console.log("event", event);
    const message = `hey Sam
    Dont forger to fils next videos `
    const params = {
        Destination :{
            ToAddresses: ['jaimenestares1210@gmail.com']
        },
        Message:{
            Body:{
                Text:{ Data: message}
            },
            Subject:{
                Data: 'reminder email'
            }
        },
        Source: 'jaimenestares1210@gmail.com'
    }
    try {
        await SES.sendEmail(params).promise()
        return Responses._200({message:'email send'})
    } catch (error) {
        console.log("ERRORR-->", error);
        return Responses._400({message:'Falided email'})
    }
}