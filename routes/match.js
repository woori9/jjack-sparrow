const express = require('express');
const router = express.Router();
const matchController = require('../routes/controllers/matchController');
const verifyToken = require('./middleware/verifyToken');

router.get('/', verifyToken, matchController.getAllPendingMatches);

router.patch('/:matchId', verifyToken, matchController.updateSuccessMatch);//매치 상태 업데이트 2 -> 3

router.get('/:matchId/chat', verifyToken, matchController.getChatInfo);

module.exports = router;
