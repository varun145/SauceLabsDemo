import { LoginPage } from '../pages/LoginPage';

import { InventoryPage } from '../pages/InventoryPage';

import { Locator } from '@playwright/test';

export class LoginGlue {

  private loginPage: LoginPage;

  private inventoryPage: InventoryPage;

  constructor(page: any) {

    this.loginPage = new LoginPage(page);

    this.inventoryPage = new InventoryPage(page);
  }

  async navigate() {

    await this.loginPage.navigate();
  }

  async login(username: string, password: string) {

    await this.loginPage.login(
      username,
      password
    );
  }

  getErrorMessage(): Locator {

    return this.loginPage.getErrorMessage();
  }

  getSwagLabsLogo(): Locator {

    return this.inventoryPage.getSwagLabsLogo();
  }

  getProductsHeader(): Locator {

    return this.inventoryPage.getProductsHeader();
  }

  getProducts(): Locator {

    return this.inventoryPage.getProducts();
  }
}