var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    notify = require('gulp-notify'),
    mainBowerFiles = require('main-bower-files'),
    angularFileSort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');

var config = {
  html_main_file: './index.html',
  css_dir: './styles',
  img_dir: './images',
  app_files: './app/**/*.js'
};

// Injecting links
gulp.task('inject-dev', function() {
  gulp.src(config.html_main_file)
  .pipe(inject(
    gulp.src(
      mainBowerFiles(), {read: false}
    ),
    {name: 'bower', relative: true}
  ))
  .pipe(inject(
    gulp.src(config.app_files).pipe(angularFileSort()),
    {relative: true}
  ))
  .pipe(gulp.dest('./'))
  .pipe(notify({ message: 'Sources injected in index.html' }));
});

// webserver
gulp.task('webserver', function() {
  gulp.src('./')
  .pipe(webserver({
    livereload: true,
    directoryListing: false,
    open: true
  }))
  .pipe(notify({ message: 'Webserver started' }));;
});

// Watch for file changes
gulp.task('watch', function() {
  gulp.watch(['./bower.json', config.app_files], ['inject-dev']);
});

gulp.task('default', ['webserver', 'inject-dev', 'watch']);
