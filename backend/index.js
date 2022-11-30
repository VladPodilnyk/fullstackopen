const { app, gracefullShutdown } = require('./app');
const http = require('http');
const config = require('./utils/configs');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server started on port ${config.PORT}`);
});

process.on('SIGINT', gracefullShutdown);
