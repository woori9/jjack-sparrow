const mongoose = require('mongoose');
const { Schema } = mongoose;


// const chatSchema = new Schema({
//   sendBy: {
//     type: Schema.Types.ObjectId,
//     required: true
//   },
//   message: {
//     type: String,
//     required: true
//   }
// }, { timestamps: true });

const matchSchema = new Schema({
  petsitter: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'User'
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: Number,
    required: true
  },
  startAt: {
    type: Date,
    required: true
  },
  expireAt: {
    type: Date,
    required: true
  },
  pet: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  chat: [{
    type: Object
  }],
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
