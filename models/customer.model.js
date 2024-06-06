const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: String, 
        required: true,
        unique: true,
        dropDups: true
    },
    imgURL:{
        type: String,
        required: true 
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    orderNumber: {
        type: Number,
        required: false
    },
    tickets:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'ticket',
        required: true
    }]
},{timestamps: true});

module.exports = mongoose.model('customer',customerSchema)