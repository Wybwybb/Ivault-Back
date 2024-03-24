const sql = require("../config/config.js");


const Users = function (users) {

  this.id = users.id;
  this.username = users.username;
  this.password = users.password;

};


//start of ivault backend
//getters
Users.getUsers = (result) => {
  sql.query(
    "SELECT id,  username, password FROM users",
    (err, res) => {
      if (err) {
        console.log("Error in executing property_nearest_table query: ", err);
        result(err, null);
        return;
      }
      const userDetails = res.map((row) => ({
        id: row.id,
        username: row.username,
        password: row.password,
      }));
      console.log(...userDetails);
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
      username: newUsers.username,
      password: newUsers.password
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

