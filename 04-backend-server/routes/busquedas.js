const { Router } = require('express');
const { getBusqueda, getDocumentColeccion} = require('../controller/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:nombre', validarJWT, getBusqueda);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentColeccion)

module.exports = router;