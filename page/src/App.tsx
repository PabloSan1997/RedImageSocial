
import { FormularAgregar } from "./Components/FormularioAgregar";
import { UseContexto } from "./Context";
import { RutasProvedor } from "./Rutas";
import { CookiesProvider } from 'react-cookie';

export function App() {
    const {mostrarAgregarImagen} = UseContexto();
    return (
        <CookiesProvider>
            <RutasProvedor />
            {mostrarAgregarImagen?<FormularAgregar/>:null}
        </CookiesProvider>
    );
}