import fs from 'fs';

export async function borrarCacheImagen(name:string){
    return new Promise<void>((resolve, reject) => {
        fs.unlink('./multer/imagenes/'+name, (error)=>{
            if(error){
                reject();
            }
            resolve();
        });
    })
}