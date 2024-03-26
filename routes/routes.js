module.exports = (app) => {
  const router = require('express').Router();
  const multer = require('multer');
  const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });

  const controller = require('../controllers/controllers.js');

  // GETTERS
  router.get("/getUsers", controller.getUsers);

  // POSTERS
  router.post('/addUser', upload.single(''), controller.addUser);
  
  // Add route to handle adding accounts
  router.post('/addAccount', controller.addAccount);

  app.use('/', router);
};
  