const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
