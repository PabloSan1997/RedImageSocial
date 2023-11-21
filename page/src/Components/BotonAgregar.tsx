import { UseContexto } from '../Context';
import '../estilos/botonAgregar.scss'

export function BotonAgregar(){
    const {setMostrarAgregarImagen} = UseContexto();
    return(
        <p className="boton-agregar" onClick={()=>setMostrarAgregarImagen(true)}>+</p>
    );
}