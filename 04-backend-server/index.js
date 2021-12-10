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

//Rutas

app.use('/api/usuarios', require('./routes/usuarios'))

// app.get('/', (req, res) => {
//     res.json({
//         ok:true,
//         body:[{
//             nombre:' hello perras'
//         }]
//     })
// })



app.listen(process.env.PORT, () =>{
    console.log('Servidor correindo en puerto ' + 3000)
})
