import { Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  readonly usernameInput;

  readonly passwordInput;

  readonly loginButton;

  readonly errorMessage;

  readonly url = 'https://www.saucedemo.com/';

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.usernameInput = this.page.locator('#user-name');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.errorMessage = this.page.locator('[data-test="error"]');
    this.url = 'https://www.saucedemo.com/';
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}