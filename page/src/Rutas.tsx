import { HashRouter, useRoutes } from 'react-router-dom';
import { Redirigir } from './Components/Redirigir';
import { Login } from './Layouts/Login';
import { Home } from './Layouts/Home';
import { User } from './Layouts/User';
import { Imagen } from './Layouts/Imagen';
import { Header } from './Components/Header';
import { BotonAgregar } from './Components/BotonAgregar';

// eslint-disable-next-line react-refresh/only-export-components
export const rutas = {
    login: '/login',
    home: '/home',
    user: '/user/:id_usuario',
    mainuser: '/user',
    imagen: '/imagen'
}

const Rutas = () => useRoutes([
    {
        path: '/',
        element: <Redirigir />
    },
    {
        path: rutas.login,
        element: <Login />
    },
    {
        element: <Home />,
        path: rutas.home
    },
    {
        path: rutas.mainuser,
        element: <User />
    },
    {
        path: rutas.user,
        element: <User />
    },
    {
        path: rutas.imagen,
        element: <Imagen />
    }
]);

export function RutasProvedor() {
    return (
        <HashRouter>
            <Header />
            <Rutas />
            <BotonAgregar/>
        </HashRouter>
    );
}