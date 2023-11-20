

interface LoginResponse {
    permiso: boolean,
    token: string
}
interface TokenResponse {
    nameUser: string,
    rol: string
}


//-------modelos----------

interface Login {
    user_name: string,
    password: string
}
interface UsuarioCrear extends Login {
    name: string,
    rol: string,
    url_perfil:string
}
interface UsuarioId extends UsuarioCrear {
    id_usuario: string
}

interface ImagenCrear {
    title: string,
    description: string
    url_image: string
}

interface ImagenesId extends ImagenCrear {
    id_imagen: string
    creadedAt:Date,
    updatedAt:Date
}

//-----------------------