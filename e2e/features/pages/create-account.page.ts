import { Page, expect } from "playwright/test";

export class CreateAccountPage {
  constructor(private page: Page) {}

  async fillPersonalDetails(email: string, password: string) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('button[data-testid="create-account"]');
  }

  async fillBusinessDetails(
    name: string,
    company: string,
    employees: string, // e.g. "10-50"
    country: string,   // e.g. "DE" or "Germany" depending on UI
    phone: string
  ) {
    await this.page.fill('input[id="fullName"]', name);
    await this.page.fill('input[id="company"]', company);

    // Employees: custom combobox next to hidden input[name="numberOfEmployees"]
    await this.selectCustomComboboxByHiddenName('numberOfEmployees', employees);

    // Country: try native select first, otherwise custom combobox by hidden name
    const nativeCountry = this.page.locator('select[id="country"], select[name="country"]');
    if (await nativeCountry.count()) {
      await nativeCountry.selectOption(country);
    } else {
      await this.selectCustomComboboxByHiddenName('country', country);
    }

    await this.page.fill('input[id="telephone"]', phone);

    // Save
    await this.page.click('button[data-testid="save-profile"]');
  }

  /**
   * Selects an option in a custom combobox built as:
   *   <input role="combobox" ...>
   *   <input name="<hiddenName>" aria-hidden="true" ...>  (hidden backing field)
   * We find the combobox input that is immediately followed by that hidden field.
   */
  private async selectCustomComboboxByHiddenName(hiddenName: string, optionLabel: string) {
    const combo = this.page.locator(
      `input[role="combobox"]:has(~ input[name="${hiddenName}"])`
    );

    await expect(combo).toBeVisible({ timeout: 5000 });
    await combo.click();

    // Wait for listbox to appear and pick option by visible text
    const listbox = this.page.getByRole('list');
    await listbox.waitFor({ state: 'visible', timeout: 5000 });

    // Click the matching option
    await this.page.getByRole('option', { name: optionLabel }).click()
      .catch(async () => {
        // Fallback: type to filter then Enter
        await combo.fill(optionLabel);
        await combo.press('Enter');
      });

    // Give the UI a moment to update the hidden input value
    await this.page.waitForTimeout(100);
  }
}


