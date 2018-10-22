/*
 * Generate files and process them.
 */
const concat = require('concat-files');
const download = require('download');
const getVendorScript = require('../../app/modules/getVendorScript');

module.exports = function files() {

  const props = {
    bannerName: '750x200',
    bannerDesc: this.props.bannerDesc,
    bannerType: this.props.bannerType,
    bannerWidth: 750,
    bannerHeight: 200,
    bannerFramework: this.props.bannerFramework,
    includeLegalBar: this.props.includeLegalBar,
    bannerRepo: this.props.bannerRepo,
    includeTimeline: this.props.includeTimeline
  };
  
  // Process the html files
  this.fs.copyTpl(
    this.templatePath('src/_index.html'),
    this.destinationPath('src/index.html'),
    props
  );

  this.fs.copyTpl(
    this.templatePath('src/base/styles'),
    this.destinationPath('src/base/styles'),
    props
  );
  
  this.fs.copy(
    this.templatePath('src/base/js/main.js'),
    this.destinationPath('src/base/js/main.js')
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
   * Process the js files.
   */
  
  // concat(
  //   jsFilePaths
  //   // this.templatePath('../../app/templates/src/banner/js/banner.legal.js'),
  //   // this.templatePath('../../app/templates/src/banner/js/banner.loader.js'),
  // , this.destinationPath(`src/${this.props.bannerName}/js/banner.concat.js`), function(err) {
  //   if (err) throw err
  //   console.log('done');
  // });

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


  // Retrieve banner properties to create the package.json
  this.fs.copyTpl(
    this.templatePath('_package.json'),
    this.destinationPath('package.json'),
    props
  );

  // Process the readme file
  this.fs.copyTpl(
    this.templatePath('_README.md'),
    this.destinationPath('README.md'),
    props
  );

  // Process the config files
  this.fs.copy(
    this.templatePath('editorconfig'),
    this.destinationPath('.editorconfig')
  );
  this.fs.copy(
    this.templatePath('gitignore'),
    this.destinationPath('.gitignore')
  );
  this.fs.copy(
    this.templatePath('jshintrc'),
    this.destinationPath('.jshintrc')
  );
  this.fs.copy(
    this.templatePath('package-lock.json'),
    this.destinationPath('package-lock.json')
  );

  // Process the images
  this.fs.copy(
    this.templatePath('src/base/images'),
    this.destinationPath('src/base/images')
  );

  // Process the gulp tasks
  this.fs.copy(
    this.templatePath('gulpfile.js'),
    this.destinationPath('gulpfile.js')
  );
    
};




