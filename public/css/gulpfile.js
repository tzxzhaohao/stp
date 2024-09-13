'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')

function buildStyles() {
    return gulp
        .src('./commonLayout.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('global.css')) // 修改文件名
        .pipe(gulp.dest('./'))
}

exports.sass = buildStyles
exports.watchCss = function () {
    const watcher = gulp.watch('./commonLayout.scss')
    watcher.on('change', function (path) {
        console.log(`File: ${path} was changed`)
        buildStyles()
    })
}
