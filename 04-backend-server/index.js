const express = require('express');

//Creando el servidor de express
const app = express();


app.get('/', (req, res) => {
    res.json({
        ok:true,
        message:"HOla mundo"
    })
})

app.listen(3000, () =>{
    console.log('Servidor correindo en puerto ' + 3000)
})
