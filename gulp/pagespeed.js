"use strict";

var psi = require("psi");

// Run Pagespeed Insights on mobile
gulp.task("pagespeed:mobile", function (done) {
    return psi.output(config.deploySite, {
        nokey:    "true",
        strategy: "mobile"
    }, done);
});

// Run Pagespeed Insights on mobile
gulp.task("pagespeed:desktop", function (done) {
    return psi.output(config.deploySite, {
        nokey:    "true",
        strategy: "desktop"
    }, done);
});

// Run Pagespeed Insights on both mobile and desktop
gulp.task("pagespeed", function () {
    return $.runSequence("pagespeed:mobile", "pagespeed:desktop");
});