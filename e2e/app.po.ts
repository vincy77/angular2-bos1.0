import { browser, by, element } from 'protractor';

export class Angular2Bos1.0Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
