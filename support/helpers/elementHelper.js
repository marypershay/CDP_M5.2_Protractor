'use strict';

class ElementHelper {

    waitForVisibilityOf(element, timeOut) {
        const timeoutMs = timeOut || browser.params.defaultTimeOut;
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element), timeoutMs,
            `Waiting for visibilityOf of ${element.locator()} failed`);
    }

    waitForInVisibilityOf(element, timeOut) {
        const timeoutMs = timeOut || browser.params.defaultTimeOut;
        return browser.wait(protractor.ExpectedConditions.invisibilityOf(element), timeoutMs,
            `Waiting for invisibilityOf of ${element.locator()} failed`);
    }

    scrollAndWaitAndClick(element, top, timeOut) {
        const timeOutMs = timeOut || browser.params.defaultTimeOut;
        return this.waitForVisibilityOf(element, 5000).then(() => {
            return element.getLocation().then((navDivLocation2) => {
                let currTop = navDivLocation2.y;
                const currLeft = navDivLocation2.x;
                currTop -= top || 400;
                return browser.executeScript(`window.scrollTo(${currLeft}, ${currTop});`);
            });
        }).then(() => {
            return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element), timeOutMs,
                `Waiting for element to be clickable of ${element.locator()} failed`);
        }).then(() => {
            return element.click();
        });
    }

    setTextInputByValue(textInput, value, needToScroll) {
        return this.scrollAndWaitAndClick(textInput).then(() => {
            return textInput.clear();
        }).then(() => {
            return textInput.sendKeys(value);
        }).then(() => {
            return this.loseFocus(textInput);
        });
    }

    loseFocus(textInput) {
        return element.all(by.css('h2')).filter((el) => {
            return el.isDisplayed();
        }).first().click().then(() => {
            browser.ignoreSynchronization = false;
        }, () => {
            return textInput.sendKeys(protractor.Key.TAB).then(() => {
                browser.ignoreSynchronization = false;
            }, (err) => {
                const errMess = `Error trying to lose focus: ${err.toString()}. Stacktrace: ${err.stack.toString()}`;
                throw errMess;
            });
        });
    }

    getTextInputValue(element) {
        const log = `getTextInputValue element: ${element.locator()}`;
        loggerHelper.info(log);
        return this.scrollToElement(element).then(() => {
            return element.getAttribute('value');
        });
    }
}
module.exports = ElementHelper;