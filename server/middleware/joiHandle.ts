import {Schema} from 'joi';
import {Request, Response, NextFunction} from 'express';
import Boom from '@hapi/boom';

export function joiHandle(schema:Schema, props:'body'|'params'){
    return(req:Request, res:Response, next:NextFunction)=>{
        const elemento = req[props];
        const {error} = schema.validate(elemento, {abortEarly:false});
        if(!!error){
            next(Boom.badRequest(error.message));
        }
        else{
            next();
        }
    }
}

