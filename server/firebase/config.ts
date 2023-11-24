import { initializeApp } from "firebase/app";
import { variables } from "../utilities/variables";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
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

export async function subirArchivo(file: Express.Multer.File, id_imagen: string): Promise<string> {
    const formato = file.mimetype.split('image/')[1];
    const storageref = ref(storage, `${baseStorage}/${id_imagen}.${formato}`);
    const data = await leerArchivoImagen(`${file.destination}/${file.filename}`);
    await uploadBytes(storageref, data, {contentType:file.mimetype});
    const url = await getDownloadURL(storageref);
    await borrarCacheImagen(file.filename);
    return url;
}
