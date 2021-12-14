const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google')

    res.json({
        ok:true,
        usuarios
        
    })
}


const crearUsuarios = async(req, res= response) => {
    
    const {email, password, nombre} = req.body;
    
    console.log(' se paso por huevos la condicional')

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

        res.json({
            ok:true,
            usuario
            
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