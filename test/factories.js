var factories = require('node-factories');

factories.define('article', {
  body: 'Now is the time for all good men to come to the ' +
  'aid of their country.',
  title: 'Test Article',
  state: 'draft'
})
  .sequence('slug', function (i) {
    return 'test-article-' + i;
  });

module.exports = factories;