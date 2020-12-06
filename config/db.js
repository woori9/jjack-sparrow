const mongoose = require('mongoose');
const { MONGO_URI } = require('./index');

try {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  console.log('mongoDB connected');
} catch (err) {
  next(err);
}
