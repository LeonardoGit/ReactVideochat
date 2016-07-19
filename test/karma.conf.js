"use strict";

var fs = require("fs");

module.exports = function (config) {
    config.set({
        "basePath": "../",

        "browsers": [
            "Chrome"
        ],

        "frameworks": [
            "browserify",
            "jasmine"
        ],

        "files": [
            "test/**/*.js"
        ],

        "preprocessors": {
            "test/**/*.js": ["browserify"]
        },

        "browserify": {
            "debug":      true,
            "extensions": [".js"]
        },

        "plugins": [
            "karma-jasmine",
            "karma-browserify",
            "karma-chrome-launcher"
        ]
    });
};