import { TrashIcon } from '@heroicons/react/24/solid';
import { UseContexto } from '../Context';

interface TipeoImagen extends Imagen {
    modoAdmin: boolean,
    act:boolean, 
    setAct(a:boolean):void
}
export function ImagenesUna({ url_image, title, description, modoAdmin, id_imagen, setAct, act }: TipeoImagen) {
    const { borrarLaImagen } = UseContexto();
    const borrar = () =>{
        if(confirm('Desea borrar esta imagen')){
            borrarLaImagen(id_imagen)
            .then(()=>{
                setAct(!act);
            });
        }
    }
    return (
        <div className="caja-imagen">
            {modoAdmin ?
                <TrashIcon className='borrar' onClick={borrar}/>
                : null}
            <img src={url_image} alt={title} className="foto" />
            <h2 className="titulo">{title}</h2>
            <p className="descripcion">{description}</p>
        </div>
    );
}