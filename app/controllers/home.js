var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function(req, res) {
  res.render('index', {
    posts: [
      {
        title: 'Test Post',
        slug: 'test-post',
        text: "Now that we know who you are, I know who I am. I'm " +
        "not a mistake! It all makes sense! In a comic, you know how " +
        "you can tell who the arch-villain's going to be? He's the " +
        "exact opposite of the hero. And most times they're friends, " +
        "like you and me! I should've known way back when... You know " +
        "why, David? Because of the kids. They called me Mr Glass.",
        state: 'published',
        createdAt: 'February 21st, 2015',
        updatedAt: 'February 21st, 2015'
      },
      {
        title: 'Another Test Post',
        slug: 'another-test-post',
        text: "Now that we know who you are, I know who I am. I'm " +
        "not a mistake! It all makes sense! In a comic, you know how " +
        "you can tell who the arch-villain's going to be? He's the " +
        "exact opposite of the hero. And most times they're friends, " +
        "like you and me! I should've known way back when... You know " +
        "why, David? Because of the kids. They called me Mr Glass.",
        state: 'published',
        createdAt: 'January 1st, 2015',
        updatedAt: 'January 1st, 2015'
      }
    ]
  });
});