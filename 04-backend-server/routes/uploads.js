const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUploads } =  require('../controller/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUploads);

module.exports = router;