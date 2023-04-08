// Importamos la biblioteca "multer" que se utiliza para manejar la carga de archivos.
const multer = require('multer')

// Creamos un objeto "storage" que especifica cómo y dónde se guardarán los archivos que se cargan utilizando multer.
const storage = multer.diskStorage({
    // La propiedad "destination" especifica la carpeta donde se guardarán los archivos.
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    // La propiedad "filename" establece el nombre del archivo.
    filename: function (req, file, cb) {
        console.log(file);
        // En este caso, el nombre del archivo se compone de la marca de tiempo actual y el nombre original del archivo.
        cb(null, Date.now() + '-' + file.originalname)
    }
});

// Inicializamos un objeto "upload" con la configuración de almacenamiento de archivos.
const upload = multer({ storage: storage })

// Exportamos una función "upload" que se utilizará para procesar las solicitudes de carga de archivos.
// "upload.single('file')" indica que solo se permitirá la carga de un solo archivo por solicitud HTTP,
// y se espera que el archivo se envíe en una solicitud HTTP como un campo de formulario llamado 'file'.
exports.upload = upload.single('file');

// Exportamos una función "uploadFile" que se utilizará para manejar la carga de archivos y para realizar cualquier otra acción necesaria en la ruta de carga.
exports.uploadFile = (req, res) => {
    res.send({
        data: 'Upload Route is working correctly'
    })
}
