module.exports = (app) => {
  const router = require('express').Router();
  const multer = require('multer');
  const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });

  const controller = require('../controllers/controllers.js');

  // GETTERS 
  router.get("/getUsers", controller.getUsers);
  router.get("/getCategory", controller.getCategory);
  router.get("/getWebsite", controller.getWebsite);
  router.get("/getUserByID/:id", controller.getUserByID);
  router.get("/getCategoryByUserID/:id", controller.getCategoryByUserID);
  router.get("/getWebsiteByID/:id", controller.getWebsiteByID);

  
  // POSTERS
  router.post('/addUser', upload.single(''), controller.addUser);
  router.post('/addCategory', upload.single(''), controller.addCategory);
  router.post('/addWebsite', upload.single(''), controller.addWebsite);
  router.post('/sendMail', upload.fields([]), controller.sendMail);

  router.put('/updateValueById/:id', controller.updateValueById);


  app.use('/', router);
};
  