// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename'),
    sourcemaps = require("gulp-sourcemaps"),
    del = require('del'),
    babel = require("gulp-babel"),
    browserSync = require('browser-sync').create();
var tinypng = require('gulp-tinypng-compress');

//Define the app path
var path = {
    all:[
        '*.html',
        './src/assets/css/*.css',
        './src/assets/js/*.js',
        './src/assets/js/lib/*.js'
    ],
    template:['*.html'],
    css:['./src/assets/css/*.css'],
    socialJs:[
        './src/assets/js/lib/zepto.min.js',
        './src/assets/js/lib/swiper.min.js',
        './src/assets/js/rem.js',
        './src/assets/js/map_follow.js',
        './src/assets/js/common.js',
        './src/assets/js/social.js'
    ],
    adJs:[
        './src/assets/js/lib/zepto.min.js',
        './src/assets/js/lib/swiper.min.js',
        './src/assets/js/rem.js',
        './src/assets/js/map_follow.js',
        './src/assets/js/common.js',
        './src/assets/js/ad.js'
    ],
    appJs:[
        './src/assets/js/lib/zepto.min.js',
        './src/assets/js/lib/swiper.min.js',
        './src/assets/js/rem.js',
        './src/assets/js/map_follow.js',
        './src/assets/js/common.js',
        './src/assets/js/api.js',
        './src/assets/js/app.js'
    ],
    images:[
        './src/assets/*.{png,jpg,jpeg}',
        './src/assets/*/*.{png,jpg,jpeg}',
        './src/assets/*/*/*.{png,jpg,jpeg}'
    ],
    audio:[
        './src/assets/audio/*'
    ],
};
// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(path.all,{
        server: {
            baseDir: "./",
            startPath: ''
        }
    });
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
});


//css
gulp.task('css',['clean'],function () {
    // 1. 找到文件
    gulp.src(path.css)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./src/dist/css'));
});

//audio
gulp.task('audio',['clean'],function () {
    // 1. 找到文件
    gulp.src(path.audio)
        .pipe(gulp.dest('./src/dist/audio'));
});

// Concatenate & Minify
gulp.task('scripts_social',['clean'], function() {
    return gulp.src(path.socialJs)
        .pipe(concat('all_social.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all_social.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});
gulp.task('scripts_ad',['clean'], function() {
    return gulp.src(path.adJs)
        .pipe(concat('all_ad.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all_ad.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});
gulp.task('scripts_app',['clean'], function() {
    return gulp.src(path.appJs)
        .pipe(concat('all_app.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all_app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});

// Concatenate & Minify
gulp.task("tinypng", function(){
    gulp.src(path.images)
        .pipe(tinypng({
            key: '-ID8TBnbSlRuMCc_mMagta65Q7IDyaQ-',
            sigFile: './src/.tinypng-sigs',
            log: true
        })).on('error', function(err) {
            console.error(err.message);
        })
        .pipe(gulp.dest('./src/dist/'));
});

// Watch Files For Changes
gulp.task('watch', ['clean'],function() {
    gulp.watch(path.css,['css']);
    gulp.watch(path.socialJs,['scripts_social']);
    gulp.watch(path.adJs,['scripts_ad']);
    gulp.watch(path.appJs,['scripts_app']);
});

// Default Task
gulp.task('default', ['watch', 'css','scripts_social','scripts_ad','scripts_app','browser-sync']);


