"use strict";

gulp.task("webServer", function () {
    return gulp
        .src(config["public"])
        .pipe($.webserver(config["webServer"]["server"]));
});