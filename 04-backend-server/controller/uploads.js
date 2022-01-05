const { response } = require('express');
const expressFileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');

const fileUploads = ( req , res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo
    const tiposValidos = ['hospitales','medicos','usuarios'];

    if( !tiposValidos.includes(tipo)){
        return res.status(400).json({ 
            ok:false,
            msg: 'No es medicom usuario u hospital.'
        })
    }

    //validar archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo.'
        });
    }


    const file = req.files.imagen;

    console.log(file)

    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length -1];

    //validar extension 
    const extensionValida = ['png','jpg','gif','jpeg'];
    if(!extensionValida.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un extencion permitida.'
        });
    }

    //Generar el nombre del archivo de arch
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    
    const path = `./uploads/${tipo}/${nombreArchivo}`;


    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:'Error en el archivo.'
            });
        }

        res.json({
            ok:true,
            msg: 'Archivo archivo',
            nombreArchivo
        });

    });
}

module.exports ={
    fileUploads
}