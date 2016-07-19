"use strict";

// Build Jade files
gulp.task("jade", function () {
    var stream = gulp.src(config.jade.main);

    stream
        .pipe($.jade({pretty: !isProd}))
        .pipe(gulp.dest(config.jade.dest));

    return stream;
});