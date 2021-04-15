const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

router.post("/", agentController.create);
router.post("/login", agentController.login);

module.exports = router;
