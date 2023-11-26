import { AppDataSource } from "../database/config";
import { Imagen } from "../database/models/Imagen";
import { Usuario } from "../database/models/Usuario";
import { Express } from "express";
import { eliminarArchivo, subirArchivo } from "../firebase/config";


export class ImagenesService {
    async agregarImagen(id_usuario: string, imagene: ImagenCrear) {
        const reImagen = AppDataSource.getRepository(Imagen);
        const reUsuario = AppDataSource.getRepository(Usuario);
        const usuario = await reUsuario.findOne({ where: { id_usuario } });
        if (!usuario) throw new Error('No se puede cargar usuario');
        const imagenNueva = reImagen.create(imagene);
        imagenNueva.usuario = usuario;
        await reImagen.manager.save(imagenNueva);
        return imagenNueva;
    }
    async leerImagenes(relation = false) {
        const reImagen = AppDataSource.getRepository(Imagen);
        if (!relation) return await reImagen.find({ order: { creadedAt: 'ASC' } });
        const imagenes = await reImagen.find({ relations: { usuario: relation }, order: { creadedAt: 'DESC' } });
        const mostrar = imagenes.map(p => {
            const { name, user_name, id_usuario, url_perfil } = p.usuario;
            return { ...p, usuario: { id_usuario, name, user_name, url_perfil } }
        });
        return mostrar;
    }
    async leerImagenBPK(id_imagen: string) {
        const reImagen = AppDataSource.getRepository(Imagen);
        const imagen = await reImagen.findOne({
            where: {
                id_imagen
            },
            relations: {
                usuario: true
            }
        });
        if (!imagen || !id_imagen) throw new Error('No se encontro imagen');
        const { name, user_name, id_usuario, url_perfil } = imagen.usuario;
        const mostrar = {
            ...imagen,
            usuario: { name, user_name, id_usuario, url_perfil }
        }
        return mostrar;
    }
    async eliminarImagenPk(id_imagen: string, id_usuario: string, quitarArchivo: boolean = true) {
        const reUsuario = AppDataSource.getRepository(Usuario);
        const reImagen = AppDataSource.getRepository(Imagen);
        if (!id_imagen || !id_usuario) throw new Error('No se encontro elemento');
        const usuario = await reUsuario.findOne({
            where: {
                id_usuario
            },
            relations: {
                imagenes: true
            }
        });
        if (!usuario) throw new Error('No se encontro imagen');

        const imagen = usuario.imagenes.find(p => p.id_imagen === id_imagen);

        if (imagen) {
            const id = imagen.id_imagen;
            const format = imagen.format_image;
            await reImagen.remove(imagen);
            if (quitarArchivo) await eliminarArchivo(`${id}.${format}`);
        }

    }
    async agregarImagenUnica(id_imagen: string, id_usuario: string, file: Express.Multer.File | undefined) {
        try {
            const reImagen = AppDataSource.getRepository(Imagen);
            if (!file) throw 'No se encontro imagen para subir';
            const formato = file.mimetype.split('image/')[1];
            const encontrar = await reImagen.findOne({ where: { id_imagen }, relations: { usuario: true } });
            if (!encontrar || encontrar.usuario.id_usuario !== id_usuario) throw 'Error al agregar imagen';
            const url_image = await subirArchivo(file, id_imagen, formato);
            await reImagen.update({ id_imagen }, { url_image, format_image: formato });
        } catch (error) {
            this.eliminarImagenPk(id_imagen, id_usuario, false);
        }
    }
}