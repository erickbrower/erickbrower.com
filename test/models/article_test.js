require('../helper');

var factories = require('../factories'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  assert = require('assert');

describe('Article', function () {
  var article;

  beforeEach(function () {
    article = factories.article.build();
  });

  describe('validation', function () {
    it('should require title', function (done) {
      article.title = '';
      Article.create(article, function (err) {
        assert(err && err.errors, 'No model validation errors were returned.');
        assert.equal(err.errors.title.message, 'Path \`title\` is required.');
        done();
      });
    });

    it('should require text', function (done) {
      article.text = '';
      Article.create(article, function (err) {
        assert(err && err.errors, 'No model validation errors were returned');
        assert.equal(err.errors.text.message, 'Path \`text\` is required.');
        done();
      });
    });
  });

  describe('save', function () {
    it('should ensure that a slug is created', function (done) {
      Article.create(article, function (err, art) {
        if (err) return done(err);
        assert(art.slug && art.slug.length > 0);
        done();
      });
    });
  });
});