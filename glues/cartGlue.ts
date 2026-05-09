import { InventoryPage } from '../pages/InventoryPage';

import { CartPage } from '../pages/CartPage';

import { Locator } from '@playwright/test';

export class CartGlue {

  inventoryPage;

  cartPage;

  constructor(page: any) {

    this.inventoryPage = new InventoryPage(page);

    this.cartPage = new CartPage(page);
  }

  async addBackpackToCart() {

    await this.inventoryPage.addBackpackToCart();
  }

  async clickCartIcon() {

    await this.inventoryPage.clickCartIcon();
  }

  getCartProduct(): Locator {

    return this.cartPage.getCartProduct();
  }

  getCheckoutButton(): Locator {

    return this.cartPage.getCheckoutButton();
  }

  async removeProduct() {

    await this.cartPage.removeProduct();
  }

  getCartItems(): Locator {

    return this.cartPage.getCartItems();
  }

  getCartItemsContainer(): Locator {

    return this.cartPage.getCartItemsContainer();
  }
}