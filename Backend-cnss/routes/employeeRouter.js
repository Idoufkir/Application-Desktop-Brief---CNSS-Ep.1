const express = require('express');
const employeeController = require('../controllers/employeeController');


const router = express.Router()

router.post('/create', employeeController.createEmployee);
router.post('/login', employeeController.signin)
router.get('/allEmployee', employeeController.allEmployee)
router.get('getEmployee/:id', employeeController.emloyeeById)


module.exports = router

