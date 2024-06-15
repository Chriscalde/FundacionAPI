const Ticket = require('../models/ticket.model')

exports.createTickets = async(req,res)=>{
    const firstNumber = req.body.firstNumber
    const lastNumber = req.body.lastNumber
    const documents = [];
        for (let i = firstNumber; i <= lastNumber; i++) {
            documents.push({
            number: i.toString().padStart(4, '0'),
            status: "available"
            });
        }
        Ticket.insertMany(documents).then(function (docs) {
            console.log("Data inserted")
            res.status(200).json({
                success:true,
                data: docs
            }) // Success 
        }).catch(function(error) {
            res.status(500).send(error)     // Failure 
        }); 
}

exports.getAllTickets = async(req,res)=>{
    //  Ticket.find({},null,function(err,tickets){
    //     if(err){
    //         res.status(200).send(err);
    //     }else{
    //         // res.status(500).json({
    //         //     success: true,
    //         //     data: tickets
    //         // });
    //         console.log(tickets)
    //     }
    // })
    Ticket.find({}).sort({number:1}).then(function(tickets){
        res.status(200).json({
            success:true,
            data:tickets
            })
        }).catch(function(err){
            res.status(500).send(err)
    })
}

exports.updateStatus = async(req,res)=>{
    const tickets = req.body.tickets
    const status = req.body.status
    try {
        const result = await Ticket.updateMany({_id:{$in:tickets}},{$set:{status:status}});
        res.status(200).json({
            success: true,
            res: result,
            data: tickets
        })
    } catch(err) {
        res.status(500).send(err)
    }
    // .then(function(tickets){
    //     console.log(`Ticket: ${id} Updated`)
        
    // }).catch(function(err){
    //     res.status(500).send(err)
    // })
    ;
}
