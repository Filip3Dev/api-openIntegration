const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')();
const helmet = require('koa-helmet')();
const logger = require('koa-logger')();

const errorHandler = require('./middleware/error.middleware');
const api = require('./api');
const cron = require('./utils/cron');
const { databaseConfig } = require('./config');
const mongoose = require('mongoose');
const server = new Koa();

mongoose.connect(databaseConfig.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Deal = require('./models/Deal');

/**
 * Pass to our server instance middlewares
 */
server
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser)
  .use(logger)

/**
 * Apply to our server the api router
 */
api.applyApiMiddleware(server);
cron.startCron();

module.exports = server;
