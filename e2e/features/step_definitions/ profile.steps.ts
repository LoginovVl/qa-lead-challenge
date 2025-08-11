import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ProfilePage } from "../pages/profile.page";

Then("I should be redirected to the Profile page", async function () {
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent("page"), // wait for new tab
    // whatever action triggered opening the Profile page already happened in a previous step
  ]);

  await newPage.waitForLoadState();
  await newPage.waitForURL(/.*q-admin\.ninox\.com\/profile.*/);

  // Optional: replace current page reference with new tab
  this.page = newPage;
});


Then("the Company Information tab should be visible in the profile", async function () {
  const profile = new ProfilePage(this.page);
  expect(await profile.isCompanyTabVisible()).toBe(true);
});

Then("the Company Information tab should NOT be visible in the profile", async function () {
  const profile = new ProfilePage(this.page);
  expect(await profile.isCompanyTabVisible()).toBe(false);
});
