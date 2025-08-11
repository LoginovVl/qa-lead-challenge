import { Then, When, Given } from "@cucumber/cucumber";
import { BasePage } from "../pages/base.page";

When("I accept cookies settings", async function (this: any) {
  const base = new BasePage(this.page);
  await base.acceptCookiesIfPresent(); 
});

