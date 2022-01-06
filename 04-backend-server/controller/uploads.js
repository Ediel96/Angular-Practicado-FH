const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { actualizarImagen } = require('../helpers/actualizar-imagen')

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

        //Actualizar imagen
        actualizarImagen( tipo, id,  nombreArchivo);

        res.json({
            ok:true,
            msg: 'Archivo archivo',
            nombreArchivo
        });

    });
}

const retornaImagen = (req, res)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/not-img.jpeg`);
        res.sendFile(pathImg);
    }

}

module.exports ={
    fileUploads,
    retornaImagen
}