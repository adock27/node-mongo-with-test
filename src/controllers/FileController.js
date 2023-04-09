// Importamos la biblioteca "multer" que se utiliza para manejar la carga de archivos.
const multer = require('multer')
const path = require('path')
const fs = require('fs')



// Creamos un objeto "storage" que especifica cómo y dónde se guardarán los archivos que se cargan utilizando multer.
const storage = multer.diskStorage({
    // La propiedad "destination" especifica la carpeta donde se guardarán los archivos.
    destination: path.join(__dirname, '../public/uploads'),
    // La propiedad "filename" establece el nombre del archivo.
    filename: function (req, file, cb) {
        // En este caso, el nombre del archivo se compone de la marca de tiempo actual y el nombre original del archivo.
        cb(null, Date.now() + '-' + file.originalname)
    },
});

// Inicializamos un objeto "upload" con la configuración de almacenamiento de archivos.
const upload = multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads'),
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extType = fileTypes.test(file.originalname);
        if (mimeType && extType) {
            return cb(null, true)
        }
        cb('Extension no valida')
    }
})

// Exportamos una función "upload" que se utilizará para procesar las solicitudes de carga de archivos.
// "upload.single('file')" indica que solo se permitirá la carga de un solo archivo por solicitud HTTP,
// y se espera que el archivo se envíe en una solicitud HTTP como un campo de formulario llamado 'file'.
exports.upload = upload.single('file');

// Exportamos una función "uploadFile" que se utilizará para manejar la carga de archivos y para realizar cualquier otra acción necesaria en la ruta de carga.
exports.uploadFile = (req, res) => {
    console.log(req.file);
    res.send({
        path: `http://localhost:3001/uploads/${req.file.filename}`,
        filepath: req.file.path
    })
}
// Exportamos una función "uploadFile" que se utilizará para manejar la carga de archivos y para realizar cualquier otra acción necesaria en la ruta de carga.
exports.removeFile = (req, res) => {

    const path = req.body.path
    // console.log(path);

    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }

        //file removed

        res.send({
           response: 'delete'
        })
    })



}
