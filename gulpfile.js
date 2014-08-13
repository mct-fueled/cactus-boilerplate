

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
	exec = require('gulp-exec'),
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

gulp.task('webserver', function() {
	//return gulp.exec("cacti serve");
	exec('cactus serve');
	//return gulp.src('public')
		// .pipe(webserver({
		// 	host: '127.0.0.1',
		// 	livereload: true,
		// 	directoryListing: false,
		// 	port: 8000
		// }));
});

gulp.task('default', ['webserver'], function() {
	//livereload.listen();
	gulp.watch(['source/assets/js/**/*.js'], ['scripts']);
	gulp.watch('source/assets/css/**/*.scss', ['styles']);
	gulp.watch('source/assets/images/**/*', ['images']);
	gulp.watch('source/fonts/*', ['fonts']);

	//gulp.watch('source/**').on('change', livereload.changed);
});

gulp.task('build', function() {
	runSequence('scripts', 'styles', 'images', 'fonts');
});


