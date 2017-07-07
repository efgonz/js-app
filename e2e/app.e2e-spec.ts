import { JsAppPage } from './app.po';

describe('js-app App', () => {
  let page: JsAppPage;

  beforeEach(() => {
    page = new JsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
