import {sign, verify} from 'jsonwebtoken';
import { variables } from './variables';


 function generarToken(objeto:object):string{
    const key = variables.key as string;
    const token = sign(objeto, key);
    return token;
}

function verificarToken(token:string):TokenResponse{
    const key = variables.key as string;
    const data = verify(token, key);
    return data as TokenResponse;
}

export const jwt = {generarToken, verificarToken};