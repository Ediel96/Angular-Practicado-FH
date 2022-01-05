const { response } = require('express');

//Modelos
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital'); 


const getBusqueda = async (req, res = response) => {
    const nombre =  req.params.nombre;
    const regex = new RegExp( nombre , 'i');

    console.log(nombre);

    const [ usuarios, medicos , hospitales] = await Promise.all([
        Usuario.find({nombre : regex}),
        Medico.find({nombre : regex}),
        Hospital.find({nombre : regex}),
    ])

    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentColeccion = async (req, res = response) => {
    const tabla =  req.params.tabla;
    const nombre =  req.params.busqueda;
    const regex = new RegExp( nombre , 'i');
    let data = [];


    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre : regex})
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');;
            break;
        case 'hospitales':
            data = await Hospital.find({nombre : regex})
                                    .populate('usuario', 'nombre img');;
            break;

        case 'usuarios':
            data = await Usuario.find({nombre : regex});
            break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg:'la tabla tiene que ser usuarios/medicos/hospitales'
            })
            break;
    }

    res.json({
        ok:true,
        resultado:data
    })
}

module.exports = { 
    getBusqueda,
    getDocumentColeccion
}