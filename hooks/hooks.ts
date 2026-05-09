import {
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber';

import {
  chromium,
  Browser,
  Page,
  BrowserContext
} from '@playwright/test';

setDefaultTimeout(60000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function () {

  // Use headless mode - required for CI/CD environments
  const isHeadless = process.env.CI === 'true' || process.env.HEADLESS !== 'false';

  browser = await chromium.launch({
    headless: isHeadless
  });

  context = await browser.newContext();

  page = await context.newPage();

  this.page = page;
});

After(async function () {

  if (page) {
    await page.close();
  }

  if (context) {
    await context.close();
  }

  if (browser) {
    await browser.close();
  }
});