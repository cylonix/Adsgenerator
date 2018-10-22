
'use strict';

Banner.prototype.onDocumentLoaded = function() {
  creative.dom.canvas = document.getElementById("createjs-canvas");
  this.initializeCreateJsContent();
}

Banner.prototype.initializeCreateJsContent = function() {
  // images = images || {};
  var comp=AdobeAn.getComposition(creative.createjs.compositionId);
  var lib=comp.getLibrary();
  var _this = this;
  var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", function(evt){_this.handleFileLoad(evt,comp)});
    loader.addEventListener("complete", function(evt){_this.handleComplete(evt,comp)});
    loader.loadManifest(lib.properties.manifest);
}

Banner.prototype.handleFileLoad = function(evt, comp) {
  var images=comp.getImages();	
  if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}

Banner.prototype.handleComplete = function(evt, comp) {
  var lib=comp.getLibrary();
  var ss=comp.getSpriteSheet();
  var queue = evt.target;
  var ssMetadata = lib.ssMetadata;
  for(var i=0; i<ssMetadata.length; i++) {
    ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
  }
  this.creative.config.lib = lib;
  this.creative.createjs.exportRoot = new lib.index();
  this.creative.createjs.exportRoot.visible = false;
  // this.creative.createjs.exportRoot.x = creative.createjs.exportRoot.y = -1;
  // creative.createjs.exportRoot.scaleX = creative.createjs.exportRoot.scaleY = 0.7;

  this.creative.createjs.stage = new createjs.Stage(creative.dom.canvas);
  this.creative.createjs.stage.addChild(creative.createjs.exportRoot);
  this.creative.createjs.stage.update();

  createjs.Ticker.setFPS(lib.properties.fps);
  createjs.Ticker.addEventListener("tick", this.creative.createjs.stage);

  this.onCreateJsReady(lib);
} 
    
Banner.prototype.onCreateJsReady = function(lib) {
  this.initializeCreative(lib)
  setTimeout(this.initAnimation.bind(this), 100)
}

Banner.prototype.initializeCreative = function(lib) {
  this.creative.config.stageWidth 	= lib.properties.width;
  this.creative.config.stageHeight = lib.properties.height;
  
  for (var key in this.creative.createjs.exportRoot) {
    if (this.creative.createjs.exportRoot.hasOwnProperty(key)) {
      var element = this.creative.createjs.exportRoot[key];
      if(element instanceof createjs.MovieClip){
        this.creative.createjs.movieclips[key] = element;
      }
    }
  }
}

Banner.prototype.initAnimation = function() {
  console.log('Banner.prototype.initAnimation');
  this.animate();
  // creative.animation.timelines.main = new TimelineMax ({repeat : -1, yoyo : true});
  // creative.animation.timelines.main = new TimelineMax({
  //   onComplete: function () {
  //     this.restart();
  //     creative.animation.currentLoop++;
  //   }
  // });
  // creative.animation.timelines.main.add(scene1Animation());
  // creative.animation.timelines.main.seek(creative.config.seek);
  this.creative.createjs.exportRoot.visible = true;
}