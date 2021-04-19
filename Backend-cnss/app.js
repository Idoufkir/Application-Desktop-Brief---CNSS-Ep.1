const express = require('express')
const nodemailer = require('nodemailer')
const db = require('./models')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "CNSS API",
        description: "CNSS API Information",
        contact: {
          name: "YouCode Developer",
        },
        server: ["http://localhost:3000"],
      },
    },
    apis: ["./routes/*.js"],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

