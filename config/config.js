var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var appName = 'thing';

var config = {
  development: {
    root: rootPath,
    app: {
      name: appName
    },
    port: 3000,
    db: 'mongodb://localhost/' + appName +'-development'
  },

  test: {
    root: rootPath,
    app: {
      name: appName
    },
    port: 3000,
    db: 'mongodb://localhost/' + appName +'-test'
  },

  production: {
    root: rootPath,
    app: {
      name: appName
    },
    port: 3000,
    db: 'mongodb://localhost/' + appName +'-production'
  }
};

module.exports = config[env];
