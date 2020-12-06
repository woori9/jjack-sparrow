const express = require('express');
const router = express.Router();
const userController = require('../routes/controllers/userController');

router.get('/', function(req, res, next) {
  res.send('user router GET request');
});

router.post('/login', userController.login);

module.exports = router;
