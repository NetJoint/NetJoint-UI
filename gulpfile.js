'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('./sass/netjoint-ui.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({ browsers: ['last 2 version', 'ie 8', 'ie 9', 'ios 6', 'android 4'] }))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('./maps'))    
            .pipe(gulp.dest('./dist/css'));
});
gulp.task('sass-min', function () {
    return gulp.src('./sass/netjoint-ui.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({ browsers: ['last 2 version', 'ie 8', 'ie 9', 'ios 6', 'android 4'] }))
            .pipe(rename({suffix: '.min'}))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('./maps'))    
            .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass','sass-min']);
});
