import * as AWS from 'aws-sdk'
import Responses from '../common/API_Responses'
import Axios from 'axios'
const lexruntime = new AWS.LexRuntime()

exports.handler = async event =>{
    try {
        const body = JSON.parse(event.body)
        console.log("body", body);
        const messagForLex = mapTelegramToLex(body);
        const lexResponse = await lexruntime.postText(messagForLex).promise()

        const messageForTelegram = mapLexToTelegram(lexResponse, body)

        await senToTelegram(messageForTelegram)

        return Responses._200()
    } catch (error) {
        console.log("error", error);
        return Responses._400()
    }
}

const mapTelegramToLex = body =>{
    const chatID = String(body.message.chat.id)
    const message = body.message.text
    return {
        inputText: message,
        userId: chatID,
        botName: "telegramBot",
        botAlias: "dev",
        sessionAttributes: {}
    }
}


const mapLexToTelegram = (lexResponse, body ) =>{
    return {
        text: lexResponse.message,
        chat_id: body.message.chat.id
    }
}


const senToTelegram = message =>{
    const token = '6005090581:AAGhSAJVxM2RiZVDxuyztghksh_EvZz4YN8'
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`
    return Axios.post(telegramUrl, message)
}