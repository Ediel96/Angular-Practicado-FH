const mongoose = require('mongoose');

const dbConnection = async() =>{

    try{
        await mongoose.connect('mongodb+srv://eddi:2050255LPLP@cluster0.ytqgn.mongodb.net/test?authSource=admin&replicaSet=atlas-t0m6g1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        // useCreateIndex:true,
        });
        console.log('DB Online')
    }catch(error){
        console.error(error);
        throw new Error('Error a la hora de iniciar la BD ver logs')
    }

}


module.exports ={
    dbConnection
}