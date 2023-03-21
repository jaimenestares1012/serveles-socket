const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName


const { withHooks } = require('../common/hooks')


const handler = async event =>{
    if (!event.pathParameters.ID) {
        return Responses._400({message:"missing the id"})
    }
    let ID = event.pathParameters.ID

    const user = await Dynamo.get(ID, tableName)

    if (!user) {
        return Responses._400({message:"ffailed het por tu ID"})
    }
    return Responses._200({user})

}

exports.handler = withHooks(handler)