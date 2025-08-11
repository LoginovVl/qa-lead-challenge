import { Then, When } from "@cucumber/cucumber";
import { DashboardPage } from "../pages/dashboard.page";

let dashboardPage: DashboardPage;

Then("I should be redirected to the dashboard", async function () {
  dashboardPage = new DashboardPage(this.page);
  await this.page.waitForURL(/.*app\.ninox\.com.*/);
});

When("I close the onboarding popup", async function () {
  await dashboardPage.closeOnboardingPopup();
});

When("I open the profile screen", async function () {
  await dashboardPage.goToProfile();
});
