var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  config = require('../../../config/config')[process.env.NODE_ENV || 'development'];

module.exports = function(app) {
  app.use('/api/articles', router);
};

router.route('/')
  .get(function(req, res) {
    //Paginate all articles
    var query = Article.find(),
      limit = req.query.limit ? parseInt(req.query.limit) : config.app.paginationLimit,
      page = req.query.page ? parseInt(req.query.page) : 1,
      sort = req.query.sort || 'createdAt',
      skip = page > 1 ? (page - 1) * limit : 0;
    query.sort(sort);
    query.limit(limit);
    query.skip(skip);
    query.exec(function(err, results) {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(results);
      }
    });
  }).post(function(req, res) {
      Article.create(req.params, function(err, article) {
        if (err) {
          res.sendStatus(400);
        } else {
          res.json(article);
        }
      });
  });

router.route('/:id')
  .get(function(req, res) {
    //Get article by id or slug
  })
  .put(function(req, res) {
    //Update an article by id
  })
  .delete(function(req, res) {
    //Destroy an article by id
  });

