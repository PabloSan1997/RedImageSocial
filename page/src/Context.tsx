/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { agregarNuevaImagen, borrarImagen, puraImagen, readImagene } from "./apis/imagenesApi";
import { loginRequest, readUsuarioToken } from "./apis/usuarioApi";
import { useCookies } from 'react-cookie';

const Contexto = React.createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const initialStateLogin: Login = {
    user_name: '',
    password: ''
}

export function ProvedorContexto({ children }: Children) {
    const [permiso, setPermiso] = React.useState(false);
    const [imagenes, setImagenes] = React.useState<ImagenUsuario[]>([]);
    const [login, setLogin] = React.useState<Login>(initialStateLogin);
    const [acutalizarLogin, setActualizarLogin] = React.useState(false);
    const [mostrarMensaje, setMostrarMensaje] = React.useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['miToken']);
    const [nombre, setNombre] = React.useState('');
    const [mostrarAgregarImagen, setMostrarAgregarImagen] = React.useState(false);
    const [nuevaImagenActualizar, setNuevaImagenActualizar] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (permiso) {
            readImagene()
                .then(data => {
                    const ima = data as ImagenUsuario[];
                    setImagenes(ima);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setPermiso(false);
                    setLoading(false);
                });
        }

    }, [permiso, nuevaImagenActualizar]);

    React.useEffect(() => {
        readUsuarioToken(cookie.miToken)
            .then(data => {
                setPermiso(data.permiso);
                setNombre(data.name);
            });
    }, [cookie.miToken]);

    React.useEffect(() => {
        loginRequest(login)
            .then(data => {
                setPermiso(data.permiso);
                setCookie('miToken', data.token, { maxAge: 10000 });
                setLoading(false);
            })
            .catch(error => {
                if (mostrarMensaje) {
                    const err = error as string
                    alert(err);
                }
                setLoading(false);
            })
    }, [acutalizarLogin, permiso]);
    const loggear = (log: Login) => {
        setLogin(log);
        setActualizarLogin(!acutalizarLogin);
        setMostrarMensaje(true);
        setLoading(true);
    }
    const cerrarSecion = () => {
        removeCookie('miToken');
        setPermiso(false);
        setLogin(initialStateLogin);
        setMostrarMensaje(false);
    }
    const agregarImagen = async (imagenNueva: AgregarImagen, data:File) => {
        const imag = await agregarNuevaImagen(imagenNueva, cookie.miToken);
        await puraImagen(data, imag.id_imagen, cookie.miToken);
        setNuevaImagenActualizar(!nuevaImagenActualizar);
        setLoading(true);
    }
    const borrarLaImagen = async (id_imagen: string) => {
        await borrarImagen(id_imagen, cookie.miToken);
        setLoading(true);
        setNuevaImagenActualizar(!nuevaImagenActualizar);
    }
    return (
        <Contexto.Provider value={{
            permiso,
            imagenes,
            loggear,
            cerrarSecion,
            token: cookie.miToken,
            nombre,
            mostrarAgregarImagen,
            setMostrarAgregarImagen,
            agregarImagen,
            borrarLaImagen,
            loading
        }}>
            {children}
        </Contexto.Provider>
    );
}


export const UseContexto = () => React.useContext(Contexto) as Contexto;