var autoprefixer = require('gulp-autoprefixer')
  , csso = require('gulp-csso')
  , plumber = require('gulp-plumber')
  , stylus = require('gulp-stylus');

module.exports = function (voyager) {

  var AUTOPREFIXER_BROWSERS = [
    'ie >= 9'
  , 'ie_mob >= 9'
  , 'ff >= 30'
  , 'chrome >= 34'
  , 'safari >= 7'
  , 'opera >= 23'
  , 'ios >= 7'
  , 'android >= 4.1'
  , 'bb >= 10'
  ];

  voyager.task('write', 'styles', function (done) {
    this.src('stylesheets/main.styl')
      .pipe(plumber())
      .pipe(stylus({ errors: true }))
      .pipe(autoprefixer(AUTOPREFIXER_BROWSERS, { cascade: true }))
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

