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

export async function agregarNuevaImagen(nuevaImagen: AgregarImagen, token: string): Promise<void> {
    const respuesta = await (await fetch(`${url}/imagenes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            autorization: token
        },
        body: JSON.stringify(nuevaImagen)
    })).json() as Respuesta;
    if (respuesta.statusCode >= 400) throw `Error al agregar nuevo usuario`;
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

export async function puraImagen(data:File):Promise<{url_image:string}> {
    const archivo = new FormData();
    archivo.append('lafoto', data);
    const ft = await fetch(`${url}/imagenes/puraImagen`,{
        method:'POST',
        body:archivo
    });
    const response = await ft.json();
   return response;
}