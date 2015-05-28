var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  handlers = require('../handlers'),
  Article = mongoose.model('Article');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function(req, res) {
  handlers.articles.getArticlesByPage(req, function (err, articles) {
    res.render('index', {articles: articles, activeTab: 'home'});
  });
});