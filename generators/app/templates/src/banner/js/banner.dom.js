
'use strict';

Banner.prototype.onDocumentLoaded = function() {
  this.initAnimation();
}

Banner.prototype.initAnimation = function() {
  console.log('Banner.prototype.initAnimation');
  this.animate();
}