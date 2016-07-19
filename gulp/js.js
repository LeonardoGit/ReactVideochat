"use strict";

var browserify = require("browserify"),
    babelify   = require("babelify"),
    watchify   = require("watchify"),
    source     = require("vinyl-source-stream"),
    buffer     = require("vinyl-buffer");

// Lint and build source JavaScript files
gulp.task("js", function () {
    var bundler = browserify({
        debug:     true,
        entries:   [config.js.entry],
        transform: [babelify],
        cache:     {}, packageCache: {}
    });

    if ($.util.env.watch) {
        bundler = watchify(bundler);

        // Rebundle when any included file is changed
        bundler.on("update", rebundle);
    }

    function rebundle(ids) {
        if (ids) {
            $.util.log(
                $.util.colors.magenta("Rebundling"),
                $.util.colors.magenta(ids.join(", "))
            );
        }
        else {
            $.util.log($.util.colors.magenta("Bundling..."));
        }

        bundler
            .bundle()
            .pipe(source("main.js"))
            .pipe(buffer())
            .pipe(isProd ? $.uglify({mangle: false}) : $.util.noop())
            .pipe(gulp.dest(config.js.dest));
    }

    bundler
        .on("error", $.util.log)

        // Log amount of bytes of generated bundle
        .on("bytes", function (bytes) {
            var whichSize = 0;
            var sizes = ["bytes", "kb", "mb"];

            if (bytes > 1000) {
                bytes = bytes / 1000;
                whichSize = 1;
            }

            if (bytes > 1000) {
                bytes = bytes / 1000;
                whichSize = 2;
            }

            return $.util.log(
                $.util.colors.magenta("Bundle"),
                "is",
                $.util.colors.magenta(bytes, sizes[whichSize])
            );
        })

        // Log amount of milliseconds taken to generate bundle
        .on("time", function (time) {
            return $.util.log(
                $.util.colors.magenta("Bundle"),
                "completed in", $.util.colors.magenta(time + " milliseconds")
            );
        });

    rebundle();
    return bundler;
});