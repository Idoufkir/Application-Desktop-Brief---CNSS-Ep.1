const express = require('express');
const employeeController = require('../controllers/employeeController');


const router = express.Router()

/**
 * @swagger
 * /employee/:
 *   post:
 *     summary: Add an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The emp name.
 *                 example: name
 *               email:
 *                 type: string
 *                 description: The emp email.
 *                 example: email
 *               password:
 *                 type: string
 *                 description: The emp password.
 *                 example: password
 *               cin:
 *                 type: string
 *                 description: The emp cin.
 *                 example: cin
 *               dateNaissance:
 *                 type: date
 *                 description: The emp dateNaissance.
 *                 example: dateNaissance
 *               phone:
 *                 type: string
 *                 description: The emp phone.
 *                 example: phone
 *     responses:
 *       201:
 *         description: A successful response
 */

router.post('/create', employeeController.createEmployee);


/**
 * @swagger
 * /agent/login:
 *   post:
 *     summary: login an agent.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The agent's email.
 *                 example: agent@gmail.com
 *               password:
 *                 type: string
 *                 description: The agent's password.
 *                 example: password
 *     responses:
 *       201:
 *         description: A successful response with a valid token
 */
router.post('/login', employeeController.signin)
router.get('/allEmployee', employeeController.allEmployee)
/**
 * @swagger
 * /api/employee/getEmployee/{id}:
 *   get:
 *     description: Retrieve an specific employee
 *
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: integer
 */
router.get('/getEmployee/:userId', employeeController.emloyeeById)


module.exports = router

