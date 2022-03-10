const mongoose = require('mongoose');
const { Schema } = mongoose;

const calendarSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dateAndTime: {
    type: Date,
    required: true
  },
  repeat: {
    type: String,
    default: 'NO REPEAT'
  },
  alarm: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Calendar', calendarSchema);
