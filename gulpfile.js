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
var image = require('gulp-image');

//delete dist directory
gulp.task("clean", function() {
	del(['dist']);
});

//move index.html to dist
gulp.task('moveIndex', function() {
	return gulp.src(['./src/index.html'])
	.pipe(wait(200))
    .pipe(gulp.dest('./dist/'));	
});


//concat the CSS stylesheets. CSS stylesheets must be in proper cascading order.
gulp.task('compressCSS', function() {
	return gulp.src(['./src/css/normalize.css', './src/css/foundation.css', './src/css/basics.css', 
	'./src/css/menu.css', './src/css/hero.css', './src/css/photo-grid.css', './src/css/modals.css', 
	'./src/css/footer.css'])
    .pipe(cleanCSS({
      level: {
        1: {},
        2: {}
      }
    }))
    .pipe(concat('styles.min.css'))
	.pipe(gzip())
    .pipe(gulp.dest('./dist/css'));	
});

//compress JS. JS FILES MUST BE IN SPECIFIC ORDER.
gulp.task('compressJS', function () {
    return gulp.src(['./src/js/jquery.js', './src/js/fastclick.js', './src/js/foundation.js', 
	'./src/js/foundation.equalizer.js', './src/js/foundation.reveal.js'])
	.pipe(uglify())
	.pipe(concat('app.min.js'))
	.pipe(gzip())
    .pipe(gulp.dest('./dist/js'));
});

//compress the images
gulp.task('compressImages', function() {
    return gulp.src(['./src/img/avatars/*.jpg', './src/img/social/*.svg', 
	'./src/img/photos/Modal/*.jpg', './src/img/photos/Thumbnail/*.jpg'], {base: './src/img'})
    .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: true,
        jpegoptim: false,
        mozjpeg: false,
        gifsicle: true,
        svgo: true
    }))
    .pipe(gulp.dest('./dist/img/'));
});


gulp.task('default', gulpSequence('clean', 'moveIndex', 'compressCSS', 'compressJS', 'compressImages'));