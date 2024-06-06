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

    // newCustomer.save(async(err,savedCustomer)=>{
    //     if(err){
    //         res.status(500).send(err)
    //     }else{
    //         res.status(200).json({
    //             success:true,
    //             data:savedCustomer
    //         })
    //     }
    // })
    // newCustomer.save(function(err,data){
    //     if(err){
    //         res.status(200).send(err)
    //     }else{
    //         res.status(500).json({
    //             success:true,
    //             data:data
    //         })
    //     }
    // })
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