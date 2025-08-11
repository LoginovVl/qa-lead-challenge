import { Page } from "playwright";

export class DashboardPage {
  constructor(private page: Page) {}

//The hardest part due to userlane js
async closeOnboardingPopup() {
  const log = (...a: any[]) => console.log('[userlane]', ...a);

  // tiny settle for animations
  await this.page.waitForTimeout(300);

  // --- 1) Close the first tour modal (Later / X) ---
  const laterBtn = this.page.locator('[data-usln="player-button-cancel"]'); // "Later"
  const closeX  = this.page.locator('[data-usln="assistant-svg-icon-close"]'); // X "Leave"
  const anyUserlane = this.page.locator('[data-usln]');

  log('userlane nodes (pre) =', await anyUserlane.count());

  // Try "Later"
  if (await laterBtn.first().isVisible().catch(() => false)) {
    log('clicking Later');
    await laterBtn.first().click().catch(e => log('Later click err', e));
    await this.page.waitForTimeout(150);
  } else if (await closeX.first().isVisible().catch(() => false)) {
    // Or close icon if the modal shows only X
    log('clicking Close X on modal');
    await closeX.first().click().catch(e => log('Close (modal) click err', e));
    await this.page.waitForTimeout(150);
  } else {
    // Fallback by role/name
    const laterRole = this.page.getByRole('button', { name: /later/i });
    if (await laterRole.first().isVisible().catch(() => false)) {
      log('clicking Later by role');
      await laterRole.first().click().catch(e => log('Later(role) err', e));
      await this.page.waitForTimeout(150);
    }
  }

  // --- 2) Close the assistant panel (tabpanel with chapters) ---
  const panel = this.page.locator('#usln-p-tab-chapters, [role="tabpanel"]#usln-p-tab-chapters');
  if (await panel.first().isVisible().catch(() => false)) {
    log('assistant panel detected');
    // The same close icon usually exists for the panel as well
    if (await closeX.first().isVisible().catch(() => false)) {
      log('clicking Close X on panel');
      await closeX.first().click().catch(e => log('Close(panel) err', e));
      await this.page.waitForTimeout(150);
    } else {
      // try Escape as a generic panel close
      log('no Close X on panel, pressing Escape');
      await this.page.keyboard.press('Escape').catch(() => {});
      await this.page.waitForTimeout(150);
    }
  }

  // --- 3) Verify overlays are gone; if not, log some context and try one last time ---
  const stillThere = await anyUserlane.count();
  log('userlane nodes (post) =', stillThere);

  if (stillThere > 0) {
    // If anything still visible, log a sample of text to confirm what’s on screen
    const sample = await anyUserlane.first().evaluate(el => el.textContent?.slice(0, 120)).catch(() => null);
    log('sample text:', sample);

    // One more generic attempt: global "Later"/"Close"
    const fallbacks = [
      this.page.getByRole('button', { name: /later|not\s*now|skip/i }).first(),
      this.page.getByRole('button', { name: /close|leave|schließen/i }).first(),
      this.page.locator('[data-usln="assistant-svg-icon-close"]').first(),
    ];
    for (const loc of fallbacks) {
      if (await loc.isVisible().catch(() => false)) {
        log('clicking fallback');
        await loc.click().catch(() => {});
        await this.page.waitForTimeout(150);
        break;
      }
    }
  }
}



async goToProfile() {
     // Step 1: Click the profile icon to open menu
  const profileIcon = this.page.getByTestId('profile-button');
  await profileIcon.waitFor({ state: 'visible' });
  await profileIcon.click();

  // Step 2: Click the Profile menu item
  const profileMenuItem = this.page.getByTestId('profile-settings');
  await profileMenuItem.waitFor({ state: 'visible' });
  await profileMenuItem.click();
    
  }
}
