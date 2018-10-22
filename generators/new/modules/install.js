/**
 * Install the dependencies.
 */

'use strict';
const chalk = require('chalk');



var src = './src';
var dest = './public';

// var autoprefixer = require('gulp-autoprefixer');
// var browserSync = require('browser-sync');

// var gulp = require('gulp');
// var gulpif = require('gulp-if');
// var handleErrors = require('../lib/handleErrors');
// var nano = require('gulp-cssnano');
// var plumber = require('gulp-plumber');
// var sass = require('gulp-sass');
// var sourcemaps = require('gulp-sourcemaps');

var config = {
  'sass': {
    'src': src + '/**/*.{sass,scss}',
    'dest': dest,
    'autoprefixer': {
      'browsers': ['last 3 version']
    }
  }
};





module.exports = function install() {
  this.log(chalk.green('New banner format generated'));

  // if (this.props.includeOfflineScripts === true) {
    // this.npmInstall(['gsap'], {
    //   dev: true
    // });
  // }

};
