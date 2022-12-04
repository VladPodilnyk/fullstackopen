const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server started on port ${config.PORT}`);
});

process.on('SIGINT', () => {
  logger.info('closing server gracefully...');
  mongoose.connection.close();
});
