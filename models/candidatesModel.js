const mongoose = require('mongoose');
const Schema = mongoose.Schema

const candidatesSchema = new Schema({
    name:{
        type: String,
        required : true,
        unique : true
    },
    nationalNum:{
        type: String,
        required: true,
        unique : true
    }
    
},{ timestamps:true })

module.exports = mongoose.model('Candidate', candidatesSchema)