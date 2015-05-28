var mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  config = require('../../config/config');

function getArticlesByPage(opts, done) {
  var query = Article.find(opts.where),
    limit = opts.limit ? parseInt(opts.limit) : config.app.paginationLimit,
    page = opts.page ? parseInt(opts.page) : 1,
    sort = opts.sort || {createdAt: -1},
    skip = page > 1 ? (page - 1) * limit : 0;
  query.sort(sort);
  query.limit(limit);
  query.skip(skip);
  query.exec(function (err, articles) {
    if (err) {
      done(err);
    } else {
      done(null, articles);
    }
  });
}

function getArticlesByCategory(category, opts, done) {
  opts.where = opts.where || {};
  opts.where.category = category;
  getArticlesByPage(opts, done);
}
module.exports = {
  getArticlesByPage: getArticlesByPage,
  getArticlesByCategory: getArticlesByCategory
};