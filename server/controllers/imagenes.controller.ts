import { Request, Response, NextFunction } from 'express';
import { ImagenesService } from '../services/imagenes.services';
import { jwt } from '../utilities/jsonwebtoken';
import { generarRespuesta } from '../utilities/respuesta';
import Boom from '@hapi/boom';



const servicio = new ImagenesService();

export class ImagenesController {
    async agregarImagen(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as ImagenCrear;
            const lata = req.file;
            const { autorization } = req.headers as { autorization: string };
            const auth = jwt.verificarToken(autorization);
            const nuevaImagen = await servicio.agregarImagen(auth.nameUser, body);
            await servicio.agregarImagenUnica(nuevaImagen.id_imagen, auth.nameUser, lata);
            const { name, user_name, } = nuevaImagen.usuario;
            const respuesta = {
                ...nuevaImagen,
                usuario: {
                    name,
                    user_name
                }
            }
            generarRespuesta(res, 201, respuesta, 'Created');
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
    async leerImagenes(req: Request, res: Response, next: NextFunction) {
        try {
            const ver = await servicio.leerImagenes(true);
            generarRespuesta(res, 200, ver, 'Elementos');
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
    async leerImagenUno(req: Request, res: Response, next: NextFunction) {
        try {
            const { id_imagen } = req.params as { id_imagen: string };
            const datos = await servicio.leerImagenBPK(id_imagen);
            generarRespuesta(res, 200, datos, 'Elemento');
        } catch (error) {
            const err = error as Error;
            next(Boom.notFound(err));
        }
    }
    async eliminarImagenes(req: Request, res: Response, next: NextFunction) {
        try {
            const { id_imagen } = req.params as { id_imagen: string };
            const { autorization } = req.headers as { autorization: string };
            const auth = jwt.verificarToken(autorization);
            await servicio.eliminarImagenPk(id_imagen, auth.nameUser)
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
}