
const AWS = require('aws-sdk')
const Responses = require('../common/API_Responses')

const Axios = require('axios')

const SES = new AWS.SES()

const newsURL = "https://newsapi.org/"

exports.handler = async event =>{
    console.log("event", event);

    const techNews = await getNews()
    console.log("FIN TECH NEWS");
    const emailHtml =createEmailHTML(techNews)
    console.log("emailHtml", emailHtml);
    const params = {
        Destination :{
            ToAddresses: ['jaimenestares1210@gmail.com']
        },
        Message:{
            Body:{
                Html:{ Data: emailHtml}
            },
            Subject:{
                Data: 'Morning tags news'
            }
        },
        Source: 'jaimenestares1210@gmail.com'
    }
    try {
        await SES.sendEmail(params).promise()
        return Responses._200({message:'email send'})
    } catch (error) {
        console.log("ERRORR-->", error);
        return Responses._400({message:'Falided email'})
    }
}

const createEmailHTML = techNews =>{
    console.log("createEmailHTML", techNews);
    return `<html>
    <body>
        <h1> Top new jaime </h1>
        ${techNews.map(article =>{
            return `
                <h3> ${article.title}</h3>
                <p>${article.description}</p>
                <a href=${article.url}><button>Read More</button>
                </a>
            `
        })}
    </body>
    </html>
    `
}


const getNews = async () =>{
    const options = {
        params:{
            q: 'technology',
            languaje: 'en'
        },
        headers:{
            'X-Api-Key':'8fcb3651f0db4e999b4fbf454eccdff5'
        }
    }

    const { data : newsData} = await Axios.get(`${newsURL}/v2/top-headlines`, options)
    console.log("getNewsgetNews", getNews);
    if (!newsData) {
        throw Error(' No data en from api')
    }
    return newsData.articles.slice(0,5)
}