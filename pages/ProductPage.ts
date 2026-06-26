import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly increaseQuantityButton: Locator;
  readonly decreaseQuantityButton: Locator;
  readonly quantityInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addToCartButton = page.locator('[id="btn-add-to-cart"]');
    this.increaseQuantityButton = page.locator('#btn-increase-quantity');
    this.decreaseQuantityButton = page.locator('#btn-decrease-quantity');
    this.quantityInput = page.locator('#quantity');
  }

  async increaseQuantity(times: number) {
    for (let i = 0; i < times; i++) {
      await this.increaseQuantityButton.click();
    }
  }

  async setQuantity(quantity: number) {
    for (let i = 1; i < quantity; i++) {
      await this.increaseQuantityButton.click();
    }
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}