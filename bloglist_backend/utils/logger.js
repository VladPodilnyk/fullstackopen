const config = require('./config');

const info = (...params) => {
  if (config.ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  if (config.ENV !== 'test') {
    console.log(...params);
  }
};

module.exports = {
  info,
  error
};