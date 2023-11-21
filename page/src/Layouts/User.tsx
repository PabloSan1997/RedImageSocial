/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Navigate, useParams } from 'react-router-dom';
import { UseContexto } from "../Context";
import { rutas } from "../Rutas";
import { readOtherUser, readUserImageTokens } from "../apis/usuarioApi";
import { ImagenesUna } from "../Components/Imagenes";
import '../estilos/user.scss';

const initialUsuario: UsauioImagen = {
  name: '',
  user_name: '',
  url_perfil: '',
  imagenes: []
}

export function User() {
  const data = useParams();
  const { permiso, token } = UseContexto();
  const [usuario, setUsuario] = React.useState<UsauioImagen>(initialUsuario);
  const [modoAdmin, setModoAdmin] = React.useState(false);
  const [act, setAct] = React.useState(false);

  localStorage.ir = `${rutas.mainuser}/${data.id_usuario ? data.id_usuario : ''}`;

  React.useEffect(() => {
    if (!data.id_usuario) {
      readUserImageTokens(token)
        .then(data => {
          setUsuario(data);
          setModoAdmin(true);
        });
    } else {
      readOtherUser(data.id_usuario)
        .then(data =>{ 
          setUsuario(data);
          setModoAdmin(false);
        });
    }
  }, [data.id_usuario, act]);

  if (!permiso) return <Navigate to={rutas.login} />

  if (usuario.name)
    return (
      <>
        <div className="efecto-imagen">
          <img src={usuario.url_perfil} alt="" className="foto-perfil-main" />
        </div>
        <h2 className="nombre-perfil">{usuario.name}</h2>
        <div className="area-imagenes">
          {usuario.imagenes.map(p => (
            <ImagenesUna key={p.id_imagen} {...p} modoAdmin={modoAdmin} act={act} setAct={setAct}/>
          ))}
        </div>

      </>
    );

  return null;
}
