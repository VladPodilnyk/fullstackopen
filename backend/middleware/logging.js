const morgan = require('morgan');

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

module.exports = appLogger;