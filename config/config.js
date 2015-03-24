var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'thing'
    },
    port: 3000,
    db: 'mongodb://localhost/thing-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'thing'
    },
    port: 3000,
    db: 'mongodb://localhost/thing-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'thing'
    },
    port: 3000,
    db: 'mongodb://localhost/thing-production'
  }
};

module.exports = config[env];
