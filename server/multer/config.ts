import multer from 'multer';

const storage = multer.diskStorage({
    filename:(req, file, cb)=>{
        cb(null, file.originalname);
    },
    destination:'./multer/imagenes'
});

export const multerUpload = multer({
    dest: "src/imagenes",
    limits: {
		fieldSize: 10000000,
	},
	storage,
});

