'use strict';

/**
 * Run the animation functions.
 */
Banner.prototype.start = function () {
  this.banner = document.querySelector('#ad-container');

  this.bannerWidth = this.banner.offsetWidth;
  this.bannerHeight = this.banner.offsetHeight;

  // IF BUILD WITH CREATEJS
  this.onDocumentLoaded()

  this.hidePreloader();
  this.bindEvents();
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
  var mc =  this.creative.createjs.movieclips
  this.timeline = new TimelineMax({ repeat: -1})
    .addLabel('start', 0)
    .to(mc.rect, 0.7, { y: "+=50", ease: Power2.easeInOut })
    .to(mc.rect, 0.7, { y: "-=50", ease: Power2.easeInOut })
};

Banner.prototype.getPulseAniamtion = function (mc, scale, loops, time) {
  var timeLine = new TimelineLite();

  for (var i = 0; i < loops; i++) {
    timeLine.to(mc, time, {scaleX: "+=" + scale, scaleY: "+=" + scale, ease: Sine.easeIn});
    timeLine.to(mc, time, {scaleX: "-=" + scale, scaleY: "-=" + scale, ease: Sine.easeOut});
  }

  return timeLine;
}

Banner.prototype.getCTAAnimation = function () {
  var timeLine = new TimelineLite();
  var arrowLine = new TimelineLite();

  var shineWidth = creative.mc.cta.bg.getBounds().width;

  timeLine.to(creative.mc.cta.shine, 2, { x: shineWidth, ease: Expo.easeInOut }, "ee");
  timeLine.set(creative.mc.cta.shine, { x: -shineWidth });

  arrowLine.to(creative.mc.cta.arrow, 0.5, { x: "+=40", ease: Expo.easeIn }, "ee+=0.6");
  arrowLine.set(creative.mc.cta.arrow, { x: "-=40", scaleX: 0, scaleY: 0 });
  arrowLine.to(creative.mc.cta.arrow, 0.5, { scaleX: 1, scaleY: 1, ease: Expo.easeOut }, "+=0.1");
  timeLine.add(arrowLine, "ee");

  return timeLine;
}

Banner.prototype.checkAnimationStopConditions = function () {
  if (isAniamtionShouldStop()) {
    stopanamtion();
  }

  function isAniamtionShouldStop() {
    if (creative.config.specification == "GDN")
      if (creative.animation.currentLoop >= creative.animation.totalLoopCount) {
        return true;
      }
    return false;
  }

  function stopanamtion() {
    creative.animation.timelines.main.pause();
  }
}
