const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async() =>{

    try{
        await mongoose.connect(process.env.DB_CNN2, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        // useCreateIndex: true
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