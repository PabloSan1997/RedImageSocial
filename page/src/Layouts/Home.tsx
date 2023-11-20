import {Navigate} from 'react-router-dom';
import { UseContexto } from "../Context";
import { rutas } from "../Rutas";
import { ContenedorHome } from "../Components/ContenedorHome";

export function Home() {
  const {permiso} = UseContexto();

  localStorage.ir = rutas.home;

  if(!permiso) return <Navigate to={rutas.login}/>
  return (
    <ContenedorHome/>
  );
}
