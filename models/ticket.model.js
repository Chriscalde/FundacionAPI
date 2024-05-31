const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    number:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('ticket',ticketSchema);