var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass');

gulp.task('assets:bower', function () {
  gulp.src('./app/assets/bower_components');
});

gulp.task('assets:watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'run.js',
    ext: 'js handlebars'
  }).on('restart', function() {
    setTimeout(function() {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'assets:sass',
  'assets:js',
  'develop',
  'assets:watch'
]);
