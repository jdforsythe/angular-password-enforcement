var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    KarmaServer = require('karma').Server;


gulp.task('jshint', function() {
  gulp.src('./src/angular-password-enforcement.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('dist', function() {
  // first copy the pretty version to ./dist
  gulp.src('./src/angular-password-enforcement.js')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/angular-password-enforcement.js')
    .pipe(uglify())
    .pipe(rename('angular-password-enforcement.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
