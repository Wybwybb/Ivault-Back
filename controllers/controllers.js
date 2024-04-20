const { Users, Category,Website } = require("../models/models.js");
const { sendEmail } = require('../emailHelper/emailHelper'); // Adjust the path accordingly

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
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  
  



  const details = new Users({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    verification_code: req.body.verification_code
  
  });

  Users.addUser(details, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(201).send(result); 
  });
};

exports.getCategory = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  Category.getCategory((err, users) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred",
      });
    }
    res.send(users);
  });
};

exports.addCategory = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }

  const details = new Category({
    user_id: req.body.user_id,
    category_name: req.body.category_name,

  
  });

  Category.addCategory(details, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(201).send(result); 
  });
};

exports.addWebsite = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  
  


  const details = new Website({
    category_id: req.body.category_id,
    user_id: req.body.user_id,
    website_name: req.body.website_name,
    username: req.body.username,
    password: req.body.password,

  
  });

  Website.addWebsite(details, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(201).send(result); 
  });
};


exports.getWebsite = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  Website.getWebsite((err, users) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred",
      });
    }
    res.send(users);
  });
};



exports.sendMail = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  
  const newUserEmail = req.body.email;
  const welcomeSubject = req.body.subject;
  const welcomeMessage = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our App</title>
      <style>
          /* Reset styles */
          body, h1, p {
              margin: 0;
              padding: 0;
          }
  
          /* Container styles */
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              background: #f5f5f5; /* Light gray */
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              color: #333;
              position: relative;
              overflow: hidden;
          }
  
          /* Header styles */
          .header {
              text-align: center;
          }
  
          /* Logo styles */
          .logo {
              width: 150px;
              height: auto;
              margin-bottom: 20px;
          }
  
          /* Content styles */
          .content {
              background-color: #fff; /* White */
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              color: #333;
          }
  
          /* Title styles */
          .title {
              font-size: 32px;
              margin-bottom: 20px;
              text-align: center;
              color: #007bff; /* Blue */
          }
  
          /* Message styles */
          .message {
              font-size: 18px;
              line-height: 1.6;
              color: #555;
              margin-bottom: 20px;
          }
  
          /* Button styles */
          .button {
              display: inline-block;
              background-color: #007bff; /* Blue */
              color: #fff;
              text-decoration: none;
              padding: 15px 30px;
              border-radius: 10px;
              transition: background-color 0.3s ease;
              font-size: 20px;
          }
  
          .button:hover {
              background-color: #0056b3; /* Darker blue */
          }
  
          /* Decorative styles */
          .decor {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: url('https://i.ibb.co/N9h5kXt/stars.png');
              background-size: cover;
              background-position: center;
              z-index: -1;
              pointer-events: none;
              animation: twinkle 10s linear infinite;
          }
  
          @keyframes twinkle {
              0% { opacity: 1; }
              50% { opacity: 0.8; }
              100% { opacity: 1; }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="decor"></div>
          <div class="header">
              <img src="https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/l7bbocqfp6jket0hlpxh" alt="Logo" class="logo">
          </div>
          <div class="content">
              <p class="title">Welcome to Our App</p>
              Hi, ${req.body.first_name},  Your Verification code is: <b> ${req.body.verification_code}</b>
          </div>
      </div>
  </body>
  </html>
  
  
  
  
  `;

  sendEmail(newUserEmail, welcomeSubject, welcomeMessage);

  res.status(201).send(); 
};


exports.getUserByID = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getUserByID(req.params.id, (err, blog) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(blog);
  });
};

exports.getCategoryByUserID = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Category.getCategoryByUserID(req.params.id, (err, blog) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(blog);
  });
};

exports.updateValueById = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Invalid request. Please provide user ID.",
    });
    return;
  }
  
  const user_id = req.params.id;
  const verified = 1;

  Users.updateValueById(user_id, verified, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(200).send(result); 
  });
};


exports.getWebsiteByID = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Website.getWebsiteByID(req.params.id, (err, blog) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(blog);
  });
};