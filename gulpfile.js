'use strict';

var gulp = require('gulp'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        cleanCSS = require('gulp-clean-css'),
        rename = require('gulp-rename'),
        autoprefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        amdOptimize = require("amd-optimize");

gulp.task('sass', function () {
    gulp.src('./src/sass/netjoint-ui.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({browsers: ['last 2 version', 'ie 8', 'ie 9', 'ios 6', 'android 4']}))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./dist/css'));
    gulp.src('./src/sass/netjoint-ui.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({browsers: ['last 2 version', 'ie 8', 'ie 9', 'ios 6', 'android 4']}))
            .pipe(rename({suffix: '.min'}))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./dist/css'));
});

gulp.task('jsbuild', function () {
    gulp.src('./src/js/*.js')
            .pipe(amdOptimize("netjoint-ui", {
                baseUrl: "./src/js",
                paths: {
                    "jquery": "../../node_modules/jquery/dist/jquery",
                    "select2": "select",
                    "humane": "../../node_modules/humane-js/humane",
                    "bootbox": "bootbox",
                    "moment" : "../../node_modules/moment/min/moment-with-locales",
                    "cropper" : "../../node_modules/cropper/dist/cropper",
                    "jquery.cookie" : "../../node_modules/jquery.cookie/jquery.cookie",
                },
                shim: {
                    'affix': {
                        deps: ['jquery'],
                        exports: '$.fn.affix'
                    },
                    'alert': {
                        deps: ['jquery'],
                        exports: '$.fn.alert'
                    },
                    'button': {
                        deps: ['jquery'],
                        exports: '$.fn.button'
                    },
                    'carousel': {
                        deps: ['jquery'],
                        exports: '$.fn.carousel'
                    },
                    'collapse': {
                        deps: ['jquery'],
                        exports: '$.fn.collapse'
                    },
                    'dropdown': {
                        deps: ['jquery'],
                        exports: '$.fn.dropdown'
                    },
                    'modal': {
                        deps: ['jquery'],
                        exports: '$.fn.modal'
                    },
                    'scrollspy': {
                        deps: ['jquery'],
                        exports: '$.fn.scrollspy'
                    },
                    'tab': {
                        deps: ['jquery'],
                        exports: '$.fn.tab'
                    },
                    'tooltip': {
                        deps: ['jquery'],
                        exports: '$.fn.tooltip'
                    },
                    'popover': {
                        deps: ['jquery', 'tooltip'],
                        exports: '$.fn.popover'
                    },
                    'transition': {
                        deps: ['jquery'],
                        exports: '$.fn.transition'
                    },
                    'checkbox': {
                        deps: ['jquery'],
                        exports: '$.fn.checkbox'
                    },
                    'layout': {
                        deps: ['jquery','jquery.cookie'],
                        exports: '$.fn.layout'
                    },
                    'datepicker': {
                        deps: ['jquery'],
                        exports: '$.fn.datepicker'
                    },
                    'timepicker': {
                        deps: ['jquery'],
                        exports: '$.fn.timepicker'
                    },
                    'editable': {
                        deps: ['jquery','popover'],
                        exports: '$.fn.editable'
                    },
                    'validate': {
                        deps: ['jquery'],
                        exports: '$.fn.validate'
                    },
                    'tableExport':{
                        deps: ['jquery'],
                        exports: '$.fn.tableExport'
                    },
                    'bootstrapTable': {
                        deps: ['jquery','editable','tableExport'],
                        exports: '$.fn.bootstrapTable'
                    },
                    'cropupload':{
                        deps: ['jquery','cropper','button','modal'],
                        exports: '$.fn.cropupload'
                    },
                    'videoupload':{
                        deps: ['jquery','button','modal'],
                        exports: '$.fn.videoupload'
                    },
                    'fontIconPicker':{
                        deps: ['jquery'],
                        exports: '$.fn.fontIconPicker'
                    }
                }
            }))
            .pipe(concat('netjoint-ui.js'))
            .pipe(gulp.dest('./dist/js'))
            .pipe(rename('netjoint-ui.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'));
});

gulp.task('install', function () {
    gulp.src('./node_modules/font-awesome/fonts/*.{otf,ttf,woff,woff2,eot,svg}')
            .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*.{otf,ttf,woff,woff2,eot,svg}')
            .pipe(gulp.dest('./dist/fonts/bootstrap'));

});
gulp.task('watch', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['jsbuild']);
});
