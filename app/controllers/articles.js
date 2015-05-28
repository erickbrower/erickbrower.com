var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  handlers = require('../handlers'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/articles', router);
};

router.param('category', function (req, res, next, category) {
  req.category = category;
  next();
});

router.get('/categories/:category', function (req, res) {
  handlers.articles.getArticlesByCategory(req.category, req.query, function (err, articles) {
    res.render('index', {articles: articles, activeTab: req.category});
  });
});
