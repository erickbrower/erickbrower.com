var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/admin/articles', router);
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

router.route('/new')
  .get(function (req, res) {
    res.render('admin/articles/new');
  })
  .post(function (req, res) {
    Article.create(req.body, function (err, article) {
      if (err) {
        res.flash('error', 'Errors were generated while saving this article');
        res.render('admin/articles/new', {
          errors: err.errors,
          article: req.body
        });
      } else {
        res.flash('success', 'Created a new article!');
        res.redirect('/admin/articles/' + article._id + '/edit');
      }
    });
  });

router.route('/:article_id/edit')
  .get(function (req, res) {
    res.render('admin/articles/edit', {
      article: req.article
    });
  })
  .put(function (req, res) {

  });
