/**
 * Get all folders in a directory.
 */

const fs = require('fs');
const path = require('path');
const fileExists = require('file-exists');

module.exports = function getFolders(dir) {
  return fileExists.sync(dir + '/js/banner.legal.js')
};