import joi from 'joi';

const user_name = joi.string().min(1).max(100).required();
const password = joi.string().min(1).max(10000).required();
const name = joi.string().min(1).max(100).required();
const rol = joi.string().min(1).max(100).required();
const id_usuario = joi.string().uuid().min(1).required();
const url_perfil = joi.string().min(1).max(5000);

export const loginJoi = joi.object({user_name, password});
export const createdUserJoi = joi.object({user_name, password, name, rol, url_perfil});
export const idUsuarioJoi = joi.object({id_usuario});