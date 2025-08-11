import { Given, When } from "@cucumber/cucumber";
import { SignUpPage } from "../pages/signup.page";
import { CreateAccountPage } from "../pages/create-account.page";
import { faker } from "@faker-js/faker";

let signUpPage: SignUpPage;
let createAccountPage: CreateAccountPage;


Given("I navigate to the sign up page", async function () {
  signUpPage = new SignUpPage(this.page);
  createAccountPage = new CreateAccountPage(this.page);
  await signUpPage.goto();
});

When('I select {string} account type', async function (type: string) {
  await signUpPage.selectAccountType(type as "personal" | "business");
});

When("I enter personal account details", async function (this: any) {
  await createAccountPage.fillPersonalDetails(this.email, this.password);
});

When("I enter business account details", async function () {
  await createAccountPage.fillBusinessDetails(
    faker.person.fullName(),
    faker.company.name(),
    "10 - 49",
    "Germany",
    faker.phone.number()
  );
});
