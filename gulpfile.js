var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  watchify = require('watchify'),
  reactify = require('reactify');


gulp.task('assets:js', function() {
  var bundler = browserify({
    entries: ['./app/assets/js/main.js'],
    transform: [reactify],
    debug: true, // Gives us sourcemapping
    cache: {},
    packageCache: {},
    fullPaths: true // Requirement of watchify
  });
  var watcher = watchify(bundler);

  return watcher
    .on('update', function() { // When any files update
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('app/assets/js/main.js'))
        // This is where you add uglifying etc.
        .pipe(gulp.dest('./public/js/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('assets:sass', function() {
  gulp.src('./public/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('assets:watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js handlebars',
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
