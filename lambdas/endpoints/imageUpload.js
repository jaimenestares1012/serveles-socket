const Responses = require('../common/API_Responses')
const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg ']
import { v4 as uuid } from 'uuid'
import * as fileType from 'file-type'
const s3= new AWS.S3()

const imageUploadBucket = process.env.imageUploadBucket
const region = process.env.region
exports.handler = async event =>{
    try {
        const body = JSON.parse(event.body)
        if (!body || !body.image || body.mime) {
          return Responses._400({message: 'Incorrect body on request '})      
        }
        if (!allowedMimes.includes(body.mime)) {
            return Responses._400({messahe : "mime is not allowed"})
        }

        let imageData = body.image
        if (body.image.substr(0,7) === "base64,") {
            imageData = body.image.substr(7, body.image.length)
        }

        const buffer =  Buffer.from(imageData, 'base64')
        const fileInfo = await fileType.fromBuffer(buffer)
        const detectedExt = fileInfo.ext
        const detectedMime = fileInfo.mime
        if (detectedMime !== body.mime)  {
            return Responses._400({message: 'mime type dont match'})
        }
        const name = uuid()
        const key = `${name}.${detectedExt}`


        console.log("writing image to bucket called ", key);


        await s3.putObject({
            Body: buffer,
            Key: key,
            ContentType: body.mime,
            Bucket: imageUploadBucket,
            ACL: 'public-read'
        }).promise()
        const url = `https://${imageUploadBucket}.s3-${region}.aamazonaws.com/${key}`
        return Responses._200({
            imageUrl: url
        })
    } catch (error) {
       console.log("error", error);
       return Responses._400({
        message: error.message || 'failed to upload'
       })
    }
}