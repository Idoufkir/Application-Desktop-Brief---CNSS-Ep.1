const Agent = require("../models/agent");

exports.create = function (req, res) {
  const new_agent = new Agent(req.body);
  Agent.create(new_agent, function (err, agent) {
    if (err) res.send(err);
    res.json({
      message: "Agent added successfully!",
      data: agent,
    });
  });
};

exports.login = function (req, res) {
  Agent.login(req.body.email, req.body.password, (err, agent) => {
    if (err) res.send(err);
    res.json(agent);
  });
};
