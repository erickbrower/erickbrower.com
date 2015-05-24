var factories = require('node-factories'),
  Article = require('../app/models/article');

factories.define('article', {
  text: 'Now is the time for all good men to come to the ' +
  'aid of their country.',
  createdAt: function () {
    return new Date();
  }
})
  .sequence('title', function (i) {
    return 'Test Article ' + i;
  });

module.exports = factories;