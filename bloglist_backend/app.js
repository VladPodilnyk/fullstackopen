const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const cors = require('cors');
const mongo = require('mongoose');
const bloglistRouter = require('./controllers/bloglist');
const middleware = require('./utils/middleware');

const app = express();

logger.info(`connecting to ${config.MONGO_URI}`);
mongo.connect(config.MONGO_URI)
  .then(() => logger.info('connected to a datebase.'))
  .catch(error => logger.error('failed to connect to a database due to ', error));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.appLogger);

app.use('/api/blogs', bloglistRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;