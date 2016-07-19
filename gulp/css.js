"use strict";

// Build CSS files
gulp.task("css", function () {
    var stream = gulp.src(config.css.main);

    stream
        .pipe(!isProd ? $.sourcemaps.init({loadMaps: true}) : $.util.noop())
        .pipe($.less())
        .on("error", $.notify.onError({
            message: "LESS compile error: <%= error.message %>"
        }))
        .pipe(!isProd ? $.sourcemaps.write() : $.util.noop())
        .pipe($.size({title: "CSS"}))
        .pipe(gulp.dest(config.css.dest));

    return stream;
});