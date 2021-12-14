/** 
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        check('email' ,  'La contraseñas es obligatoria').isEmail(),
        check('password' ,  'La contraseñas es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
)


module.exports = router;