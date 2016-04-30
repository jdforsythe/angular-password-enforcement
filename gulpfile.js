var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    jscsStylish = require('gulp-jscs-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rm = require('gulp-rimraf'),
    KarmaServer = require('karma').Server;


gulp.task('lint', function() {
  gulp.src('./src/angular-password-enforcement.js')
    .pipe(jshint())
    .pipe(jscs({fix: false}))
    .pipe(jscsStylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'), {verbose: true});
});

gulp.task('test', ['lint'], function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('clean', function() {
  return gulp.src('dist/*').pipe(rm());
});

gulp.task('dist', ['clean', 'test'], function() {
  // first copy the pretty version to ./dist
  gulp.src('./src/angular-password-enforcement.js')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/angular-password-enforcement.js')
    .pipe(uglify())
    .pipe(rename('angular-password-enforcement.min.js'))
    .pipe(gulp.dest('./dist'));
});
