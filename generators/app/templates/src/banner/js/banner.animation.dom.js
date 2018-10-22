'use strict';

/**
 * Run the animation functions.
 */
Banner.prototype.start = function () {
  this.banner = document.querySelector('#ad-container');

  this.bannerWidth = this.banner.offsetWidth;
  this.bannerHeight = this.banner.offsetHeight;

  // Image array for preloading
  this.images = [
    // 'images/logo.png'
  ];

  // IF BUILD WITH CREATEJS
  // this.animate()
  
  var _this = this;
  // this.preloadImages(this.images, function () {
  //   _this.createElements();
  //   _this.setup();
    _this.hidePreloader();
    _this.animate();
    _this.bindEvents();
  // });
};

/**
 * Hide the preloader.
 */
Banner.prototype.hidePreloader = function () {
  TweenLite.to('.preloader', .25, { autoAlpha: 0 });
};

/**
 * Animation timeline.
 */
Banner.prototype.animate = function () {
  this.timeline = new TimelineMax({ repeat: -1})
    .addLabel('start', 0)
    .to('#logo', 0.7, { y: "+=50", ease: Power2.easeInOut })
    .to('#logo', 0.7, { y: "-=50", ease: Power2.easeInOut })
};

Banner.prototype.getPulseAniamtion = function (mc, scale, loops, time) {
  var timeLine = new TimelineLite();

  for (var i = 0; i < loops; i++) {
    timeLine.to(mc, time, {scaleX: "+=" + scale, scaleY: "+=" + scale, ease: Sine.easeIn});
    timeLine.to(mc, time, {scaleX: "-=" + scale, scaleY: "-=" + scale, ease: Sine.easeOut});
  }

  return timeLine;
}
