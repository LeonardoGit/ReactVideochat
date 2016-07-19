"use strict";

// Optimize Images
gulp.task("images", function () {
    return gulp.src(["src/images/**/*"])
        .pipe(gulp.dest("dist/images"));
});