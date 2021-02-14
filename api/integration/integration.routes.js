'use strict';

const controller = require('./integration.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/integration`,
  });

  router
    .get('/', controller.listData);

  return router;
};
