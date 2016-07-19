"use strict";

gulp.task("watch", function () {
    gulp.watch(config.css.source, ["css"]);
    gulp.watch(config.jade.source, ["jade"]);
    //gulp.watch(config.js.source, ["js"]);
});