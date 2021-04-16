const express = require('express')
const nodemailer = require('nodemailer')
const db = require('./models')

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const adminRouter = require('./routes/adminRouter')
const employeeRouter = require('./routes/employeeRouter')

app.use('/api/admin', adminRouter)
app.use('/api/employee', employeeRouter)


const port = process.env.PORT || 3000

db.sequelize.sync().then(res => {
    app.listen(port, () => {
        console.log(`Server is running in PORT: ${port}`);
    })
})