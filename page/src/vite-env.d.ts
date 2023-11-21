/// <reference types="vite/client" />

//----------------------API-----------
interface Respuesta {
    statusCode: number
    message: string
    results: object | object[]
}

interface ErrorBoom {
    statusCode: number,
    message: string,
    error: string
}

interface AgregarImagen {
    title: string,
    description: string,
    url_image: string
}
interface Login {
    user_name: string,
    password: string
}
interface LoginResponse {
    permiso: boolean,
    token: string
}
interface Imagen {
    id_imagen: string,
    title: string,
    description: string,
    url_image: string,
    creadedAt: string,
    updatedAt: string
}
interface ImagenUsuario extends Imagen {
    usuario: {
        name: string,
        user_name: string,
        id_usuario: string,
        url_perfil:string
    }
}
interface UsauioImagen {
    name: string,
    user_name: string,
    url_perfil:string,
    imagenes: Imagen[]
}



//----------------------------------------

//---------JSX ELEMENTS-------------

interface Children {
    children: JSX.Element | JSX.Element[]
}
interface Contexto {
    permiso: boolean,
    imagenes: ImagenUsuario[],
    loggear(log:Login):void,
    cerrarSecion():void,
    token:string,
    nombre:string,
    mostrarAgregarImagen:boolean, 
    setMostrarAgregarImagen(a:boolean):void,
    agregarImagen(a:AgregarImagen):Promise<void>,
    borrarLaImagen(id_imagen:string):Promise<void>,
    loading:boolean
}
