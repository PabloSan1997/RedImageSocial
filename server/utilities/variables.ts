import 'dotenv/config';

export const variables = {
    port:process.env.PORT||3000,
    url_database:process.env.URL_DATABASE,
    key:process.env.KEY
}