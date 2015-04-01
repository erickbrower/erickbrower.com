require('../../helper');

var request = require('supertest'),
  app = require('../../../app'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  _ = require('lodash'),
  async = require('async'),
  factories = require('../../factories'),
  assert = require('assert');

describe('/api/articles', function() {

  describe('GET', function() {

    beforeEach(function(done) {
      var callbacks = _.map(factories.article.build(10), function(article) {
        return function(next) {
          Article.create(article, function(err) {
            if(err) return next(err);
            next();
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
            assert.ok(response.body.length === 10);
            done();
        });
    });

    it('should paginate with page and per_page params');
  });

  describe('POST', function() {
    it('should create a new article');
  });
});

describe('/api/articles/:id', function() {
  describe('GET', function() {
    it('should return the article by id');
  });
});
