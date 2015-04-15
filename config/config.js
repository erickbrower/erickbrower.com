var path = require('path'),
  env = process.env,
  rootPath = path.normalize(__dirname + '/..');

if (env.NODE_ENV !== 'production') {
  require('node-env-file')(path.join(rootPath, '.env'));
}

var config = {
  root: rootPath,
  app: {
    name: 'thing',
    paginationLimit: env.NODE_APP_PAGINATION_LIMIT || 25
  },
  port: env.NODE_APP_PORT || 8080,
  db: env.NODE_DB_URL + '/thing_' + (env.NODE_ENV || 'development')
};

module.exports = config;