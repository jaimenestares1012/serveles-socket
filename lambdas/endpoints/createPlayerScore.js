const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const { withHooks } = require('../common/hooks')


const tableName = process.env.tableName



const handler = async event =>{
    if (!event.pathParameters.ID) {
        return Responses._400({message:"missing the id"})
    }
    let ID = event.pathParameters.ID

    const user = event.body

    user.ID = ID

    const newUser =  await Dynamo.write(user, tableName)

    if (!newUser) {
        return Responses._400({message:"ffailed write por tu ID"})
    }
    return Responses._200({newUser})

}

exports.handler = withHooks(handler)