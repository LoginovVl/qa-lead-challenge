import { Page } from "playwright";

export class SignUpPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(process.env.SIGNUP_URL as string);
  }

  async selectAccountType(type: "personal" | "business") {
    if (type === "personal") {
      await this.page.locator('[data-testid="option-private"] input[type="radio"]').check();
    } else {
      await this.page.locator('[data-testid="option-business"] input[type="radio"]').check();
    }
    await this.page.click('button[data-testid="go-next"]'); // Continue button
  }
}
