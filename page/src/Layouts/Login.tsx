import { FormularioLogin } from "../Components/FormularioLogin";
import { UseContexto } from "../Context";
import { Navigate } from 'react-router-dom';
import { rutas } from "../Rutas";


export function Login() {
  const { permiso } = UseContexto();

  if (permiso) return <Navigate to={localStorage.ir ? localStorage.ir : rutas.home} />
  return (
    <FormularioLogin />
  );
}
