import fs from 'fs';

export function leerArchivoImagen(direc:string){
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(direc,(err, data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}