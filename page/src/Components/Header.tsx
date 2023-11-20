import { UseContexto } from '../Context';
import { rutas } from '../Rutas';
import logo from '../asserts/logo.svg';
import { useNavigate } from 'react-router-dom';
import '../estilos/header.scss'

export function Header() {
    const { cerrarSecion, permiso, nombre } = UseContexto();
    const navegar = useNavigate();
    return (
        <header>
            <h1 className="titulo">
                <img src={logo} alt="logo" className="logo" />
                <p className="titulo-texto">JPImagenes</p>
            </h1>
            {permiso ? (
                <div className="area_menu">
                    <span className="home" onClick={() => navegar(rutas.home)}>Home</span>
                    <span className="nombre" onClick={() => navegar(rutas.mainuser)}>{nombre}</span>
                    <span className="loguot" onClick={cerrarSecion}>Logout</span>
                </div>
            ) : null}
        </header>
    );
}