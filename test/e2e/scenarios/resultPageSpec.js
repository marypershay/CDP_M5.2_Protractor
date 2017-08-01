'use strict';

var PageFactory = function (page) {
    var pages = {
        'landing': LandingPage,
        'elementHelper': ElementHelper,
        'resultPage': ResultPage
    };
    if (!pages[page]) {
        throw new Error('Wrong page name: ' + pages[page]);
    }
    return new pages[page]();
};

const ResultPage = require('./po/ResultPage.po.js'),
    LandingPage = require('./po/LandingPage.po.js'),
    ElementHelper = require('../../../support/helpers/elementHelper');

describe('Result page', () => {
    let resultPage, landingPage, elementHelper;

    beforeAll(() => {
        resultPage = PageFactory('resultPage');
        landingPage = PageFactory('landing');
        elementHelper = PageFactory('elementHelper');
        landingPage.visit();
        elementHelper.scrollAndWaitAndClick(landingPage.signIn);
        elementHelper.setTextInputByValue(landingPage.email, 'active@msm.com');
        elementHelper.setTextInputByValue(landingPage.password, 'pass1234');
        elementHelper.scrollAndWaitAndClick(landingPage.signInButton);
        elementHelper.waitForVisibilityOf(landingPage.seeResults);
        elementHelper.scrollAndWaitAndClick(landingPage.seeResults);
    });

    it('should display go to site button on the slider', () => {
        resultPage.checkPageTitle(resultPage.title);
        elementHelper.waitForVisibilityOf(resultPage.naturalLanguage);
        expect(resultPage.updateButton.isPresent()).toBe(true);
        expect(resultPage.updateButton.isDisplayed()).toBe(false);
        elementHelper.scrollAndWaitAndClick(resultPage.moreButton.get(0));
        elementHelper.waitForVisibilityOf(resultPage.goToSite);
    });


});