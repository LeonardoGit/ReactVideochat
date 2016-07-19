"use strict";

var dir = require("require-dir");

// globals
global.gulp = require("gulp");

global.$ = require("gulp-load-plugins")();
$.runSequence = require("run-sequence");

global.isProd = $.util.env.prod;
global.config = require("./config.json");

dir("./gulp");

// Build development assets and serve
gulp.task("default", function () {
    if ($.util.env.watch) {
        return $.runSequence("build", ["watch", "webServer"]);
    }

    return $.runSequence("build", "webServer");
});