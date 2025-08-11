import { Page } from "playwright";


export class ProfilePage {
  constructor(private page: Page) {}

  async isCompanyTabVisible(): Promise<boolean> {
    const tab = this.page.getByTestId('tab-Company information');
    return await tab.isVisible();
  }
}
