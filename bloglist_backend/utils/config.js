require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.NODE_ENV === 'test' ? process.env.MONGO_DB_URI_TEST : process.env.MONGO_DB_URI;
const ENV = process.env.NODE_ENV;

module.exports = {
  PORT,
  MONGO_URI,
  ENV
};