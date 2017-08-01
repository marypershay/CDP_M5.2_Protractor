'use strict';

var BasePage = function () {
    this.footer = element(by.css('.footer'));
}

BasePage.prototype.visit = function () {
    return browser.get('http://www.ci1-cms.gb.moneysupermarket.com/' + this.url);
}

BasePage.prototype.checkPageTitle = function (pageTitle) {
    return this.getPageTitle().then((title) => {
        return title === pageTitle;
    });
}

BasePage.prototype.getPageTitle = function () {
    return browser.getTitle();
}

module.exports = BasePage;