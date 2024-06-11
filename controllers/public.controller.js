const bcrypt = require('../helpers/bcrypt');
const auth = require('../helpers/auth');
const User = require('../models/usermodel');

exports.loginUser = async(req,res)=>{
    const username = req.body.username
    const clientPassword = req.body.password

    const user = await User.findOne({username})
    const isMatch = await bcrypt.comparePasswords(clientPassword,user.password)
    
    if(isMatch){
        const token = auth.createToken(user)
        res.status(200).json({
            success:true,
            data: user,
            token
        })
    } else {
        res.status(400).json({
            success: false,
            msg: 'Incorrect Credentials'
        })
    }
}