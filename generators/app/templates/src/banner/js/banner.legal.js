
'use strict';

Banner.prototype.createLegalBar = function() {
  if (this.creative.config.legal) {
    var divLegalContainer = document.createElement('div');
    var divLegalWrapper = document.createElement('div');
    
    divLegalContainer.classList.add('legal__container');
    divLegalWrapper.classList.add('legal__wrapper');
    
    var adContainer = document.getElementById('ad-container');
    
    divLegalWrapper.innerHTML = this.creative.config.legal.content;
    
    if (this.creative.config.legal.isLong)
      divLegalWrapper.innerHTML += " " + this.creative.config.legal.content;

    divLegalContainer.appendChild(divLegalWrapper);
    adContainer.appendChild(divLegalContainer);
  }
}
