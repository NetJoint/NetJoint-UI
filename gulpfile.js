'use strict';

var gulp = require('gulp'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        cleanCSS = require('gulp-clean-css'),
        rename = require('gulp-rename'),
        autoprefixer = require('gulp-autoprefixer'),
        requirejs = require('gulp-requirejs');

gulp.task('sass', function () {
    return gulp.src('./src/sass/netjoint-ui.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({browsers: ['last 2 version', 'ie 8', 'ie 9', 'ios 6', 'android 4']}))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./dist/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./dist/css'));
});
gulp.task('install', function () {
    gulp.src('./node_modules/font-awesome/fonts/*.{otf,ttf,woff,woff2,eot,svg}')
            .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*.{otf,ttf,woff,woff2,eot,svg}')
            .pipe(gulp.dest('./dist/fonts/bootstrap'));
});
gulp.task('watch', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
});
