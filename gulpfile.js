//required
const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  ngGraph = require('gulp-angular-architecture-graph');
//end required

//tasks
gulp.task('scripts', () => {
  console.log('scripts ran');
  gulp.src('public/scripts/dev/**/*.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts/product'));
});

gulp.task('styles', () => {
  console.log('styles ran');
  gulp.src('public/styles/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: '*'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('angular-map', () => {
  gulp.src('public/scripts/dev/*.js')
    .pipe(ngGraph({
      dest: 'architecture',
      hideAngularServices: false
    }));
});
//end tasks

//watch
gulp.task('watch:styles', () => {
  gulp.watch('public/styles/sass/*.sass', ['styles']);
});

gulp.task('watch:scripts', () => {
  gulp.watch('public/scripts/dev/*', ['scripts']);
});

//default task
gulp.task('default', ['scripts', 'styles']);
