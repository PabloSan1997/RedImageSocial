import React from "react";
import { UseContexto } from "../Context";
import '../estilos/formularioAgregar.scss';

const initalTexto:AgregarImagen = {
    title:'',
    description:'',
    url_image:''
}

export function FormularAgregar() {
    const [textos, setTextos] = React.useState(initalTexto);

    const {agregarImagen, setMostrarAgregarImagen} = UseContexto();

    const setTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTextos({...textos, title:e.target.value});
    }
    const setDescripcion=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTextos({...textos, description:e.target.value});
    }
    const setUrlImagen=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTextos({...textos, url_image:e.target.value});
    }
    const subir=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        agregarImagen(textos)
        .then(()=>{
            setTextos(initalTexto);
            setMostrarAgregarImagen(false);
        });
    }
    return (
        <form className="formulario-agregar" onSubmit={subir}>
            <h2>Agregar Nueva Imagen</h2>
            <label htmlFor="title">Titulo</label>
            <input
                type="text"
                className="entrada"
                id="title"
                placeholder="escribir"
                value={textos.title}
                onChange={setTitle}
            />
            <label htmlFor="description">Mensaje</label>
            <input
                type="text"
                className="entrada"
                id="description"
                placeholder="escribir"
                value={textos.description}
                onChange={setDescripcion}
            />
            <label htmlFor="url_image">Url imagen</label>
            <input
                type="text"
                className="entrada"
                id="url_image"
                placeholder="escribir"
                value={textos.url_image}
                onChange={setUrlImagen}
            />
            <div className="area-botones">
                <button className="boton" type='submit'>Agregar</button>
                <button className="boton" type='button' onClick={()=>setMostrarAgregarImagen(false)}>Cerrar</button>
            </div>
        </form>
    );
}