const {Schema, model} = require('mongoose');

const MedicoShema = Schema({
    nombre: {
        type:String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    }
},{collection: 'hospitales'})

MedicoShema.method('toJSON', function(){
    const {__v,  ...object} = this.toObject();
    return object;
})


module.exports = model('Usuario', MedicoShema)