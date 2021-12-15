

const { response } = require('express');


const getHopitales = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Lista todos los Hospitales'
    })
}


const crearHopitales = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Crear hopitales'
    })
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