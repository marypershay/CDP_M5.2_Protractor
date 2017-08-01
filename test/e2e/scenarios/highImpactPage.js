'use strict';

var PageFactory = function (page) {
    var pages = {
        'landing': LandingPage,
        'elementHelper': ElementHelper,
        'highImpactPage': HighImpactPage
    };
    if (!pages[page]) {
        throw new Error('Wrong page name: ' + pages[page]);
    }
    return new pages[page]();
};

const LandingPage = require('./po/LandingPage.po.js'),
    HighImpactPage = require('./po/HighImpactPage.po.js'),
    ElementHelper = require('../../../support/helpers/elementHelper');

describe('High Impact page', () => {
    let landingPage, highImpactPage, elementHelper;

    beforeAll(() => {
        landingPage = PageFactory('landing');
        elementHelper = PageFactory('elementHelper');
        highImpactPage = PageFactory('highImpactPage');
    });

    beforeEach(() => {
        landingPage.visit();
        elementHelper.scrollAndWaitAndClick(landingPage.getQuotes.get(1));
    });

    it('should set date of birthday', () => {
        highImpactPage.checkPageTitle('Question Set');
        elementHelper.waitForVisibilityOf(highImpactPage.continue);
        highImpactPage.dateOfBirth.each((element) => {
            elementHelper.setTextInputByValue(element);
            elementHelper.setTextInputByValue(element, '12');
            expect(helper.getTextInputValue(element)).toBe('12');
        });
    });
});