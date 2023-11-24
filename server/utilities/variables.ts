import 'dotenv/config';

export const variables = {
    port:process.env.PORT||3000,
    url_database:process.env.URL_DATABASE,
    key:process.env.KEY,
    apiKey:process.env.APIKEY,
    authDomain: process.env.AUTHDOMINIAN,
    projectId:process.env.PROJECTID,
    storageBucket: process.env.STRORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId:process.env.APPID
}