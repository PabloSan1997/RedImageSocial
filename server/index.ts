import express from 'express';
import { crearApi } from './routes/main';
import cors from 'cors';
import morgan from 'morgan';
import "reflect-metadata";
import { variables } from './utilities/variables';
import { probarBaseDeDatos } from './database/config';
import { boomHandle } from './middleware/boomHandel';

async function inicio() {
    try {
        const app = express();
        await probarBaseDeDatos();
        app.use('/', express.static('static/aplication'));
        app.use(cors());
        app.use(express.json());
        app.use(morgan('dev'));

        crearApi(app);

        app.use(boomHandle);

        app.listen(variables.port, () => console.log(`http://localhost:${variables.port}`));
    } catch (error) {
        console.error(error);
    }
}
inicio();