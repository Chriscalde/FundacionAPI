const Customer = require('../models/customer.model.js')
exports.createCustomer = async(req,res)=>{
    const name = req.body.name
    const phone = req.body.phone
    const imgURL = req.body.imgURL
    const verified = req.body.verified
    const orderNumber = req.body.orderNo
    const tickets = req.body.tickets

    const newCustomer = new Customer({
        name,
        phone,
        imgURL,
        verified,
        orderNumber,
        tickets
    });

    newCustomer.save().then(function(tickets){
        res.status(200).json({
            success: true,
            data: tickets
        });
    }).catch(function(err){
        res.status(500).send(err)
    });
    
}

exports.getCustomers = async(req,res)=>{
    Customer.find({}).then(function(tickets){
        res.status(200).json({
            success:true,
            data: tickets
        })
    }).catch(function(e){
        res.status(500).send(e)
    })
}

exports.getLastOrder = async(req,res)=>{
    Customer.findOne().sort({orderNumber:-1}).select('orderNumber').exec().then(function(order){
        res.status(200).json({
            success: true,
            data: order
        })
    }).catch(function(e){
        res.status(500).send(e)
    })
}