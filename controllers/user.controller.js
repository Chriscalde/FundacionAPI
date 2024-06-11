const bcrypt = require('../helpers/bcrypt');
const User = require('../models/usermodel');

exports.createUser = async(req,res)=>{
    const username = req.body.username
    const name = req.body.name
    const mail = req.body.mail
    const phone = req.body.phone
    const password = req.body.password

    let encryptedPassword = ''
    password ? encryptedPassword = await bcrypt.hashPassword(password) : null

    const newUser = new User({
        username,
        name,
        mail,
        phone,
        password: encryptedPassword
    });

    newUser.save().then(function(user){
        res.status(200).json({
            success: true,
            data: user
        })
    }).catch(function(err){
        res.status(500).send(err)
    });
}

