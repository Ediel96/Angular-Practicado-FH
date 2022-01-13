
const { response } = require('express');
const hospital = require('../models/hospital');
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
    const id =  req.params.id;
    const uid = req.uid;

    const medico = await Medico.findById(id);

    if(!medico){
        return res.status(404).json({
            ok:true,
            msg:'medico no se encuentra por el id'
        });
    }

    try {

    const cambiosMedico = {
        ...req.body,
        usuario: uid
    }

    const medicoActualizar = await Medico.findByIdAndUpdate( id, cambiosMedico, {new: true});

        res.json({
            ok:true,
            medico: medicoActualizar
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            mgs:'Hable con el administrador'
        });
    }
}


const borrarMedico = async (req, res = response) => {
    const id =  req.params.id;

    const medico = await Medico.findById(id);

    if(!medico){
        return res.status(404).json({
            ok:true,
            msg:'medico no se encuentra por el id'
        });
    }

    try {

        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            medico: 'medico eliminado'
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            mgs:'Hable con el administrador'
        });
    }
}

module.exports = { 
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}