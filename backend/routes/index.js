const express = require('express');
const router = express.Router();
const verifyToken = require('./middleware/verifyToken');
const Review = require('../models/review');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/reviews', verifyToken, async (req, res, next) => {
  try {
    const reviews = await Review.find({}).populate('author').exec();

    return res.status(200).json({
      reviews
    });

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
