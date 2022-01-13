

const { response } = require('express');
const  Hospital  = require('../models/hospital')


const getHopitales = async (req, res = response) => {

    const hospitalDB = await Hospital.find().populate('usuario' , 'nombre img');

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
    
    const id =  req.params.id;
    const uid = req.uid;

    const hospital = await Hospital.findById(id);

    try{

        if(!hospital){
            return res.status(404).json({
                ok:true,
                msg:'hospital no encontrado por el id'
            })
        }

        const cambiosHopital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHopital, {new: true});


        res.json({
            ok : true,
            hospital : hospitalActualizado
        })

    }catch(error){
        
        console.log(error);

        res.status(500).json({
            ok:false,
            mgs:'Hable con el administrador'
        })
    }
}


const borrarHopitales = async (req, res = response) => {
    const id =  req.params.id;

    const hospital = await Hospital.findById(id);

    try{

        if(!hospital){
            return res.status(404).json({
                ok:true,
                msg:'hospital no encontrado por el id'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok : true,
            msg : 'hospital eliminado'
        })

    }catch(error){
        
        console.log(error);

        res.status(500).json({
            ok:false,
            mgs:'Hable con el administrador'
        })
    }
}

module.exports = { 
    getHopitales,
    crearHopitales,
    actualizarHopitales,
    borrarHopitales
}