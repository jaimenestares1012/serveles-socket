const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event =>{
    console.log("EVENTE", event);
    if (!event.pathParameters || ! event.pathParameters.ID) {
        return Responses._400({message:"missing the id"})
    }
    let ID = event.pathParameters.ID

    const user = JSON.parse(event.body)

    user.ID = ID

    const newUser =  await Dynamo.write(user, tableName).catch(err =>{
        console.log("ERROR in dynamo", err);
        return null
    })

    if (!newUser) {
        return Responses._400({message:"ffailed write por tu ID"})
    }
    return Responses._200({newUser})

}