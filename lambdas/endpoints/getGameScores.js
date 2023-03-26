const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName


const { withHooks } = require('../common/hooks')


const handler = async event =>{
    if (!event.pathParameters.game) {
        return Responses._400({message:"missing the game"})
    }
    const game = event.pathParameters.game

    const gamePlayers =  await Dynamo.query({
        tableName,
        index: 'game-index',
        queryKey:'game',
        queryValue: game,

    })

    
    return Responses._200({gamePlayers})

}

exports.handler = withHooks(handler)