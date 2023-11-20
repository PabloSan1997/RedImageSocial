import express from 'express';
import { UsuarioController } from '../controllers/usaurio.controller';
import { joiHandle } from '../middleware/joiHandle';
import { createdUserJoi, idUsuarioJoi, loginJoi } from '../middleware/schema/usuario.schema';

const controlador = new UsuarioController();

export const usuarioRouter = express.Router();

usuarioRouter.get('/', controlador.leerMiUsuario);

usuarioRouter.get('/confirmar', controlador.confirmarToken);

usuarioRouter.get('/:id_usuario', joiHandle(idUsuarioJoi, 'params'), controlador.leerUnUsuario);

usuarioRouter.post('/newUser', joiHandle(createdUserJoi, 'body'), controlador.agregarUsuario);

usuarioRouter.post('/login', joiHandle(loginJoi, 'body'), controlador.loginUsuario);

usuarioRouter.delete('/:id_usuario', joiHandle(idUsuarioJoi, 'params'), controlador.eliminarUsuario);