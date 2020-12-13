const express = require('express');
const router = express.Router();
const matchController = require('../routes/controllers/matchController');
const verifyToken = require('./middleware/verifyToken');

router.get('/', verifyToken, matchController.getAllPendingMatches);

module.exports = router;
