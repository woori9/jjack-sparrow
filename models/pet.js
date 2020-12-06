const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
  sex: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    trim: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
