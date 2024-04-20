const sql = require("../config/config.js");


const Users = function (users) {

  this.user_id = users.user_id;
  this.first_name = users.first_name;
  this.last_name = users.last_name;
  this.contact_number = users.contact_number;
  this.email = users.email;
  this.username = users.username;
  this.password = users.password;
  this.verification_code = users.verification_code;

};

const Category = function (category) {

  this.category_id = category.category_id;
  this.user_id = category.user_id;
  this.category_name = category.category_name;

};

const Website = function (website) {

  this.website_id = website.website_id;
  this.category_id = website.category_id;
  this.user_id = website.user_id;

  this.website_name = website.website_name;
  this.username = website.username;
  this.password = website.password;

};


//start of ivault backend

Users.getUserByID = (user_id, result) => {
  sql.query(
    "SELECT  * FROM users WHERE user_id= ? ",
    [user_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing user table query", error);
        result(error, null);
        return;
      }
      const userDetails = queryResult.map((row) => ({
        user_id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        contact_number: row.contact_number,
        email: row.email,
        username: row.username,
        password: row.password,
        verification_code: row.verification_code,
        verified: row.verified,
        profile_picture: row.profile_picture,

      }));


      result(null, userDetails);
    }
  );
};
//getters
Users.getUsers = (result) => {
  sql.query(
    "SELECT user_id, first_name, last_name, contact_number, email, username, password,verification_code FROM users",
    (err, res) => {
      if (err) {
        console.log("Error in executing getUsers query: ", err);
        result(err, null);
        return;
      }
      
      const userDetails = res.map((row) => ({
        user_id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        contact_number: row.contact_number,
        email: row.email,
        username: row.username,
        password: row.password,
        verification_code: row.verification_code,

      }));
      
      console.log(userDetails);
      result(null, userDetails);
    }
  );
};

//posters
Users.addUser = (newUsers, result) => {
  sql.query(
    "INSERT INTO users SET ?",
    {
      first_name: newUsers.first_name,
      last_name: newUsers.last_name,
      contact_number: newUsers.contact_number,
      email: newUsers.email,
      username: newUsers.username,
      password: newUsers.password,
      verification_code: newUsers.verification_code

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


Category.getCategory = (result) => {
  sql.query(
    "SELECT category_id, user_id, name FROM category",
    (err, res) => {
      if (err) {
        console.log("Error in executing getCategory query: ", err);
        result(err, null);
        return;
      }
      
      const userDetails = res.map((row) => ({
        category_id: row.category_id,
        user_id: row.user_id,
        name: row.name,


      }));
      
      console.log(userDetails);
      result(null, userDetails);
    }
  );
};

Category.addCategory = (newCategory, result) => {
  sql.query(
    "INSERT INTO category SET ?",
    {
      user_id: newCategory.user_id,
      category_name: newCategory.category_name,

    },
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      result(null, { ...newCategory });
    }
  );
};

Website.addWebsite = (newWebsite, result) => {
  sql.query(
    "INSERT INTO website SET ?",
    {
      user_id: newWebsite.user_id,
      category_id: newWebsite.category_id,
      website_name: newWebsite.website_name,
      username: newWebsite.username,
      password: newWebsite.password,
    },
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      result(null, { ...newWebsite });

    }
  );
};



Website.getWebsite = (result) => {
  sql.query(
    "SELECT * name FROM website",
    (err, res) => {
      if (err) {
        console.log("Error in executing getCategory query: ", err);
        result(err, null);
        return;
      }
      
      const userDetails = res.map((row) => ({
        website_id: row.website_id,
        category_id: row.category_id,
        user_id: row.user_id,
        website_name: row.website_name,
        username: row.username,
        password: row.password,

      }));
      
      console.log(userDetails);
      result(null, userDetails);
    }
  );
};


Users.updateValueById = (id, verified, result) => {
  sql.query(
    "UPDATE users SET verified = ? WHERE user_id = ?",
    [verified, id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing table query", error);
        result(error, null);
        return;
      }
      result(null, "Value updated successfully");
    }
  );
};



Category.getCategoryByUserID = (user_id, result) => {
  sql.query(
    "SELECT  * FROM category WHERE user_id= ? ",
    [user_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing user table query", error);
        result(error, null);
        return;
      }
      const userDetails = queryResult.map((row) => ({
        category_id: row.category_id,
        user_id: row.user_id,
        category_name: row.category_name,

      }));


      result(null, userDetails);
    }
  );
};

Website.getWebsiteByID = (user_id, result) => {
  sql.query(
    "SELECT  * FROM website WHERE user_id= ? ",
    [user_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing user table query", error);
        result(error, null);
        return;
      }
      const userDetails = queryResult.map((row) => ({
        website_id: row.website_id,
        category_id: row.category_id,
        user_id: row.user_id,
        website_name: row.website_name,
        username: row.username,
        password: row.password,
      }));


      result(null, userDetails);
    }
  );
};

module.exports.Users = Users;
module.exports.Category = Category;
module.exports.Website = Website;
