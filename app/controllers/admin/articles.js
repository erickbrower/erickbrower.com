var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/admin/articles', router);
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

router.route('/new')
  .get(function (req, res) {
    res.render('admin/articles/new');
  })
  .post(function (req, res) {
    Article.create(req.body, function (err, article) {
      if (err) {
        res.flash('error', 'Errors were generated while saving this article');
        res.render('admin/articles/new', {
          errors: err,
          article: req.body
        });
      } else {
        res.flash('success', 'Created a new article!');
        res.redirect('/admin/articles/' + article.slug + '/edit');
      }
    });
  });

router.route('/:slug/edit')
  .get(function (req, res) {
    res.render('admin/articles/edit', {
      article: req.article
    });
  })
  .put(function (req, res) {

  });
