import { When, Then } from '@cucumber/cucumber';

import { expect } from '@playwright/test';

import { CheckoutGlue } from '../glues/checkoutGlue';

let checkoutGlue: CheckoutGlue;

When(
  'User clicks checkout button',
  async function () {

    checkoutGlue = new CheckoutGlue(this.page);

    await checkoutGlue.clickCheckout();
  }
);

When(
  'User enters firstname {string}',
  async function (firstname) {

    await checkoutGlue.enterFirstname(firstname);
  }
);

When(
  'User enters lastname {string}',
  async function (lastname) {

    await checkoutGlue.enterLastname(lastname);
  }
);

When(
  'User enters postalcode {string}',
  async function (postalcode) {

    await checkoutGlue.enterPostalCode(postalcode);
  }
);

When(
  'User clicks continue button',
  async function () {

    await checkoutGlue.clickContinue();
  }
);

Then(
  'User should see Overview page',
  async function () {

    const header = checkoutGlue.getOverviewHeader();
    await expect(header).toContainText('Checkout: Overview');
  }
);

Then(
  'Product should be displayed in checkout overview',
  async function () {

    const product = checkoutGlue.getCheckoutProduct();
    await expect(product).toContainText('Sauce Labs Backpack');
  }
);

When(
  'User clicks finish button',
  async function () {

    await checkoutGlue.clickFinish();
  }
);

Then(
  'User should see order success message',
  async function () {

    const message = checkoutGlue.getSuccessMessage();
    await expect(message).toContainText('Thank you for your order!');
  }
);