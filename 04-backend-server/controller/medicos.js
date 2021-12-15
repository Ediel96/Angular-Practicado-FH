


const { response } = require('express');


const getMedico = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Lista todos los Medico'
    })
}


const crearMedico = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Crear Medico'
    })
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