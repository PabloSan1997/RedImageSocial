
import {Response} from 'express';

class Respuesta {
    public statusCode: number;
    public message: string;
    public results: object | object[]
    constructor(statusCode:number, message:string, results:object|object[]){
        this.statusCode=statusCode;
        this.message=message;
        this.results=results;
    }
}

export function generarRespuesta(res:Response, statusCode:number, result:object|object[], message:string){
    const respuesta = new Respuesta(statusCode, message, result);
    res.status(respuesta.statusCode).json(respuesta);
}