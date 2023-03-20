const Responses = require('../common/API_Responses')
const AWS = require('aws-sdk')

const Comprehend =new AWS.Comprehend()

exports.handler = async event =>{
    const body = JSON.parse(event.body)


    const { id } = event.pathParameters
    if (!body || !body.text) {
        return Responses._400({message:"no text field on the body"})
    }
    let params = {}
    const text = body.text
    if (id == 1 || id == "1") {
        params = {
            LanguageCode:'en',
            TextList:[text],
        }
    }
    else if (id == 2 || id == "2") {
        params = {
            LanguageCode:'es',
            TextList:[text],
        }
    }
    

    try {
        const entityResults = await Comprehend.batchDetectEntities(params).promise()
        const entities = entityResults.ResultList[0]
        const sentimentResults = await Comprehend.batchDetectSentiment(params).promise()

        const sentiment = sentimentResults.ResultList[0]
        const responseData = {
            entities,
            sentiment
        }

        console.log("response data", responseData);

        return Responses._200(responseData)
    } catch (error) {
        console.log("ERROR--->", error);
        return Responses._400({message:"Failed to work analysis"})
    }
}