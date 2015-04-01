var glob = require('glob'),
    factories = require('node-factories'),
    config = require('../config/config')[process.env.NODE_ENV];

factories.define('article', {
    body: 'Now is the time for all good men to come to the ' +
          'aid of their country.',
    title: 'Test Article',
    createdAt: function() {
      return new Date();
    },
    updatedAt: function() {
      return new Date();
    }
  })
  .sequence('slug', function (i) {
    return 'test-article-' + i;
  });

module.exports = factories;