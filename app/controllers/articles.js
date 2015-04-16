var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/posts', router);
};

router.param('slug', function (req, res, next, slug) {
  Article.find({slug: slug}, function (err, article) {
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

router.get('/:slug', function (req, res) {
  res.render('article', {
    article: req.article
  });
});
