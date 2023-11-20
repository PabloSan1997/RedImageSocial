import { UseContexto } from "../Context";
import { rutas } from "../Rutas";
import {Navigate} from 'react-router-dom';

export function Redirigir(){
    const {permiso} = UseContexto();
    if(permiso) return <Navigate to={rutas.home}/>
    return <Navigate to={rutas.login}/>
}