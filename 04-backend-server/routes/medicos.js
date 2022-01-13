/* 
    Hospitales
    ruta: '/api/medicos'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { crearMedico, getMedico, actualizarMedico, borrarMedico} = require('../controller/medicos');

const router = Router();

router.get('/',  getMedico);

router.post('/' ,
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        check('hospital', 'El hospital es requerido').isMongoId(),
        validarCampos

    ],
    crearMedico
);

router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        check('hospital', 'El hospital es requerido').isMongoId(),
        validarCampos
    ], 
    actualizarMedico
);

router.delete('/:id', validarJWT, borrarMedico)

module.exports = router;