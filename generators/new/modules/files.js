/*
 * Generate files and process them.
 */
const concat = require('concat-files');
const download = require('download');
const getVendorScript = require('../../app/modules/getVendorScript');

module.exports = function files() {

  const props = {
    bannerName: this.props.bannerName,
    bannerDesc: this.props.bannerDesc,
    bannerType: this.props.bannerType,
    bannerWidth: this.props.bannerWidth,
    bannerHeight: this.props.bannerHeight,
    bannerFramework: this.props.bannerFramework,
    includeLegalBar: this.props.includeLegalBar,
    bannerRepo: this.props.bannerRepo,
    includeTimeline: this.props.includeTimeline
  };
  
  // Process the html files
  const filePath = './src/index.html';

  this.fs.copy(
    filePath,
    filePath,
    {
      process: (content) => {
        const regEx = new RegExp('</ul>');
        const newContent = content
          .toString()
          .replace(regEx, `  <li><a href="${props.bannerName}/" class="done">${props.bannerName}</a></li>\n      </ul>`);
        return newContent;
      }
    }
  );

  

  this.fs.copyTpl(
    this.templatePath('../../app/templates/src/banner/index.html'),
    this.destinationPath(`src/${props.bannerName}/index.html`),
    props
  );

  /**
   * Process the scss files.
   */
  this.fs.copyTpl(
    this.templatePath('../../app/templates/src/banner/styles/style.scss'),
    this.destinationPath(`src/${props.bannerName}/styles/style.scss`),
    props
  );
  this.fs.copy(
    this.templatePath('../../app/templates/src/banner/styles/base/banner.scss'),
    this.destinationPath(`src/${props.bannerName}/styles/base/_banner.scss`),
    {
      process: (content) => {
        const regExWidth = new RegExp(/\$banner-width:\s*[0-9]*px;/);
        const regExHeight = new RegExp(/\$banner-height:\s*[0-9]*px;/);
        const newContent = content.toString()
          .replace(regExWidth, `$banner-width: ${props.bannerWidth}px;`)
          .replace(regExHeight, `$banner-height: ${props.bannerHeight}px;`);
        return newContent;
      }
    }
  );
  this.fs.copyTpl(
    this.templatePath('../../app/templates/src/banner/styles/base/preloader.scss'),
    this.destinationPath(`src/${props.bannerName}/styles/base/_preloader.scss`),
    props
  );
  
  /**
   * Process the js files.
   */

  var jsFilePaths = []
  var jsFiles = [
    'js/banner.js',
    'js/banner.config.js',
    'js/banner.loader.js',
  ]

  if (props.includeLegalBar) {
    jsFiles.push('js/banner.legal.js')
  }

  if (props.bannerFramework == "DOM") {
    jsFiles.push('js/banner.animation.dom.js')
  }

  if (props.bannerFramework == "CREATEJS"){
    jsFiles.push('js/banner.createjs.js')
    jsFiles.push('js/banner.animation.canvas.js')
    jsFiles.push('animate.js')

    /**
     * Process the fla file.
     */
    this.fs.copy(
      this.templatePath('../../app/templates/src/banner/fla'),
      this.destinationPath(`src/${props.bannerName}/fla`)
    );

    /*
    * Update fla document size
    */
    const flaPath = './src/index.html';

    this.fs.copy(
      this.templatePath('../../app/templates/src/banner/fla/index/DOMDocument.xml'),
      this.destinationPath(`src/${props.bannerName}/fla/index/DOMDocument.xml`),
      {
        process: (content) => {
          const regExWidth = new RegExp(`(width\s*=\s*["'](.*?)["'])`);
          const regExHeight = new RegExp(`(height\s*=\s*["'](.*?)["'])`);
          const newContent = content
            .toString()
            .replace(regExWidth, `width="${props.bannerWidth}"`)
            .replace(regExHeight, `height="${props.bannerHeight}"`);
          return newContent;
        }
      }
    )

  }
  for (let i = 0; i < jsFiles.length; i++) {
    const filePath = jsFiles[i];
    jsFilePaths.push(this.templatePath('../../app/templates/src/banner/' + filePath))
    this.fs.copyTpl(
      this.templatePath('../../app/templates/src/banner/' + filePath),
      this.destinationPath(`src/${props.bannerName}/` + filePath),
      props
    );
  }
  
  /**
   * Process the images.
   */
  this.fs.copy(
    this.templatePath('../../app/templates/src/banner/images'),
    this.destinationPath(`src/${props.bannerName}/images`)
  );

  /**
   * Process the offline vendor scripts.
   */
  if (props.includeOfflineScripts === true) {
    download(getVendorScript(props.bannerType), 'offline');
  }
}
