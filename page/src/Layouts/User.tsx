import React from "react";
import { Navigate, useParams } from 'react-router-dom';
import { UseContexto } from "../Context";
import { rutas } from "../Rutas";
import { readOtherUser, readUserImageTokens } from "../apis/usuarioApi";
import { ImagenesUna } from "../Components/Imagenes";


const initialUsuario: UsauioImagen = {
  name: '',
  user_name: '',
  url_perfil:'',
  imagenes: []
}

export function User() {
  const data = useParams();
  const { permiso, token } = UseContexto();
  const [usuario, setUsuario] = React.useState<UsauioImagen>(initialUsuario);

  localStorage.ir = `${rutas.mainuser}/${data.id_usuario ? data.id_usuario : ''}`;

  React.useEffect(() => {
    if (!data.id_usuario) {
      readUserImageTokens(token)
        .then(data => {
          setUsuario(data);
        });
    } else {
      readOtherUser(data.id_usuario)
        .then(data => setUsuario(data));
    }
  }, [data.id_usuario]);

  if (!permiso) return <Navigate to={rutas.login} />

  if (usuario.name)
    return (
      <>
        <div className="informacion-usuario">
          <img src={usuario.url_perfil} alt="" />
          <span className="nombre">{usuario.name}</span>
          <div className="area-imagenes">
            {usuario.imagenes.map(p=>(
              <ImagenesUna key={p.id_imagen} {...p}/>
            ))}
          </div>
        </div>
      </>
    );

  return null;
}
