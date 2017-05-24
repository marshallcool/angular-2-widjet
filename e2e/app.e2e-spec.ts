import { LeaderBoardPage } from './app.po';

describe('leader-board App', () => {
  let page: LeaderBoardPage;

  beforeEach(() => {
    page = new LeaderBoardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
