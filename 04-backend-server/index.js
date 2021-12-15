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

//lectuta y parseo de body
app.use(express.json());

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));




app.listen(process.env.PORT, () =>{
    console.log('Servidor correindo en puerto ' + process.env.PORT)
})
