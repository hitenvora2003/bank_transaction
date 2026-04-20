const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createdata = async(req,res)=>{
    try{
        let passdata = req.body
        passdata.password = await bcrypt.hash(passdata.password,10)
        const datas = await user.create(passdata)
        res.status(200).json({
            status : 'success',
            message : 'data create successfuly',
            data : datas
        })
    }catch(error){
            res.status(500).json({
            status : 'fail',
           message : error.message
         
        })
    }
}
exports.login = async(req,res)=>{
    try{
        let passdata = req.body
        const emailVerify = await user.findOne({
            $or : [
                {name : passdata.name},
                 {email : passdata.email},
            ]
        });
        console.log(emailVerify);
        if(!emailVerify)throw new Error('invalid name or email')

        const passVerify = await bcrypt.compare(
            passdata.password,
            emailVerify.password
        )
        console.log(passVerify);  
        if(!passVerify)throw new Error('invalid password') 
        
      const token = jwt .sign({id : emailVerify._id},'ten',{expiresIn : '1d'})
     
        res.status(200).json({
            status : 'success',
            message : 'user login successfuly',
            data : emailVerify,token
        })


        
    }catch(error){
           res.status(500).json({
            status : 'fail',
            message : error.message
         
        })
    }
}