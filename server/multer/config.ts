import multer from 'multer';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: './multer/imagenes'
});

export const multerUpload = multer({
    dest: "src/imagenes",
    limits: {
        fieldSize: 10000000
    },
    fileFilter: function (req, file, cb) {

        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        console.log(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        }
        cb(new Error('"Error: File upload only supports the following filetypes - " + filetypes' + filetypes));
    },
    storage,
});

