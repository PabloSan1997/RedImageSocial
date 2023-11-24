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
    const [archivo, setArchivo] = React.useState<File>();
    const {agregarImagen, setMostrarAgregarImagen} = UseContexto();

    const setTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTextos({...textos, title:e.target.value});
    }
    const setDescripcion=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTextos({...textos, description:e.target.value});
    }
    const agregarArchivo=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files)
        setArchivo(e.target.files[0]);
    }
    const subir=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        agregarImagen(textos, archivo as File)
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
            <label htmlFor="url_image">Agregar imagen</label>
            <input
                type="file"
                className="file"
                id="file_imagen"
                placeholder="escribir"
                onChange={agregarArchivo}
            />
            <div className="area-botones">
                <button className="boton" type='submit'>Agregar</button>
                <button className="boton" type='button' onClick={()=>setMostrarAgregarImagen(false)}>Cerrar</button>
            </div>
        </form>
    );
}