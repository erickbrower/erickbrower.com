require('../../helper');

var request = require('supertest'),
  app = require('../../../app'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  _ = require('lodash'),
  async = require('async'),
  assert = require('assert');

var testArticles = [{
  title: 'Test Post 1',
  slug: 'test-post-1',
  text: 'This is a test post!'
}, {
  title: 'Test Post 2',
  slug: 'test-post-2',
  text: 'This is another test post'
}, {
  title: 'Test Post 3',
  slug: 'test-post-3',
  text: 'This is yet another test post'
}];

describe('app', function() {

  describe('GET /api/articles', function() {

    beforeEach(function(done) {
      var callbacks = _.map(testArticles, function(article) {
        return function(next) {
          Article.create(article, function(err, newArticle) {
            if (err) throw err;
            next(null, newArticle);
          });
        };
      });
      async.parallel(callbacks, function(err, results) {
        if (err) throw err;
        done();
      });
    });

    it('should return articles', function(done) {
      request(app)
        .get('/api/articles')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, response) {
            if (err) return done(err);
            assert.ok(response.body.length === 3);
            done();
        });
    });

  });
});
