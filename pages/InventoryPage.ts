import { Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

  readonly swagLabsLogo;

  readonly productsHeader;

  readonly products;

  readonly addBackpackButton;

  readonly cartIcon;

  readonly cartBadge;

  constructor(page: Page) {

    super(page);
    this.page = page;
    this.swagLabsLogo = this.page.locator('.app_logo');
    this.productsHeader = this.page.locator('.title');
    this.products = this.page.locator('[data-test="inventory-item"]');
    this.addBackpackButton = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartIcon = this.page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  }

  getSwagLabsLogo() {
    return this.swagLabsLogo;
  }

  getProductsHeader() {
    return this.productsHeader;
  }

  getProducts() {
    return this.products;
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

  async getCartBadge() {
    return this.cartBadge;
  }
}