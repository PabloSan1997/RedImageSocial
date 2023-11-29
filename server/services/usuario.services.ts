import { AppDataSource } from "../database/config";
import { Usuario } from "../database/models/Usuario";
import { hash, compare } from 'bcrypt';
import { jwt } from "../utilities/jsonwebtoken";
import { Imagen } from "../database/models/Imagen";

export class UsuarioServicio {
    async agregarUsuario(nuevoUsuario: UsuarioCrear) {
        const repositorio = AppDataSource.getRepository(Usuario);
        const contra = await hash(nuevoUsuario.password, 8);
        nuevoUsuario.password = contra;
        const generarUsuario = repositorio.create(nuevoUsuario);
        await repositorio.manager.save(generarUsuario);
        return generarUsuario;
    }
    async login(usuario: Login): Promise<LoginResponse> {
        const repositorio = AppDataSource.getRepository(Usuario);
        const ver = await repositorio.findOne({ where: { user_name: usuario.user_name } });
        if (!ver) throw new Error('Usuario o contraseña incorrectos');
        const checar = await compare(usuario.password, ver.password);
        if (!checar) throw new Error('Usuario o contraseña incorrectos');
        const respuesta: TokenResponse = {
            nameUser: ver.id_usuario,
            rol: ver.rol
        }
        ver.password = await hash(usuario.password, 8);
        await repositorio.update({ id_usuario: ver.id_usuario }, ver);
        const token = jwt.generarToken(respuesta);
        return { permiso: true, token }
    }
    async leerUsuarioBPK(id_usuario: string, relacion = true) {
        const repositorio = AppDataSource.getRepository(Usuario);
        const reImagen = AppDataSource.getRepository(Imagen);
        const usuario = await repositorio.findOne({ where: { id_usuario } });
        if (!usuario || !id_usuario) throw new Error('No se encontro usuario');
        const { name, user_name, url_perfil } = usuario;
        const imagenes = await reImagen.find({
            where: { usuario },
            order: { creadedAt: 'DESC' }
        });
        return { name, user_name, url_perfil, imagenes }
    }
    async checarUsuario(id_usuario: string) {
        const repositorio = AppDataSource.getRepository(Usuario);
        const usuario = await repositorio.findOne({ where: { id_usuario } });
        if (!id_usuario) return false;
        return !!usuario;
    }
    async deleteUsuario(id_usuario: string) {
        const repositorio = AppDataSource.getRepository(Usuario);
        const reImagenes = AppDataSource.getRepository(Imagen);
        const usuario = await repositorio.findOne({ where: { id_usuario }, relations: { imagenes: true } });
        if (!!usuario && !!id_usuario) {
            await Promise.all(usuario.imagenes.map(async p => {
                await reImagenes.remove(p);
            }));
            await repositorio.remove(usuario);
        }
    }
}