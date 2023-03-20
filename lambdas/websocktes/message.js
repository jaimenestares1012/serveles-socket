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
        const messages = record.messages || []; // si record.messages no está definido, inicializa messages como un arreglo vacío
        console.log("messages----> ", messages);
        console.log("body.messagebody.message--body.message", body.message);
        messages.push(body.message)
        console.log("messages2 ---->", messages);
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