'use strict';

const BasePage = require('./BasePage.po.js'),
    PageObjectProvider = require('./PageObjectProvider.js');


var LandingPage = function () {

    this.url = '/car-insurance/';
    this.title = 'Compare Cheap Car Insurance Quotes - MoneySuperMarket';
    this.signIn = element(by.className('header__sign-in-nav-button--username'));
    this.email = element(by.model('signInData.email'));
    this.password = element(by.model('signInData.password'));
    this.signInButton = element(by.css('.continue-button'));
    this.userName = element(by.linkText('Hi Active'));
    this.signOut = element(by.css("[class*='sign-out-link']"));
    this.tableActiveQuotes = element(by.css('.active-insurance'));
    this.seeResults = element(by.id('btn_see_all_your_results'));
    this.getQuotes = element.all(by.xpath("//a[contains(@title, 'Get a brand new quote')]"));
};

PageObjectProvider(LandingPage, BasePage);
module.exports = LandingPage;