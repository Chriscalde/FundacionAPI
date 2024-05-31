const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    number:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('ticket',ticketSchema);