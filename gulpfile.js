

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require ('gulp-rename'),
	clean = require ('gulp-clean'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	defineModule = require('gulp-define-module'),
	declare = require('gulp-declare'),
	runSequence = require('run-sequence'),
	connect = require('gulp-connect'),
	shell = require('gulp-shell'),
	webserver = require('gulp-webserver');


gulp.task('styles', function() {
	return gulp.src('source/assets/css/**/*.scss')
		.pipe(sass({
			compass: false,
			lineNumbers: true,
			loadPath: ['source/assets/css'],
			style: 'expanded'
		}))
		.pipe(autoprefixer('last 2 version', 'ie 10'))
		.pipe(gulp.dest('static/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('static/css'))
		.pipe(notify({
			message: "Styles task completed"
		}));
});

gulp.task('scripts', function() {
	// copy vendor folder as it is
	gulp.src('source/assets/js/vendor/**/*.js')
		.pipe(gulp.dest('static/js/vendor/'));

	return gulp.src([
			'source/assets/js/plugins/plugins.js',
			'source/assets/js/g.js',
			'source/assets/js/partials/*.js',
			'source/assets/js/main.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('static/js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('static/js'))
		.pipe(notify({
			message: "Scripts task completed"
		}));
});


gulp.task('images', function() {
	return gulp.src('source/assets/images/**/*')
		.pipe(gulp.dest('static/images'))
		.pipe(notify({
			message: 'Images task complete',
			onLast: true
		}));
});

gulp.task('fonts', function() {
	return gulp.src('source/assets/fonts/*')
		.pipe(gulp.dest('static/fonts'))
		.pipe(notify({
			message: 'Fonts task complete',
			onLast: true
		}));
});

gulp.task('webserver', shell.task([
	"osascript -e 'tell application \"Terminal\" to do script \"cd " + process.cwd() + " && cactus serve\"'"
]));

gulp.task('default', ['webserver'], function() {
	gulp.watch(['source/assets/js/**/*.js'], ['scripts']);
	gulp.watch('source/assets/css/**/*.scss', ['styles']);
	gulp.watch('source/assets/images/**/*', ['images']);
	gulp.watch('source/fonts/*', ['fonts']);
});

gulp.task('build', function() {
	runSequence('scripts', 'styles', 'images', 'fonts');
});


