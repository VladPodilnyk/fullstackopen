const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const bloglistRouter = require('./controllers/bloglist');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongo = require('mongoose');

logger.info(`connecting to ${config.MONGO_URI}`);

mongo.connect(config.MONGO_URI)
  .then(() => logger.info('connected to a datebase.'))
  .catch((error) => logger.error('failed to connect to a database due to ', error));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.appLogger);

app.use('/api/blogs', bloglistRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;