require('dotenv').config();
const path = require('path');
const gulp = require('gulp');
const rollup  = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const buble = require('@rollup/plugin-buble');
const terser = require('rollup-plugin-terser');
const commonjs = require('rollup-plugin-commonjs');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');



let basePath = path.resolve('./');
let srcPath = path.join(basePath, 'src/');
let distPath = path.join(basePath, 'dist/');
let srcSassPath = path.join(srcPath, 'scss/');
let srcJsPath = path.join(srcPath, 'js/');
let distSassPath = path.join(distPath, 'css/');
let distJsPath = path.join(distPath, 'js/');


// const siteProxy = 'siteFromScratch';
const siteProxy = process.env.URL;

// BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    proxy : siteProxy,
  });
});

// Sass Build
const buildSass = cb => {
  return gulp.src(path.join(srcSassPath, 'app.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [path.join(__dirname, 'node_modules')]
    })).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(distSassPath)))
    .pipe(browserSync.reload({
      stream: true
    }))
    .on('end', () => {
      return cb();
    });
}

// JS Build
const buildJS = cb => {
  return rollup.rollup({
    input: path.join(srcJsPath, 'app.js'),
    plugins: [
        nodeResolve(),
        buble(),
        terser.terser(),
        commonjs({
            include: [
                'node_modules/**',
            ],
        }),
    ],
  }).then(bundle => bundle.write({
      format: 'umd',
      name: 'app',
      strict: true,
      sourcemap: true,
      sourcemapFile: path.join(distJsPath, 'app.min.js.map'),
      file: path.join(distJsPath, 'app.min.js'),
  }));
}



// Sass Watch
const watchSass = cb => {
  browserSync.init({
    proxy : siteProxy,
    reloadOnRestart: true,
    open: "external"
  });
  return gulp.watch([path.join(srcSassPath, '**/*.scss')], gulp.series(buildSass));
}

// JS Watch
gulp.task('watchJS', function() {
  browserSync.init({
    proxy : siteProxy,
    open: "external"
  });
  gulp.watch([path.join(srcJsPath, '**/*.js')], gulp.series(buildJS));
  gulp.watch([path.join(srcJsPath, '**/*.js')]).on('change', browserSync.reload );
});

gulp.task('watchsrc', function() {
  browserSync.init({
    proxy : siteProxy,
    open: "external"
  });
  gulp.watch([path.join(srcSassPath, '**/*.scss')], gulp.series(buildSass));
  gulp.watch([path.join(srcJsPath, '**/*.js')], gulp.series(buildJS));
  gulp.watch([path.join(srcJsPath, '**/*.js')]).on('change', browserSync.reload);
});

// Watch si modif template
gulp.task('watchTemplate', function() {
  browserSync.init({
    proxy : siteProxy
  });
  gulp.watch([path.join(basePath, '**/*.php')]).on('change', browserSync.reload );
});

gulp.task('watchAll', function() {
  browserSync.init({
    proxy : siteProxy
  });
  gulp.watch([path.join(srcSassPath, 'app.scss')], gulp.series(buildSass));
  gulp.watch([path.join(srcJsPath, 'app.js')], gulp.series(buildJS));
  // gulp.watch([path.join(srcJsPath, '**/*.js')]).on('change', browserSync.reload);
  // gulp.watch([path.join(basePath, '**/*.php'), path.join(basePath, '**/*.html')]).on('change', browserSync.reload );
});


exports['sass'] = gulp.series(buildSass);
exports['watch:sass'] = gulp.series(watchSass);
exports['js'] = gulp.series(buildJS);
exports['watch:js'] = gulp.series('watchJS');
exports['build'] = gulp.series(buildSass,buildJS)
exports['watch:src'] = gulp.series('watchsrc');
exports['watch:all'] = gulp.series('watchAll');


