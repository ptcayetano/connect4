var gulp = require("gulp"),
    rename = require("gulp-rename"),
    del = require("del"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat")

gulp.task("copy-index", function() {
    gulp.src("index-prod.html")
        .pipe(rename("index.html"))
        .pipe(gulp.dest("public"));
});

gulp.task("copy-index-dev", function() {
    gulp.src("index-dev.html")
        .pipe(rename("index.html"))
        .pipe(gulp.dest("public"));
});

gulp.task("minify", function() {
    gulp.src(["js/libs/jquery.min.js", "js/libs/underscore.min.js", "js/libs/backbone.min.js", "js/libs/modernizr.min.js"])
        .pipe(concat("libs.js"))
        .pipe(gulp.dest("public/js/"));

    gulp.src(["js/utils.js", "js/connect4.js", "js/models/*.js", "js/views/*.js"])
        // .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task("copy-js", function() {
    gulp.src(["js/**/*"])
        .pipe(gulp.dest("public/js"), {overwrite: true});
})

gulp.task("copy-static", function() {
    gulp.src(["img/*"])
        .pipe(gulp.dest("public/img"), {overwrite: true});
    gulp.src(["css/*"])
        .pipe(gulp.dest("public/css"), {overwrite: true});
});

gulp.task("dev", ["copy-index-dev", "copy-js", "copy-static"]);

gulp.task("prod", ["copy-index", "minify", "copy-static"]);