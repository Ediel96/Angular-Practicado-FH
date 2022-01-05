
const { response } = require('express');
const Medico = require('../models/medicos');


const getMedico = async (req, res = response) => {

    const medico = await Medico.find()
                                .populate('usuario' , 'nombre img')
                                .populate('hospital' , 'nombre img');

    res.json({
        ok:true,
        medico
    })
}


const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario : uid,
        ...req.body
    })

    try {
        const medicoDB = await medico.save();
        
        res.json({
            ok:true,
            msg: medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

    
}


const actualizarMedico = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Actualizar Medico'
    })
}


const borrarMedico = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Borrar Medico'
    })
}

module.exports = { 
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}