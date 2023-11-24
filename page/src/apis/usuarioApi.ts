import { url } from "./ruta";


export async function loginRequest(data:Login):Promise<LoginResponse>{
    const usuario = await (await fetch(`${url}/user/login`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })).json() as Respuesta;
    if(usuario.statusCode>=400){
        const error = usuario.results as ErrorBoom;
        throw `${error.message}`;
    }
    return usuario.results as LoginResponse;
}
export async function readUsuarioToken(token:string):Promise<{permiso:boolean, name:string}>{
    const usuario = await (await fetch(`${url}/user/confirmar`, {
        method:'GET',
        headers:{
            autorization: token
        }
    })).json() as Respuesta;
    if(usuario.statusCode>=400){
        const error = usuario.results as ErrorBoom;
        throw `${error.message}`;
    }
    return usuario.results as {permiso:boolean, name:string};
}

export async function readUserImageTokens(token:string):Promise<UsauioImagen>{
    const usuario = await (await fetch(`${url}/user`, {
        method:'GET',
        headers:{
            autorization: token
        }
    })).json() as Respuesta;
    if(usuario.statusCode>=400){
        const error = usuario.results as ErrorBoom;
        throw `${error.message}`;
    }
    return usuario.results as UsauioImagen;
}

export async function readOtherUser(id_usuario:string):Promise<UsauioImagen>{
    const usuario = await (await fetch(`${url}/user/${id_usuario}`, {
        method:'GET',
    })).json() as Respuesta;
    if(usuario.statusCode>=400){
        const error = usuario.results as ErrorBoom;
        throw `${error.message}`;
    }
    return usuario.results as UsauioImagen;
}


