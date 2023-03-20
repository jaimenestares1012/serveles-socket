const AWS = require('aws-sdk');


const create = (domainName, stage) =>{
    console.log("<...> create");
    const endpoint = `${domainName}/${stage}`
    return new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint,
    })
}

const send= ({domainName, stage, connectionID, message}) =>{
    console.log("domainName, stage, connectionID, message", domainName, stage, connectionID, message);
    const ws =  create(domainName, stage)
    console.log("<-----LUEGO DE CREAR -----", ws);
    const postParams = {
        Data: message,
        ConnectionId: connectionID
    }
    console.log("postParams", postParams);
    return ws.postToConnection(postParams).promise()

}


module.exports= {
    send
}