const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config')
var cors = require('cors');

//Creando el servidor de express
const app = express();

//Configuracion de Cors
app.use(cors());

//Base de datos 
dbConnection();

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok:true,
        message:"HOla mundo"
    })
})

app.listen(process.env.PORT, () =>{
    console.log('Servidor correindo en puerto ' + 3000)
})
