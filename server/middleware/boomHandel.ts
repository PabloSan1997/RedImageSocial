import {Request, Response, NextFunction} from 'express';
import {Boom} from '@hapi/boom';
import { generarRespuesta } from '../utilities/respuesta';

export function boomHandle(err:Boom, req:Request, res:Response, next:NextFunction){
    if(err.isBoom){
        const {payload} = err.output;
        generarRespuesta(res, payload.statusCode, payload, payload.error);
    }
    next(err);
}