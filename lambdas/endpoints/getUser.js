
const Responses = require('../common/API_Responses')

exports.handler = async event =>{
    console.log("event", event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message:'missing ID'})
    }
    let ID = event.pathParameters.ID
    if (data[ID]) {
        return Responses._200(data[ID])
    }
    return Responses._400({message: 'NO ID'})

}
const data = {
    1234: { name: 'Anna Jonnes', age: 25, job: 'JournalList' }
}