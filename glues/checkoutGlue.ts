import { CartPage } from '../pages/CartPage';

import { CheckoutPage } from '../pages/CheckoutPage';

import { Locator } from '@playwright/test';

export class CheckoutGlue {

  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;

  constructor(page: any) {
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  async clickCheckout() {
   await this.cartPage.clickCheckout();
  }

  async enterFirstname(firstname: string) {
   await this.checkoutPage.enterFirstname(firstname);
  }

  async enterLastname(lastname: string) {
   await this.checkoutPage.enterLastname(lastname);
  }

  async enterPostalCode(postalcode: string) {
    await this.checkoutPage.enterPostalCode(postalcode);
  }

  async clickContinue() {
   await this.checkoutPage.clickContinue();
  }

  getOverviewHeader(): Locator {
    return this.checkoutPage.getOverviewHeader();
  }

  getCheckoutProduct(): Locator {
    return this.checkoutPage.getCheckoutProduct();
  }

  async clickFinish() {
    await this.checkoutPage.clickFinish();
  }

  getSuccessMessage(): Locator {
    return this.checkoutPage.getSuccessMessage();
  }
}