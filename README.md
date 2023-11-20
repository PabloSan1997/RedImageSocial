# RedImageSocial

Este proyecto es un practica para crear una red social sencilla para solo compartir imagenes


### Solicitudes a la api

Si el servidor lo corres de forma local `localhost` el puerto por defecto es el `3000`.

La forma de las solicitudes y las respuestas son las siguientes:

#### Obtener todas las imagenes

```http
GET /api/imagenes
```

Se obtiene un arreglo de imagenes

|Parametro|Tipo|Descripcion|
|-|-|-|
|id_imagen|uuid|Primary key|
|title|string|Nombre de la imagen|
|description|string|Descripcion de la imagen|
|url_image|string|Url de la imagen|
|creadedAt|Date|Fecha y hora de la imagen creada|
|updatedAt|Date|Fecha y hora de actualizacion|
|usuario|object|Usuario a la que la imagen esta relacionada|

Propiedades del objeto usuario que se incluye en la imagen

|Parametro|Tipo|Descripcion|
|-|-|-|
|id_usuario|uuid|Primary key|
|name|string|Nombre del usuario|
|user_name|string|Nombre unico del usuario|
