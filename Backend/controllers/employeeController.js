const Employee = require("../models/employee");
const { sendMail } = require("./sendMail");

exports.create = function (req, res) {
  const new_employee = new Employee(req.body);

  Employee.create(new_employee, function (err, employee) {
    if (err) {
      res.send(err);
    } else {
      sendMail(new_employee.email, new_employee.password);
      res.json({
        data: new_employee,
      });
    }
  });
};

exports.login = function (req, res) {
  Employee.login(req.body.email, req.body.password, (err, employee) => {
    if (err) res.send(err);
    res.json(employee);
  });
};
