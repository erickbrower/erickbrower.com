var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function(app) {
  app.use('/api/articles', router);
};

router.route('/')
  .get(function(req, res) {
    //Paginate all articles
    var query = Article.find();
    if (req.params.sort) {
      query.sort(req.params.sort);
    }
    if (req.params.limit) {
      query.limit(req.params.limit);
    }
    query.exec(function(err, results) {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(results);
      }
    });
  }).post(function(req, res) {
    //Create an article
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

