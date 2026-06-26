import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButtons = page.locator('[data-test="remove"]');

    this.checkoutButton = page.getByRole('button', {
      name: /checkout/i
    });

    this.cartItems = page.locator('tbody tr');
  }
  

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getItemsCount() {
    return await this.cartItems.count();
  }

  async clearCart() {
    while (await this.deleteButtons.count() > 0) {
      await this.deleteButtons.first().click();
      await this.page.waitForTimeout(300);
    }
  }
}