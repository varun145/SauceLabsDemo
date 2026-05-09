import { Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class CartPage extends BasePage {

  readonly cartProduct;

  readonly checkoutButton;

  readonly removeButton;

  readonly cartItems;

  readonly cartItemsContainer;

  constructor(page: Page) {

    super(page);
    this.page = page;
    this.cartProduct = this.page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = this.page.locator('#checkout');
    this.removeButton = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.cartItems = this.page.locator('[data-test="cart-item"]');
    this.cartItemsContainer = this.page.locator('[data-test="cart-list"]');
  }

  getCartProduct() {
    return this.cartProduct;
  }

  getCheckoutButton() {
    return this.checkoutButton;
  }

  async removeProduct() {
    await this.removeButton.click();
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartItemsContainer() {
    return this.cartItemsContainer;
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}