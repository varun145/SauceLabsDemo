import { Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

  readonly firstNameInput;

  readonly lastNameInput;

  readonly postalCodeInput;

  readonly continueButton;

  readonly overviewHeader;

  readonly checkoutProduct;

  readonly finishButton;

  readonly successMessage;

  constructor(page: Page) {

    super(page);
    this.page = page;
    this.firstNameInput = this.page.locator('#first-name');
    this.lastNameInput = this.page.locator('#last-name');
    this.postalCodeInput = this.page.locator('#postal-code');
    this.continueButton = this.page.locator('#continue');
    this.overviewHeader = this.page.locator('.title');
    this.checkoutProduct = this.page.locator('[data-test="inventory-item-name"]');
    this.finishButton = this.page.locator('#finish');
    this.successMessage = this.page.locator('[data-test="complete-header"]');
  }

  async enterFirstname(firstname: string) {
    await this.firstNameInput.fill(firstname);
  }

  async enterLastname(lastname: string) {
    await this.lastNameInput.fill(lastname);
  }

  async enterPostalCode(postalcode: string) {

    await this.postalCodeInput.fill(postalcode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  getOverviewHeader() {
    return this.overviewHeader;
  }

  getCheckoutProduct() {
    return this.checkoutProduct;
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  getSuccessMessage() {
    return this.successMessage;
  }
}