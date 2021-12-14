const { response } = require('express');
const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response, next) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({ 
                ok: false,
                msg:'Email no valida'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({ 
                ok: false,
                msg:'Contraseña no valida'
            });
        }

        //Generar la JWT
        const token = await generarJWT( usuarioDB.id );
        
        res.json({ 
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            msg:'Hable con el administrado o con el desarrollador de aplicativo'
        })
    }
}

module.exports={
    login
}