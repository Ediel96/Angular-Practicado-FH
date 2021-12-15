/* 
    Hospitales
    ruta: '/api/medicos'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { crearMedico, getMedico, actualizarMedico, borrarMedico} = require('../controller/medicos');
// const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',  getMedico);

router.post('/' ,
    [
    ],
    crearMedico
);

router.put('/:id', 
    [
    ], 
    actualizarMedico
);

router.delete('/:id', borrarMedico)

module.exports = router;