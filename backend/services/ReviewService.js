const Review = require('../models/review');

const ReviewService = {
  createReview: async reviewData => {
    const newReview = await Review.create(reviewData);
    return newReview;
  },
};

module.exports = ReviewService;
