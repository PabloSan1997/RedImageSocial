import express, { Express } from "express";
import { usuarioRouter } from "./usuario.routes";
import { imagenesRouter } from "./imagenes.routes";

const mainRouter = express.Router();

export function crearApi(app:Express){
    app.use('/api', mainRouter);
    mainRouter.use('/user', usuarioRouter);
    mainRouter.use('/imagenes', imagenesRouter);
}