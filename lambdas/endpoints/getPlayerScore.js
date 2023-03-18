const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event =>{
    console.log("EVENTE", event);
    if (!event.pathParameters || ! event.pathParameters.ID) {
        return Responses._400({message:"missing the id"})
    }
    let ID = event.pathParameters.ID

    const user = await Dynamo.get(ID, tableName).catch(err=>{
        console.log("ERROR IN DYNAMO ger", err  );
        return null
    })

    if (!user) {
        return Responses._400({message:"ffailed het por tu ID"})
    }
    return Responses._200({user})

}