const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.tableName
exports.handler =  async event =>{
    console.log("event", event);
    const { connectionId: connectionID } = event.requestContext


    const body =  JSON.parse(event.body)


    try {
        console.log("<----------->");
        const record = await Dynamo.get(connectionID, tableName)
        console.log("Record---- > ", record);
        const messages = record.messages
        console.log("messages----> ", messages);
        messages.push(body.message)
        console.log("messages---->", messages);
        const data = {
            ...record,
            messages
        }
        console.log("DATA-----------   > ", data);
        await Dynamo.write(data, tableName)
        console.log("<----- FIN WRITE----->");
        return Responses._200({message:"got a message"})

    } catch (error) {
        return Responses._400({message:"message could not be recived"})
    }


}