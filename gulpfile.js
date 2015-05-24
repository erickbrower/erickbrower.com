var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass');

var paths = {
  js: ['app/assets/js/**/*.js']
};

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    ext: 'js handlebars'
  }).on('restart', function() {
    setTimeout(function() {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'develop'
]);
