const Responses = require('../common/API_Responses')
const S3 = require('../common/S3')
const bucket = process.env.bucketName

exports.handler = async event =>{
    console.log("EVENTE", event);
    if (!event.pathParameters || ! event.pathParameters.fileName) {
        return Responses._400({message:"missing file the id"})
    }
    let fileName = event.pathParameters.fileName

    const data = JSON.parse(event.body)

    const newData =  await S3.write(data, fileName, bucket).catch(err =>{
        console.log("ERROR in S3 WITW", err);
        return null
    })

    if (!newData) {
        return Responses._400({message:"ffailed write por tu FILE NAME"})
    }
    return Responses._200({newData})

}