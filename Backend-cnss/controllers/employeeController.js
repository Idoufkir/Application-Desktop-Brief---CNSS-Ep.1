const bcrypt = require('bcrypt')
const {Employee} = require("../models")
const jwt = require('jsonwebtoken')


const {sendMail} = require('../services/sendMail')

const createEmployee = async (req, res) => {

   try{
    let salt = await bcrypt.genSalt(10)
    let hash_password = await bcrypt.hash(req.body.password, salt)


    const newEmployee = new Employee({
        name: req.body.name,
        email: req.body.email,
        cin: req.body.cin,
        password: hash_password,
        dateNaissance : req.body.dateNaissance,
        phone: req.body.phone
    })

    const saveEmployee = await newEmployee.save();

    res.json({
        message: 'Employee is Created !!',
        saveEmployee
    })

    let subject = "Account Vérification";
    let text = "CNSS Maroc"
    let output = `
    <h2>This is  Your Registration Number  and Password , Keep it Safe !!!</h2>
    <p> Registration Number : ${req.body.password}</p>
    <p> Password : ${req.body.phone}</p>`

    sendMail(req.body.email, subject, text, output)
   }catch(err){
       console.log(err);
   }
}

const signin = (req, res) => {
    let {email, password} = req.body;

    if(!email || !password){
        return res.status(500).json({
            error: "Bad request !"
        })
    }

    let employee = Employee.findOne({
        where: {
            email : req.body.email
        }
    })

    if(!employee){
        return res.status(404).json({
            error: "Employee not found !"
        })
    }

    if(bcrypt.compare(password, employee.password)){
        let token = jwt.sign({email: employee.email}, process.env.JWT_TOKEN)

        res.json({
            token: token,
            id: employee.id
        })
    }else{
        return res.json(404).json({
            error: 'Invalid credentials'
        })
    }
}


const allEmployee = (req, res) => {
    let employee = Employee.findAll()

    if(!employee){
        return res.status(404).json({
            error: 'Employee not found !!'
        })
    }
    res.json({
        employee
    })
}

const emloyeeById = (req, res) =>{
    let employee = Employee.findOne({where: {id:req.param.id}})

    if(!employee){
        return res.status(404).json({
            error: 'Id Employee not found !'
        })
    }

    res.json({
        employee
    })
}


module.exports = {createEmployee, signin, allEmployee, emloyeeById}