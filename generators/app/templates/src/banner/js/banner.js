'use strict';

var Banner = function () {
  this.loader();
  this.imageCache = {};
};

Banner.prototype.onInit = function () {
  
};

Banner.prototype.onPolite = function () {
  <% if (includeLegalBar) { %>this.createLegalBar()<% } %>
};

/**
 * Polite load scripts and trigger the
 */
Banner.prototype.onVisible = function () {
  var _this = this;
  
  this.politeLoad([
    <% if (bannerFramework == "CREATEJS") { %> 'animate.js' <% } %>
  ], function () {
    _this.start();
  });
};

/**
 * Preload images method.
 */
Banner.prototype.preloadImages = function (images, callback, scope) {
  var _this = this;
  var l = images.length;
  var loaded = 0;
  var img = null;

  for (var i = 0; i < l; ++i) {
    img = document.createElement('img');
    img.src = img.microSrc = images[i];
    img.onload = function () {
      _this.imageCache[this.microSrc] = this;
      loaded++;
      if (loaded === l) {
        if (scope) {
          callback.call(scope);
        } else {
          callback();
        }
      }
    };
  }
};