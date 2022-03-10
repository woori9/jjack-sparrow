require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const SERVICE_URL = process.env.SERVICE_URL;
const MONGO_URI = process.env.MONGO_URI;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

module.exports = {
  JWT_SECRET_KEY,
  MONGO_URI,
  SERVICE_URL,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY
};
