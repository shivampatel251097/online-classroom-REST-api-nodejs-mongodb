var mongoose =  require('mongoose');
const { model } = require('./user');
var Schema =  mongoose.Schema;

const tutorSchema =  new Schema({
    _id:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    expertise:{

    },
    Experience:{
        type:Number,
        required: true
    }

},
{
    timestamps:true
});

module.exports  = mongoose.model('Tutor',tutorSchema);