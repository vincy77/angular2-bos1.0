import { Angular2Bos1.0Page } from './app.po';

describe('angular2-bos1.0 App', () => {
  let page: Angular2Bos1.0Page;

  beforeEach(() => {
    page = new Angular2Bos1.0Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
