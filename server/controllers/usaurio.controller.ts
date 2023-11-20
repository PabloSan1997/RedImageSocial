import { UsuarioServicio } from "../services/usuario.services";
import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';
import { generarRespuesta } from "../utilities/respuesta";
import { jwt } from "../utilities/jsonwebtoken";
const servicios = new UsuarioServicio();

export class UsuarioController {
    async agregarUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = req.body as UsuarioCrear;
            const nuevoUsuario = await servicios.agregarUsuario(usuario);
            const { id_usuario, name, user_name, rol } = nuevoUsuario;

            generarRespuesta(res, 201, { id_usuario, name, user_name, rol }, 'New user');
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
    async loginUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = req.body as Login;
            const response = await servicios.login(usuario);
            generarRespuesta(res, 200, response, 'accept');
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
    async leerUnUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const { id_usuario } = req.params as { id_usuario: string }
            const response = await servicios.leerUsuarioBPK(id_usuario);
            generarRespuesta(res, 200, response, 'accept');
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
    async confirmarToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { autorization } = req.headers as { autorization: string };
            const auth = jwt.verificarToken(autorization);
            const checar = await servicios.checarUsuario(auth.nameUser);
            if(!checar) throw 'No existe usuario';
            const nombre = await servicios.leerUsuarioBPK(auth.nameUser, false);
            generarRespuesta(res, 200, {permiso:true, name:nombre.name}, '');
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
    async leerMiUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const { autorization } = req.headers as { autorization: string };
            const auth = jwt.verificarToken(autorization);
            const response = await servicios.leerUsuarioBPK(auth.nameUser);
            generarRespuesta(res, 200, response, 'accept');
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
    async eliminarUsuario(req: Request, res: Response, next: NextFunction) {
        try {

            const { id_usuario } = req.params as { id_usuario: string };
            const { autorization } = req.headers as { autorization: string };
            const auth = jwt.verificarToken(autorization);
            if (auth.rol != 'admin') throw new Error('No tienes permiso para esta accion');
            await servicios.deleteUsuario(id_usuario);
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            next(Boom.badRequest(err));
        }
    }
}