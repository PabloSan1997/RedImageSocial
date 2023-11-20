import express, { Request, Response } from 'express';
import { ImagenesController } from '../controllers/imagenes.controller';
import { joiHandle } from '../middleware/joiHandle';
import { crearImagenJoi, idImagenJoi } from '../middleware/schema/imagenes.schema';


export const imagenesRouter = express.Router();

const controller = new ImagenesController();

imagenesRouter.get('/', controller.leerImagenes);

imagenesRouter.get('/:id_imagen', joiHandle(idImagenJoi, 'params'), controller.leerImagenUno);

imagenesRouter.post('/',joiHandle(crearImagenJoi, 'body') ,controller.agregarImagen);

imagenesRouter.delete('/:id_imagen', joiHandle(idImagenJoi, 'params') ,controller.eliminarImagenes);