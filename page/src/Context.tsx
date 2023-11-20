/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { readImagene } from "./apis/imagenesApi";
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

    React.useEffect(() => {
        if (permiso) {
            readImagene()
                .then(data => {
                    const ima = data as ImagenUsuario[];
                    setImagenes(ima);
                })
                .catch(error => {
                    console.error(error);
                    setPermiso(false);
                });
        }

    }, [permiso]);

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
            })
            .catch(error => {
                if (mostrarMensaje) {
                    const err = error as string
                    alert(err);
                }
            })
    }, [acutalizarLogin, permiso]);
    const loggear = (log: Login) => {
        setLogin(log);
        setActualizarLogin(!acutalizarLogin);
        setMostrarMensaje(true);
    }
    const cerrarSecion = () => {
        removeCookie('miToken');
        setPermiso(false);
        setLogin(initialStateLogin);
        setMostrarMensaje(false);
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
            setMostrarAgregarImagen
        }}>
            {children}
        </Contexto.Provider>
    );
}


export const UseContexto = () => React.useContext(Contexto) as Contexto;