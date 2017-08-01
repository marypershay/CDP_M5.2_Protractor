'use strict';

const BasePage = require('./BasePage.po.js'),
    PageObjectProvider = require('./PageObjectProvider.js');

var ResultPage = function () {

    this.title = 'Results';
    this.naturalLanguage = element(by.className('natural-language-panel__greeting'));
    this.updateButton = element(by.buttonText('Update results'));
    this.moreButton = element.all(by.partialButtonText('More'));
    this.goToSite = element(by.id('mobile-redirect-a'));

}
PageObjectProvider(ResultPage, BasePage);
module.exports = ResultPage;