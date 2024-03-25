const { Users} = require("../models/models.js");

// start swift aid backend
//getters
exports.getUsers = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getUsers((err, users) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(users);
  });
};

//posters
exports.addUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  

  const agent = new Users({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    password1: req.body.password1,

  });

  Users.addUser(agent, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating Users.",
      });
    }

    res.send(data);
  });
};



