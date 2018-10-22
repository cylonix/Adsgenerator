/**
 * The questions that the sub-generator will ask.
 */

const _ = require('lodash');
const getFolders = require('./getFolders');
const isCreatejsBanner = require('./isCreatejsBanner');
const isRequireLegalBar = require('./isRequireLegalBar');

module.exports = function prompts() {
  if (this.skipConfig) return true;

  const currentBanners = getFolders('./src');

  return this.prompt([{
    type: 'list',
    name: 'bannerMaster',
    message: 'Which banner do you want to copy?',
    choices: currentBanners,
    default: currentBanners[0]
  }, {
    type: 'input',
    name: 'bannerWidth',
    message: 'Set the width of the banner:',
    default: '300'
  }, {
    type: 'input',
    name: 'bannerHeight',
    message: 'Set the height of the banner:',
    default: '250'
  }, {
    type: 'input',
    name: 'bannerName',
    message: 'What is the name of the new format?:',
    default: answer => `${answer.bannerWidth}x${answer.bannerHeight}`,
    filter: answer => answer.replace(/\s+/g, '-')
  }]).then((props) => {
    this.props = _.merge(this.props, props);
    this.props.bannerType = this.props.bannerFramework = (isCreatejsBanner('./src/' + this.props.bannerMaster)) ? 'CREATEJS' : 'DOM';
    this.props.includeLegalBar = isRequireLegalBar('./src/' + this.props.bannerMaster);
  });
};
