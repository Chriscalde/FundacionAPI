const jwt = require('jwt-simple');
const moment = require('moment');

const createToken = (user)  =>{
    let payload = {
        userId: user._id,
        createdAt: moment.unix(),
        expiresAt: moment().add(8,'hours').unix()
    }
    return jwt.encode(payload,process.env.JWT_KEY)
}

const checkToken = (req,res,next)=>{
    if(!req.headers.authorization)
        return res.json({
            success: false,
            msg: 'Authorization not sent'
        });
    const token = req.headers.authorization
    let payload = null

    try {
        payload = jwt.decode(token,process.env.JWT_KEY)
    } catch (e) {
        return res.json({
            success: false,
            msg: 'Invalid Token'
        });
    }
    if(moment().unix() > payload.expiresAt){
        return res.json({
            success: false,
            msg: "Token Expired"
        });
    }
    req.userId = payload.userId

    next();
}

module.exports = {
    createToken,
    checkToken
}