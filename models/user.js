const mongoose = require('mongoose');
const { Schema } = mongoose;
//const Pet = require('./pet');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    default: null,
    unique: true,
    trim: true
  },
  address: {
    type: String,
    default: null
  },
  pet: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  match: [{
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }],
  review: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  calendar: [{
    type: Schema.Types.ObjectId,
    ref: 'Calendar'
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
