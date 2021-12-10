
/** 
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios } = require('../controller/usuarios')

const router = Router();

router.get('/', getUsuarios)

module.exports = router;