const sql = require("../config/config.js");


const Users = function (users) {

  this.id = users.id;
  this.firstname = users.firstname;
  this.lastname = users.lastname;
  this.contactnumber = users.contactnumber;
  this.username = users.username;
  this.username1 = users.username1;
  this.password = users.password;
  this.password1 = users.password1;
};


//start of ivault backend
//getters
Users.getUsers = (result) => {
  sql.query(
    "SELECT id, firstname, lastname, contactnumber, username1, username, password, password1 FROM users",
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
        contactnumber: row.contactnumber,
        username: row.username,
        username1: row.username1,
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
      contactnumber: newUsers.contactnumber,
      username: newUsers.username,
      username1: newUsers.username1,
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
