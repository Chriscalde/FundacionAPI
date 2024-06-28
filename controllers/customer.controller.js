const Customer = require('../models/customer.model.js');
const Ticket = require('../models/ticket.model.js');
const whatsappMessage = require('../controllers/whatsapp.controller.js');
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

    try {
        const customer = await newCustomer.save();
        const populatedCustomer = await Customer.findById(customer._id).populate('tickets', 'id number').exec();
        const ticketNumbers = populatedCustomer.tickets.map(ticket => ticket.number).join(', ');
        const message = `Hola ${name}, gracias por tu compra. Tus números de boleto son: ${ticketNumbers}. ¡Buena suerte en la rifa!`;
        whatsappMessage.sendMessage(phone,message);
        res.status(200).json({
            success: true,
            data: populatedCustomer
        });
    } catch(err){
        res.status(500).send(err)
    };
    
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
exports.getCustomer = async(req,res) => {
    const customerId = req.params.id
    Customer.findById(customerId).populate('tickets','number').then(function(customer){
        res.status(200).json({
            success: true,
            data: customer
        })
    }).catch(function(e){
        res.status(500).send(e)
    })
}
exports.updateCustomer = async(req,res) => {
    const customerId = req.params.id
    const name = req.body.name
    const phone = req.body.phone
    const verified = req.body.verified
    Customer.findByIdAndUpdate(customerId,{name:name,phone:phone,verified:verified},{new:true})
        .then(function(updatedCustomer){
            res.status(200).json({
                success: true,
                data: updatedCustomer
            })
        })
        .catch(function(e){
            res.status(500).send(e)
        })
}
exports.deleteCustomer = async(req,res) => {
    const customerId = req.params.id
    try {
        const customer = await Customer.findById(customerId)
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        // Obtener los IDs de los tickets del cliente
        const ticketIds = customer.tickets;

        // Eliminar el cliente
        await Customer.findByIdAndDelete(customerId);

        // Actualizar los tickets relacionados
        await Ticket.updateMany(
            { _id: { $in: ticketIds } },
            { $set: { status: 'available' } }
        );
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch(e) {
        res.status(500).send(e)
    }
    
}