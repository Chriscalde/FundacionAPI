const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    number:{
        type: String,
        required: true,
        unique: true, 
        dropDups: true
    },
    status:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('ticket',ticketSchema);