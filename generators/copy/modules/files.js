/*
 * Generate files and process them.
 */

const download = require('download');
const getVendorScript = require('../../app/modules/getVendorScript');
const fs = require('fs');

module.exports = function files() {
  const props = {
    bannerName: this.props.bannerName,
    bannerWidth: this.props.bannerWidth,
    bannerHeight: this.props.bannerHeight,
    bannerType: this.props.bannerType,
    bannerFramework: this.props.bannerFramework,
    includeLegalBar: this.props.includeLegalBar
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

  /**
   * Process the scss files.
   */
  this.fs.copy(
    this.destinationPath(`src/${this.props.bannerMaster}/styles`),
    this.destinationPath(`src/${this.props.bannerName}/styles`)
  );
  this.fs.copy(
    this.destinationPath(`src/${this.props.bannerMaster}/styles/style.scss`),
    this.destinationPath(`src/${this.props.bannerName}/styles/style.scss`),
    {
      process: (content) => {
        const regExWidth = new RegExp(/\$banner-width:\s*[0-9]*px;/);
        const regExHeight = new RegExp(/\$banner-height:\s*[0-9]*px;/);
        const newContent = content
          .toString()
          .replace(regExWidth, `$banner-width: ${props.bannerWidth}px;`)
          .replace(regExHeight, `$banner-height: ${props.bannerHeight}px;`);
        return newContent;
      }
    }
  );
  
  /**
   * Process the html files.
   */
  // this.fs.copyTpl(
  //   this.templatePath('../../app/templates/src/banner/index.html'),
  //   this.destinationPath(`src/${props.bannerName}/index.html`),
  //   props
  // );

  this.fs.copy(
    this.destinationPath(`src/${this.props.bannerMaster}/index.html`),
    this.destinationPath(`src/${props.bannerName}/index.html`),
    {
      process: (content) => {
        
        const regTitle = new RegExp(/<title>[\s\S]*?<\/title>/);

        const regExWidth = new RegExp(/\width="\s*[0-9]*"/);
        const regExHeight = new RegExp(/\height="\s*[0-9]*"/);

        const regExWidth2 = new RegExp(/\width=\s*[0-9]*,/);
        const regExHeight2 = new RegExp(/\height=\s*[0-9]*"/);

        const newContent = content.toString()
          .replace(regTitle, `<title>${props.bannerWidth}x${props.bannerHeight}</title>`)
          .replace(regExWidth, `width="${props.bannerWidth}"`)
          .replace(regExHeight, `height="${props.bannerHeight}"`)
          .replace(regExWidth2, `width=${props.bannerWidth},`)
          .replace(regExHeight2, `height=${props.bannerHeight}"`);
        return newContent;
      }
    }
  );

  /**
   * Process the js files.
   */
  this.fs.copy(
    this.destinationPath(`src/${this.props.bannerMaster}/js`),
    this.destinationPath(`src/${this.props.bannerName}/js`)
  );
  
  if (props.bannerFramework == "CREATEJS"){
    this.fs.copy(
      this.destinationPath(`src/${this.props.bannerMaster}/animate.js`),
      this.destinationPath(`src/${this.props.bannerName}/animate.js`)
    );

    /**
     * Process the fla file.
     */
    this.fs.copy(
      this.destinationPath(`src/${this.props.bannerMaster}/fla/`),
      this.destinationPath(`src/${props.bannerName}/fla/`)
    );
    
    /*
    * Update fla document size
    */
    
    this.fs.copy(
      this.destinationPath(`src/${this.props.bannerMaster}/fla/index/DOMDocument.xml`),
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
    ///
  }
  /**
   * Process the images.
   */
  this.fs.copy(
    this.destinationPath(`src/${this.props.bannerMaster}/images`),
    this.destinationPath(`src/${this.props.bannerName}/images`)
  );
  
};
