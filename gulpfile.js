var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var maps = require('gulp-sourcemaps');
var gulpSequence = require('gulp-sequence');
var gzip = require('gulp-gzip');
var del = require('del');
var wait = require('gulp-wait');

//delete previous fileSize
gulp.task("clean", function() {
	del(['dist']);
});

//move index.html to dist
gulp.task('moveIndex', function() {
	return gulp.src(['./src/index.html'])
	.pipe(wait(100))
    .pipe(gulp.dest('./dist/'));	
});


//concat the CSS stylesheets
gulp.task('compressCSS', function() {
	return gulp.src(['./src/css/*.css'])
	.pipe(maps.init())
    .pipe(cleanCSS({
      level: {
        1: {},
        2: {}
      }
    }))
    .pipe(concat('styles.min.css'))
	.pipe(maps.write('./'))
    .pipe(gulp.dest('./dist/css'));	
});

//compress JS
gulp.task('compress-js', function (cb) {
  pump([
        gulp.src(['./src/js/*.js']),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('./dist/js')
    ],
    cb
  );
});


gulp.task('default', gulpSequence('clean', 'moveIndex', 'compressCSS'));