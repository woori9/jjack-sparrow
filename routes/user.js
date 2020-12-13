const express = require('express');
const router = express.Router();
const userController = require('../routes/controllers/userController');
const { uploadPhoto } = require('./middleware/uploadPhoto');
const verifyToken = require('./middleware/verifyToken');

router.get('/', function(req, res, next) {
  res.send('user router GET request');
});

router.post('/login', userController.login);

router.post('/:userId/address', verifyToken, userController.registerAddress);

router.post('/:userId/pet', verifyToken, userController.registerPet);

router.post('/:userId/photo', verifyToken, uploadPhoto.array('image', 1), userController.savePhoto);

router.post('/:userId/match', verifyToken, userController.createMatch);

router.patch('/:userId/match/:matchId', verifyToken, userController.updateBothUserAndMatch);//매치 상태 업데이트 + petSitter의 match에 해당 매치 push

module.exports = router;
