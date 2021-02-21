const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating user Schema
const User = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    admin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('User',User);