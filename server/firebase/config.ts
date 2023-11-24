import { initializeApp } from "firebase/app";
import { variables } from "../utilities/variables";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { leerArchivoImagen } from "../utilities/readImage";
import { borrarCacheImagen } from "../utilities/borrarCacheImagen";


const { appId, apiKey, authDomain, projectId, storageBucket, messagingSenderId } = variables;

const baseStorage = 'JPimagenes';

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export async function subirArchivo(file: Express.Multer.File, id_imagen: string, formato: string): Promise<string> {
    const storageref = ref(storage, `${baseStorage}/${id_imagen}.${formato}`);
    const data = await leerArchivoImagen(`${file.destination}/${file.filename}`);
    await uploadBytes(storageref, data, { contentType: file.mimetype });
    const url = await getDownloadURL(storageref);
    await borrarCacheImagen(file.filename);
    return url;
}

export async function eliminarArchivo(id_imagen_format: string) {
    const refe = ref(storage, `${baseStorage}/${id_imagen_format}`);
    await deleteObject(refe);
}
