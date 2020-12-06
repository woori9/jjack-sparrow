require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const SERVICE_URL = process.env.SERVICE_URL;
const MONGO_URI = process.env.MONGO_URI;

module.exports = {
  JWT_SECRET_KEY,
  MONGO_URI,
  SERVICE_URL
};
