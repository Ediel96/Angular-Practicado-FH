const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUploads ,retornaImagen } =  require('../controller/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUploads);
router.get('/:tipo/:foto',  retornaImagen);

module.exports = router;