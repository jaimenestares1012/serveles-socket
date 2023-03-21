const { useHooks, logEvent, parseEvent, handleUnexpectedError } = require('lambda-hooks')
const withHooks =useHooks({
    before: [logEvent, parseEvent],
    after: [],
    onError: [handleUnexpectedError]
})


const hooksWithValidation = ({ bodySchema, pathSchema }) => {
    return useHooks(
    {
        before : [logEvent, parseEvent, validateEventBody, validatePath],
        after: [],
        onError: [handleUnexpectedError]
    },
    {
        bodySchema,
        pathSchema
    })
}


module.exports = {
    withHooks,
    hooksWithValidation
}


const validateEventBody = async state =>{
    const { bodySchema } = state.config

    if (!bodySchema) {
        throw Error('missing the rquired body schema')
    }
    try {
        const { event } = state
        await bodySchema.validate(event.body, {strict: true})

    } catch (error) {
        console.log("ERROR, ", error);
        state.exit = true
        state.respomse = {statusCode: 400, body: JSON.stringify({error: error.message})}
    }
    return state
}

const validatePath = async state =>{
    const { pathSchema } = state.config

    if (!pathSchema) {
        throw Error('missing the rquired path schema')
    }
    try {
        const { event } = state
        await pathSchema.validate(event.pathParameters, {strict: true})

    } catch (error) {
        console.log("ERROR,  path paramteres", error);
        state.exit = true
        state.respomse = {statusCode: 400, body: JSON.stringify({error: error.message})}
    }
    return state
}