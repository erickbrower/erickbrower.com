var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  handlers = require('../../handlers');

module.exports = function (app) {
  app.use('/api/articles', router);
};

router.param('article_id', function (req, res, next, articleId) {
  Article.findById(articleId, function (err, article) {
    if (err) {
      next(err);
    } else if (!article) {
      next(new Error('failed to find article'));
    } else {
      req.article = article;
      next();
    }
  });
});

router.route('/')
  .get(function (req, res) {
    handlers.articles.getArticlesByPage(req.query, function (err, articles) {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(articles);
      }
    });
  }).post(function (req, res) {
    Article.create(req.body, function (err, article) {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(article.toJSON());
      }
    });
  });

router.route('/:article_id')
  .get(function (req, res) {
    res.send(req.article);
  })
  .put(function (req, res) {
    Article.findOneAndUpdate({_id: req.article.id}, req.body, function (err, article) {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(article.toJSON());
      }
    });
  })
  .delete(function (req, res) {
    Article.remove({_id: req.article.id}, function (err) {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(req.article);
      }
    });
  });
