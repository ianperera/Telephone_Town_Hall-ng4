import { ConfctluiPage } from './app.po';

describe('confctlui App', () => {
  let page: ConfctluiPage;

  beforeEach(() => {
    page = new ConfctluiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
