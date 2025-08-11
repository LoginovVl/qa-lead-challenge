import { Page } from "playwright";

export class BasePage {
  constructor(private page: Page) {}

  /**
   * Accept cookie banner if it appears.
   * Tries several common selectors/texts, but does nothing if not present.
   */
  async acceptCookiesIfPresent() {
    // Just a sample of adjusting test for possible different cookes banners since that might be a case in case of different domains.
    const candidates = [
      'button:has-text("Allow all")',
      'button:has-text("Accept All")',
      'button:has-text("Accept")',
      '#onetrust-accept-btn-handler',
      '[data-testid="uc-accept-all-button"]',
      '[aria-label*="Accept"]',
    ];

    for (const sel of candidates) {
      const btn = this.page.locator(sel);
      try {
        if (await btn.first().isVisible({ timeout: 1000 })) {
          await btn.first().click({ trial: false });
          // small wait to let overlay disappear
          await this.page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});
          return;
        }
      } catch {
        // ignore and try next selector
      }
    }

    // Fallback: click any visible button on a cookie dialog role
    const dialogBtn = this.page.locator('[role="dialog"] button:has-text("Allow all")');
    if (await dialogBtn.first().isVisible({ timeout: 1000 }).catch(() => false)) {
      await dialogBtn.first().click().catch(() => {});
    }
  }
}
