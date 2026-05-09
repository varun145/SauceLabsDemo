import {
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber';

import {
  chromium,
  Browser,
  Page
} from '@playwright/test';

setDefaultTimeout(60000);

let browser: Browser | undefined;
let page: Page | undefined;

Before(async function () {
  browser = await chromium.launch({
    headless: true  // Changed to true for CI environments
  });

  const context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
});

After(async function () {
  if (page) {
    await page.close();
  }
  
  if (browser) {
    await browser.close();
  }
});