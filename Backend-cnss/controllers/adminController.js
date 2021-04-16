const bcrypt = require('bcrypt')
const {Admin} = require('../models')
const jwt = require('jsonwebtoken')


const signin = (req, res, next) =>{
    const {email, password} = req.body;

    const admin = Admin.findOne({
        where: {
            email: req.body.email
        }
    })

    if(!admin){
       return res.json({
           error: 'Admin not found !!'
       })
    }

    if(bcrypt.compare(password, admin.password)){
        const token  = jwt.sign({email: admin.email}, process.env.JWT_TOKEN)

        res.json({
            token: token
        })
    }else{
        return res.json({
            error : 'Invalid credentials'
        })
    }
}


module.exports = { signin }