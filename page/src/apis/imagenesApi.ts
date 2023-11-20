
export async function readImagene(id: string | null = null) {
    const url = import.meta.env.VITE_API_RUTA;
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