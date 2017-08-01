'use strict';

const BasePage = require('./BasePage.po.js'),
    PageObjectProvider = require('./PageObjectProvider.js');

var HighImpactPage = function () {

    this.title = 'Question Set';
    this.url = 'shop/car-insurance/questionset/#?step=highimpactquestions';
    this.continue = element(by.partialButtonText('Continue'));
    this.dateOfBirth = element.all(by.css("[id='policyHolder.dateOfBirth'] input"));

}
PageObjectProvider(HighImpactPage, BasePage);
module.exports = HighImpactPage;
