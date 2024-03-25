const sql = require("../config/config.js");


const Users = function (users) {

  this.id = users.id;
  this.firstname = users.firstname;
  this.lastname = users.lastname;
  this.username = users.username;
  this.password = users.password;
  this.password1 = users.password1;
};


//start of ivault backend
//getters
Users.getUsers = (result) => {
  sql.query(
    "SELECT id, firstname, lastname, username, password, password1 FROM users",
    (err, res) => {
      if (err) {
        console.log("Error in executing getUsers query: ", err);
        result(err, null);
        return;
      }
      
      const userDetails = res.map((row) => ({
        id: row.id,
        firstname: row.firstname,
        lastname: row.lastname,
        username: row.username,
        password: row.password,
        password1: row.password1
      }));
      
      console.log(userDetails);
      result(null, userDetails);
    }
  );
};

//posters
Users.addUser = (newUsers, result) => {
  const status = "pending";
  sql.query(
    "INSERT INTO users SET ?",
    {
      firstname: newUsers.firstname,
      lastname: newUsers.lastname,
      username: newUsers.username,
      password: newUsers.password,
      password1: newUsers.password1
    },
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      result(null, { ...newUsers });
    }
  );
};
module.exports.Users = Users;

