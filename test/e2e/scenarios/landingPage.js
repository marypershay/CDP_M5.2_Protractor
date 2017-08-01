'use strict';

var PageFactory = function (page) {
    var pages = {
        'landing': LandingPage,
        'elementHelper': ElementHelper
    };
    if (!pages[page]) {
        throw new Error('Wrong page name: ' + pages[page]);
    }
    return new pages[page]();
};

const LandingPage = require('./po/LandingPage.po.js'),
    ElementHelper = require('../../../support/helpers/elementHelper');

describe('Landing page', () => {
    let landingPage, elementHelper;

    beforeAll(() => {
        landingPage = PageFactory('landing');
        elementHelper = PageFactory('elementHelper');
    });

    beforeEach(() => {
        landingPage.visit();
    });

    it('should present some elements after sign in', () => {
        landingPage.checkPageTitle(landingPage.title);
        elementHelper.scrollAndWaitAndClick(landingPage.signIn);
        elementHelper.setTextInputByValue(landingPage.email, 'active@msm.com');
        elementHelper.setTextInputByValue(landingPage.password, 'pass1234');
        elementHelper.scrollAndWaitAndClick(landingPage.signInButton);
        expect(landingPage.userName.getText()).toBe('Hi Active');
        expect(landingPage.signOut.isDisplayed()).toBe(true);
        elementHelper.waitForVisibilityOf(landingPage.tableActiveQuotes);
        elementHelper.scrollAndWaitAndClick(landingPage.seeResults);
    });
});