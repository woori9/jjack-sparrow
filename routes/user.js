const express = require('express');
const router = express.Router();
const userController = require('../routes/controllers/userController');
const verifyToken = require('./middleware/verifyToken');

router.get('/', function(req, res, next) {
  res.send('user router GET request');
});

router.post('/login', userController.login);

router.post('/:userId/address', verifyToken, userController.registerAddress);

router.post('/:userId/pet', verifyToken, userController.registerPet);

module.exports = router;
