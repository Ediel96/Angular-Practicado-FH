const { response } = require('express');

const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const Usuario = require('../models/usuario');



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

const googleSingIn = async (req, res = response) => {

    const googleToken = req.body.token;


    try {
        const {name, email, picture}  = await googleVerify( googleToken );

        //verificar si el usuario existe 
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        console.log('usuario Existe : ' , !usuarioDB)
        if(!usuarioDB){
            usuario = new Usuario( {
                nombre: name, 
                email, 
                password: '@@@',
                picture,
                img: picture,
                google: true
            })
        }else{
            //existe usuario 
            usuario = usuarioDB;
            usuario.google = true;
        }

        console.log('usuario guardar', usuario);
        //Guardar en DB
        const usuarioAct= await usuario.save();

        console.log('generar el token : ', usuarioAct)
        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB._id);

        return res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //Generar el Token
    const token = await generarJWT(uid);

    //obtener Usurio
    const usuariodb = await Usuario.findById(uid);

    res.json({
        ok:true,
        token,
        usuariodb
    })
}

module.exports={
    login,
    googleSingIn,
    renewToken
}