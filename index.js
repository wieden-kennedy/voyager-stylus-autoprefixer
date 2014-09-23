var csso = require('gulp-csso')
  , plumber = require('gulp-plumber')
  , stylus = require('gulp-stylus');

module.exports = function (voyager) {

  voyager.task('write', 'styles', function (done) {
    this.src('stylesheets/main.styl')
      .pipe(plumber())
      .pipe(stylus({ errors: true }))
      .pipe(this.out('stylesheets'))
      .on('end', done);
  });

  voyager.task('write', 'styles-vendor', function (done) {
    this.src('stylesheets/vendor/**')
      .pipe(this.out('stylesheets/vendor'))
      .on('end', done);
  });

  voyager.task('build', 'styles', function (done) {
    this.src(['stylesheets/**/*.css', '!stylesheets/vendor/**'])
      .pipe(csso())
      .pipe(this.out('stylesheets'))
      .on('end', done);
  });

  voyager.task('build', 'styles-vendor', function (done) {
    this.src('stylesheets/vendor/**')
      .pipe(this.out('stylesheets/vendor'))
      .on('end', done);
  });

  voyager.cancelWatch('stylesheets/**/*.css');
  voyager.watch(['stylesheets/**/*.styl', '!stylesheets/vendor/**'], 'styles');
};

