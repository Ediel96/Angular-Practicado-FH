/* 
    Hospitales
    ruta: '/api/hospitales'
*/


/** 
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos') 


const {getHopitales, crearHopitales, actualizarHopitales, borrarHopitales } = require('../controller/hospitales')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',[validarJWT],  getHopitales);

router.post('/' ,
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    ],
    crearHopitales
);

router.put('/:id', 
    [
    ], 
    actualizarHopitales
);

router.delete('/:id', borrarHopitales)

module.exports = router;