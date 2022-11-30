const config = require('./utils/configs');
const logger = require('./utils/logger');
const express = require('express');
const cors = require('cors');
const mongo = require('mongoose');
const phonebookRouter = require('./controllers/phonebook');
const middleware = require('./utils/middleware');

const app = express();

logger.info(`connecting to ${config.MONGO_URI}`);
mongo.connect(config.MONGO_URI)
  .then(() => logger.info('connected to a datebase.'))
  .catch(error => logger.error('failed to connect to a database due to ', error));

const gracefullShutdown = () => {
  logger.info('closing server gracefully...');
  mongo.connection.close();
};

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.appLogger);

app.use('/api/persons/', phonebookRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = {
  app,
  gracefullShutdown
};