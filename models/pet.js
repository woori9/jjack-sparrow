const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
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
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  picture: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
