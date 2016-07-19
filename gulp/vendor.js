"use strict";

gulp.task("vendor", function () {
    var stream;

    var node = function (path) {
        return "node_modules/" + path;
    };

    if (isProd) {
        // Minified bower dependencies
        stream = gulp.src([
            node("bootswatch/bower_components/jquery/dist/jquery.min.js"),
            node("bootswatch/bower_components/bootstrap/dist/js/bootstrap.min.js")
        ]);
    }
    else {
        // Un-minified bower dependencies
        stream = gulp.src([
            node("bootswatch/bower_components/jquery/dist/jquery.js"),
            node("bootswatch/bower_components/bootstrap/dist/js/bootstrap.js")
        ]);
    }

    // Copy dependencies
    return stream
        .pipe($.concat("vendor.js"))
        .pipe(gulp.dest("dist/js"));
});