const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const pagina = Number(req.query.desde) || 0;

    const [ usuarios , total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google')
            .skip(pagina)
            .limit(5),
        
        Usuario.count()
        
    ])

    res.json({
        ok:true,
        usuarios,
        total
    })
}


const crearUsuarios = async(req, res= response) => {
    
    const {email, password, nombre} = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email })

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'el correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar passworld
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        

        //guarda usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
            
        })

    }catch(error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error inesperado... revisar logs'
        })
    }
}

const actualizaUsuarios = async (req, res = response) => {
    
    const uid = req.params.id;

    const usuarioDB = await Usuario.findById(uid);

    if(!usuarioDB){ 
        return res.status(404).json({
            ok: false,
            msg:'No existe un usuario por ese id'
        });
    }

    //Actualizar
    const { password, google, email, ...campos} = req.body;

    if(usuarioDB.email !== req.body.email){
        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'Ya existe un usuario con este correo'
            })
        }
    }

    campos.email = email;
    const usuarioActulizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

    try {
        res.json({
            ok:true,
            usuario : usuarioActulizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
        
    }

}

const borrarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;
    

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){ 
            return res.status(404).json({
                ok: false,
                msg:'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid)

        res.json({
            ok:true,
            msg : `El usuario  ${usuarioDB.nombre}`  
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
        
    }
    
}

module.exports = { 
    getUsuarios,
    crearUsuarios,
    actualizaUsuarios,
    borrarUsuario
}