
const gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');

gulp.task('message', function(){
    return console.log('gulp is running')
})

gulp.task('build', function(){
    return gulp.src('./views/*.html')
        .pipe(htmlreplace({
            js: {
                src: 'javascripts/minify/output.min.js',
                tpl: "<script src='%s'></script>"
            }
        }))
        .pipe(gulp.dest('./build/'));
})
