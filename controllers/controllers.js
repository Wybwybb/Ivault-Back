const { Users } = require("../models/models.js");

exports.getUsers = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  Users.getUsers((err, users) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred",
      });
    }
    res.send(users);
  });
};


exports.addUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }

  exports.authenticateUser = (req, res) => {
    // Assuming you have verified the user's credentials and authenticated them successfully
    const { username } = req.body;
  
    // Call the function to retrieve the first name of the authenticated user
    Users.getFirstNameByUsername(username, (err, firstName) => {
      if (err) {
        return res.status(500).send({
          message: err.message || "Error occurred while retrieving user's first name",
        });
      }
  
      // Send the first name back to the frontend
      res.send({ firstName });
    });
  };
  
  const {
    firstname,
    lastname,
    contactnumber,
    username,
    username1,
    password,
    password1,
  } = req.body;

  const newUser = new Users({
    firstname,
    lastname,
    contactnumber,
    username,
    username1,
    password,
    password1,
  });

  Users.addUser(newUser, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating user.",
      });
    }
    res.send(data);
  });
};

exports.addAccount = (req, res) => {
  const { website, username, password } = req.body;

  if (!website || !username || !password) {
    return res.status(400).send({
      message: "Website, username, and password are required fields.",
    });
  }

  const newAccount = new Users({
    website,
    username,
    password,
  });

  Users.addUser(newAccount, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while adding the account.",
      });
    }
    res.send(data);
  });
};
