

export function ImagenesUna({url_image, title, description}:Imagen){
    console.log(url_image);
    return(
        <div className="caja-imagen">
            <img src={url_image} alt={title} className="foto" />
            <h2 className="titulo">{title}</h2>
            <p className="descripcion">{description}</p>
        </div>
    );
}