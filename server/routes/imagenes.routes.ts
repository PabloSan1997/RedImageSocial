import express, { Request, Response } from 'express';
import { ImagenesController } from '../controllers/imagenes.controller';
import { joiHandle } from '../middleware/joiHandle';
import { crearImagenJoi, idImagenJoi } from '../middleware/schema/imagenes.schema';
import { multerUpload } from '../multer/config';


export const imagenesRouter = express.Router();

const controller = new ImagenesController();

imagenesRouter.get('/', controller.leerImagenes);

imagenesRouter.get('/:id_imagen', joiHandle(idImagenJoi, 'params'), controller.leerImagenUno);

imagenesRouter.post('/', multerUpload.single('lafoto'), controller.agregarImagen);

imagenesRouter.delete('/:id_imagen', joiHandle(idImagenJoi, 'params'), controller.eliminarImagenes);