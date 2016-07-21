'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
    return gulp.src('./public/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./public/scss/css'));
});
 
gulp.task('sass:watch', function () {
    gulp.watch('./public/scss/*.scss', ['sass']);
});


gulp.task('default', ['sass', 'sass:watch']);