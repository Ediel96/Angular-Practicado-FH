
const getUsuarios = (req, res) => {
    res.json({
        ok:true,
        usuario:[{
            id:123,
            nombre: 'Anonimus'
        }]
    })
}


module.exports = { 
    getUsuarios
}