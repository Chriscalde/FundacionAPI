const bcrypt = require('bcrypt')

const hashPassword = async(password)=>{
    const saltRounds = 10;
    
    const hashedPassword = await new Promise((resolve,reject)=>{
        bcrypt.hash(password,saltRounds,(err,hash)=>{
            err ? reject(err) : resolve(hash)
        });
    });
    return hashedPassword
}

const comparePasswords = async(cPass,sPass)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(cPass,sPass,(err,res)=>{
            err ? reject(err) : resolve(res)
        });
    });
}

module.exports = {
    hashPassword,
    comparePasswords
}