const morgan = require('morgan');
const logger = require('./logger');

const errorHandler = (error, _, response, next) => {
  logger.info(error.message);

  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' });
  }  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    });
  }

  next(error);
};

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// app logging
morgan.token('body', (request) => JSON.stringify(request.body));

const appLogger = (request, response, next) => {
  if (request.method === 'POST') {
    const log = morgan(':method :url :status :res[content-length] - :response-time ms :body');
    log(request, response, next);
  } else {
    const compactLogger = morgan('tiny');
    compactLogger(request, response, next);
  }
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  appLogger
};