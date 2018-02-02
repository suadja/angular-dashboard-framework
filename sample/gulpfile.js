var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var watchLess = require('gulp-watch-less');
var replace = require('gulp-replace-task');

//Browser sync
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function () {
  browserSync.init({
    port: 3002,
    proxy: {
      target: 'localhost:9001', // original port
      ws: true // enables websockets
    },
    //Where to start the server
    startPath: "/"
  });
});

//Base web dir
var webDir = './web';
//HTMLs Base dir
var htmlDir = './web/templates';
//JSs Base dir
var jsDir = './web/js';

//Folder where we store our LESS files
var lessDir = './less';

//LESS compilter configuration
var lessConfig = {
  paths: ['./less/components']
};

//Folder where compiled LESS will be (as .css file)
var targetCSSDir = '../dist';

//Compile LESS to CSS3 with vendor prefixes
gulp.task('css', function () {
  return gulp.src(lessDir + '/styles.less')
    .pipe(watchLess(lessDir + '/styles.less', {
      name: 'LESS', // For output nice-LESS (get it?)!
      less: lessConfig // Passed to LESS parser when generating list of @imports
    }))
    .pipe(plumber({
      errorHandler: function (err) {
        var errorMessage = ' \n ' + 'Filename: ' + err.fileName +
          ' \n ' + 'Line: ' + err.lineNumber +
          ' \n ' + 'Reason: ' + err.message;
        gutil.log(gutil.colors.red("Error :("), errorMessage);
        this.emit('end');
      }
    }))
    .pipe(watchLess(lessDir + '/styles.less', {
      name: 'LESS', // For output nice-LESS (get it?)!
      less: lessConfig // Passed to LESS parser when generating list of @imports
    }))
    .pipe(less(lessConfig))
    .pipe(autoprefix('last 5 version'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(targetCSSDir))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(notify('All done :D'));
});

//Keep an eye on LESS files for changes
gulp.task('watch', ['browserSync'], function () {
  gulp.watch(lessDir + '/styles.less', ['css']);
  gulp.watch(lessDir + '/*.less', ['css']);
  gulp.watch(lessDir + '/**/*.less', ['css']);
  gulp.watch(lessDir + '/**/**/*.less', ['css']);
});

//Default task triggers css warch
gulp.task('default', ['css', 'watch']);
