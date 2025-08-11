import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser} from 'playwright';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();

//Due to cucumbre use we need some timeout since playwright is too speedy
setDefaultTimeout(30_000);

let browser: Browser;


Before(async function (this: any) {
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.HEADLESS === 'false' ? 100 : 0,
  });

  const context = await browser.newContext();
  this.page = await context.newPage();

  // Unique per-scenario user data
  // Use a domain you control for test or a catch-all. Timestamp keeps it unique.
  const ts = Date.now();
  this.email = `qa_${ts}_${faker.string.alphanumeric(6)}@example.com`;
  this.password = 'Password123!';

});

After(async function () {
  await this.page?.close();
  await browser?.close();

  //ideally we should also have after step to API remove just created user to not spam DB.
});

