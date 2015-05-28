var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  slug: String,
  text: String,
  state: String,
  category: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

ArticleSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

ArticleSchema.pre('save', function (next) {
  if (!this.category) {
    this.category = 'uncategorized';
  }
  next();
});

ArticleSchema.pre('save', function (next) {
  if (!this.state) {
    this.state = 'draft';
  }
  next();
});

var Article = mongoose.model('Article', ArticleSchema);
Article.schema.path('title').required(true);
Article.schema.path('text').required(true);
