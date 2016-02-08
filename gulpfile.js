
var gulp = require('gulp');

// https://www.npmjs.com/package/gulp-include
var include = require('gulp-include');

gulp.task('scripts', function() {
  gulp.src([
      './dev/js/main-head.js',
      './dev/js/main-body.js'
    ])
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copy-html', function() {
  gulp.src('./dev/**.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['scripts', 'copy-html']);