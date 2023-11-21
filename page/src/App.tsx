
import { FormularAgregar } from "./Components/FormularioAgregar";
import { Loading } from "./Components/Loading";
import { UseContexto } from "./Context";
import { RutasProvedor } from "./Rutas";
import { CookiesProvider } from 'react-cookie';

export function App() {
    const { mostrarAgregarImagen, loading } = UseContexto();

    if (loading) return <Loading />
    return (
        <CookiesProvider>
            <RutasProvedor />
            {mostrarAgregarImagen ? <FormularAgregar /> : null}
        </CookiesProvider>
    );
}