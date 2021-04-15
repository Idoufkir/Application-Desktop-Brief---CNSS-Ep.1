var dbConn = require("../configs/configs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var Employee = function (employee) {
  this.name = employee.name;
  this.email = employee.email;
  this.phone = employee.phone;
  this.mat = employee.mat;
  this.password = employee.password;
};
Employee.create = async function (newEmp, result) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newEmp.password, salt);
  dbConn.query(
    `INSERT INTO employees (name,email,phone,mat,password) values ("${newEmp.name}","${newEmp.email}","${newEmp.phone}","${newEmp.mat}","${hashedPassword}") `,
    newEmp,
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

Employee.login = function (email, password, result) {
  dbConn.query(
    `Select * from employees where email = "${email}" `,
    async function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        const validPass = await bcrypt.compare(password, res[0].password);
        if (validPass) {
          const token = jwt.sign(
            { id: res[0].id, email: res[0].email },
            "secret"
          );
          result(token);
        } else {
          result("email or password Incorrecr");
        }
      }
    }
  );
};

module.exports = Employee;
