

const { response } = require('express');
const  Hospital  = require('../models/hospital')


const getHopitales = async (req, res = response) => {

    const hospitalDB = await Hospital.find();

    res.json({
        ok:true,
        msg: hospitalDB
    });
}


const crearHopitales = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario : uid,
        ...req.body
    });

    console.log(uid);

    try {

        const hospitalDB = await hospital.save()
        
        res.json({
            ok:true,
            msg: hospitalDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            ok:false,
            msg:'Hable con el administrador'
        })
    }

    
}


const actualizarHopitales = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Actualizar hopitales'
    })
}


const borrarHopitales = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Borrar hospital'
    })
}

module.exports = { 
    getHopitales,
    crearHopitales,
    actualizarHopitales,
    borrarHopitales
}