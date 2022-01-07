/** 
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    [
        check('email' ,  'La contraseñas es obligatoria').isEmail(),
        check('password' ,  'La contraseñas es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/google', 
    [
        check('token' ,  'La contraseñas es obligatoria').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
)

router.get('/renew',
    validarJWT,
    renewToken
)

module.exports = router;