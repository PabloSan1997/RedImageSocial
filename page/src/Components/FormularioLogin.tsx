import React from "react";
import { UseContexto, initialStateLogin } from "../Context";
import '../estilos/formularioLogin.scss'


export function FormularioLogin() {
    const { loggear } = UseContexto();
    const [textos, setTextos] = React.useState<Login>(initialStateLogin);
    const setUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextos({ ...textos, user_name: e.target.value });
    }
    const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextos({ ...textos, password: e.target.value });
    }
    const subir = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loggear(textos);
    }

    return (
        <form className="formulario-login" onSubmit={subir}>
            <label htmlFor="entrada-username">User name</label>
            <input
                type="text"
                className="entrada"
                id="entrada-username"
                onChange={setUser}
                value={textos.user_name}
                placeholder="Escribir"
            />
            <label htmlFor="entrada-password">Password</label>
            <input
                type="password"
                className="entrada"
                id="entrada-password"
                onChange={setPassword}
                value={textos.password}
                placeholder="Escribir"
            />
            <button className="boton" type="submit">Entrar</button>
        </form>
    );
}