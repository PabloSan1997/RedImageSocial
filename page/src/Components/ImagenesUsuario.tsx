import { useNavigate } from 'react-router-dom';
import { rutas } from "../Rutas";

export function ImagenesUsuario(props: ImagenUsuario) {
    const { title, usuario, description, url_image } = props;
    const { name, url_perfil, id_usuario } = usuario;
    const navegar = useNavigate();
    return (
        <div className="imagenes-usuario">
            <div className="usuario-info">
                <div className="area_foto">
                    <img
                        src={url_perfil}
                        alt={name} className="foto-perfil"
                        onClick={() => navegar(`${rutas.mainuser}/${id_usuario}`)}
                    />
                </div>
                <span
                    className="nombre"
                    onClick={() => navegar(`${rutas.mainuser}/${id_usuario}`)}
                >{name}</span>
            </div>
            <p className="descripcion">{description}</p>
            <div className="parte_foto">
                <img src={url_image} alt={title} className="foto" />
                <h2 className="nombre-imagen">{title}</h2>
            </div>
        </div>
    );
}