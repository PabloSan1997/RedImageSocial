import { UseContexto } from "../Context";
import { ImagenesUsuario } from "./ImagenesUsuario";
import '../estilos/contenedorHome.scss';

export function ContenedorHome(){
    const {imagenes} = UseContexto();

    return(
        <div className="contenedor-home">
            {imagenes.map(p=>(
                <ImagenesUsuario key={p.id_imagen} {...p}/>
            ))}
        </div>
    );
}