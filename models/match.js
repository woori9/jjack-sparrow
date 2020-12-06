const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
  sendBy: {
    type: Schema.Types.ObjectId,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const matchSchema = new Schema({
  petsitter: {
    type: Schema.Types.ObjectId,
    default: null
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  dateAndTime: [{
    type: Date,
    required: true
  }],
  pet: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  chat: [chatSchema],
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
