import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ProvedorContexto } from "./Context";
import './estilos/index.scss';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
    <ProvedorContexto>
        <App />
    </ProvedorContexto>
);
