const Ticket = require('../models/ticket.model')

exports.createTickets = async(req,res)=>{
    const firstNumber = req.body.firstNumber
    const lastNumber = req.body.lastNumber
    const documents = [];
        for (let i = firstNumber; i <= lastNumber; i++) {
            documents.push({
            number: i.toString().padStart(4, '0'),
            status: false
            });
        }
        Ticket.insertMany(documents).then(function () {
            console.log("Data inserted")
            res.status(500).send({
                success:true,
            }) // Success 
        }).catch(function (error) {
            console.log(error)     // Failure 
        }); 
}