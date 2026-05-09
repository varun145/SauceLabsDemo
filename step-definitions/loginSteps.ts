import { Given, When, Then } from '@cucumber/cucumber';

import { expect } from '@playwright/test';

import { LoginGlue } from '../glues/loginGlue';

let loginGlue: LoginGlue;

Given(
  'User launches SauceDemo application',
  async function () {

    loginGlue = new LoginGlue(this.page);

    await loginGlue.navigate();
  }
);

When(
  'User enters username {string} and password {string}',
  async function (username, password) {

    await loginGlue.login(username, password);
  }
);

Then(
  'User should see {string}',
  async function (result) {

    if (result === 'inventory') {

      await expect(this.page).toHaveURL(/inventory/);

    } else {

      const errorMsg = loginGlue.getErrorMessage();
      await expect(errorMsg).toContainText(result);
    }
  }
);

Then(
  'User should see Swag Labs logo',
  async function () {

    const logo = loginGlue.getSwagLabsLogo();
    await expect(logo).toContainText('Swag Labs');
  }
);

Then(
  'User should see Products header',
  async function () {

    const header = loginGlue.getProductsHeader();
    await expect(header).toContainText('Products');
  }
);

Then(
  'Products should be displayed',
  async function () {

    const products = loginGlue.getProducts();
    await expect(products).toHaveCount(6);
  }
);