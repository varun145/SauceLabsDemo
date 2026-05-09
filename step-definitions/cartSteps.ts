import { When, Then } from '@cucumber/cucumber';

import { expect } from '@playwright/test';

import { CartGlue } from '../glues/cartGlue';

let cartGlue: CartGlue;

When('User adds backpack product to cart', async function () {

  cartGlue = new CartGlue(this.page);
  await cartGlue.addBackpackToCart();
});


When('User clicks cart icon', async function () {
  await cartGlue.clickCartIcon();
});

Then('User should navigate to cart page', async function () {
  await expect(this.page).toHaveURL(/cart/);
});

Then('Product should be visible in cart', async function () {
  const product = cartGlue.getCartProduct();
  await expect(product).toContainText('Sauce Labs Backpack');
});

Then('Checkout button should be visible', async function () {
  const button = cartGlue.getCheckoutButton();
  await expect(button).toBeVisible();
  }
);

When('User removes product from cart', async function () {
  await cartGlue.removeProduct();
  }
);

Then('Cart should be empty', async function () {
  const items = cartGlue.getCartItems();
   await expect(items).toHaveCount(0);
  }
);