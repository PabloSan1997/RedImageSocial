
import { RutasProvedor } from "./Rutas";
import { CookiesProvider } from 'react-cookie';

export function App() {
    return (
        <CookiesProvider>
            <RutasProvedor />
        </CookiesProvider>
    );
}