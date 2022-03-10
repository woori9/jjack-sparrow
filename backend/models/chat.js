const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
  sendBy: {
    type: Schema.Types.ObjectId,
    required: true,
    // ref: 'User'
  },
  message: {
    type: String,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
