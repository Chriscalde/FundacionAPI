const Customer = require('../models/customer.model.js')
exports.createCustomer = async(req,res)=>{
    const name = req.body.name
    const phone = req.body.phone
    const imgURL = req.body.imgURL
    const verified = req.body.verified
    const orderNo = req.body.orderNo
    const tickets = req.body.tickets

    const newCustomer = new Customer({
        name,
        phone,
        imgURL,
        verified,
        orderNo,
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