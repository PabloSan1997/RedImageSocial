import { generarFormdata } from "../utilities/generarFormdata";
import { url } from "./ruta";


export async function readImagene(id: string | null = null) {
    if (!id) {
        const ft = await fetch(`${url}/imagenes`);
        const respuesta = await ft.json() as Respuesta;
        if (respuesta.statusCode >= 400) {
            const error = respuesta.results as ErrorBoom;
            throw new Error(`${error.statusCode} ${error.error}`);
        }
        const imagenes = respuesta.results as ImagenUsuario[];
        return imagenes;
    } else {
        const ft = await fetch(`${url}/imagenes/${id}`);
        const respuesta = await ft.json() as Respuesta;
        if (respuesta.statusCode >= 400) {
            const error = respuesta.results as ErrorBoom;
            throw new Error(`${error.statusCode} ${error.error}`);
        }
        const imagen = respuesta.results as ImagenUsuario;
        return imagen;
    }
}

export async function agregarNuevaImagen(nuevaImagen: AgregarImagen, file:File,token: string): Promise<Imagen> {
    
    const formulario = generarFormdata(nuevaImagen);
    formulario.append('lafoto', file);
    const respuesta = await (await fetch(`${url}/imagenes`, {
        method: 'POST',
        headers: {
            autorization: token
        },
        body: formulario
    })).json() as Respuesta;
    if (respuesta.statusCode >= 400) throw `Error al agregar nuevo usuario`;
    return respuesta.results as Imagen;
}

export async function borrarImagen(id_imagen: string, token: string) {
    const respuesta = await fetch(`${url}/imagenes/${id_imagen}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            autorization: token
        }
    });
    if (!respuesta.ok) throw `Error al agregar nuevo usuario`;
}

