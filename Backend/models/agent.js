require("dotenv").config();
var dbConn = require("../configs/configs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


var Agent = function (agent) {
  this.email = agent.email;
  this.password = agent.password;
};

Agent.create = async function (newEmp, result) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newEmp.password, salt);
  dbConn.query(
    `INSERT INTO agents(email,password) VALUES ("${newEmp.email}","${hashedPassword}")`,

    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Agent.login = function (email, password, result) {
  dbConn.query(
    `Select * from agents where email = "${email}" `,
    async function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        const validPass = await bcrypt.compare(password, res[0].password);
        if (validPass) {
          const token = jwt.sign(
            { id: res[0].id, email: res[0].email },
            "secretAgent"
          );
          result(token);
        } else {
          result("email or password Incorrect");
        }
      }
    }
  );
};

module.exports = Agent;
