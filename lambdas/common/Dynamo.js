const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()
const Dynamo = {
    async get(ID, TableName){
        const params ={
            TableName,
            Key: {
                ID
            }
        }
        const data = await documentClient.get(params).promise()
        if (!data || !data.Item ) {
            throw Error(`There was an error fetching the data for id ${ID} from ${TableName}`)
        }
        console.log("DATA--->", data);
        return data
    },
    async write (data, TableName){
        if (!data) {
            throw Error('No id en la data')
        }
        const params= {
            TableName,
            Item: data
        }
        const res =  await documentClient.put(params).promise()

        if (!res) {
            throw Error(`There was an error inserting the data for id ${data.ID} from ${TableName}`)
        }

        return data
    },
    async delete (ID, TableName){
        const params = {
            TableName,
            Key:{
                ID
            }
        }

        return  documentClient.delete(params).promise()
    }
} 

module.exports = Dynamo