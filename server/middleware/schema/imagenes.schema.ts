import joi from 'joi';

const id_imagen = joi.string().uuid().min(1).required();
const title = joi.string().min(1).max(100).required();
const description = joi.string().min(1).max(5000).required();
const url_image = joi.string().min(1).max(5000).required();

export const crearImagenJoi = joi.object({title, description, url_image});
export const idImagenJoi = joi.object({id_imagen});