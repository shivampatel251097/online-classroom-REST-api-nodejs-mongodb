const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    _id:{
        type:String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    fathername: {
        type:String,
        required: true
    },
    mothername: {
        type:String,
        required: true
    },
    course: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    phone: {
        type:Number,
        required: true
    },
    address: {
        type:String,
        required: true
    },
},
{
    timestamps: true
});


module.exports = mongoose.model('Student',studentSchema);