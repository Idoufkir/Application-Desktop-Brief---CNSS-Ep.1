const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors())
require("dotenv").config();
require("./configs/configs");
app.use(express.json());


const agentRouter = require("./routes/agentRouter");
const employeeRouter = require("./routes/employeeRouter");

app.use("/api/agent", agentRouter);
app.use("/api/employee", employeeRouter);


const port = process.env.PORT || 3000
app.listen(port, console.log(`Server is running in PORT: ${port}`));
