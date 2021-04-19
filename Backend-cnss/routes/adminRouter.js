const express = require('express')
const adminController = require('../controllers/adminController')




const router = express.Router()



/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: login an admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The admin email.
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 description: The admin's password.
 *                 example: password
 *     responses:
 *       201:
 *         description: A successful response with a valid token
 */

router.post('/login', adminController.signin);

module.exports = router