import { Locator, Page } from '@playwright/test';
import { Header } from '../components/Header';

export class HomePage {
  //create objects to important elements of the page
  readonly page: Page;
  readonly header: Header;
  readonly searchInput: Locator;
  readonly productCards: Locator;
  readonly categoryFilters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.searchInput = page.getByPlaceholder('Search');
    this.productCards = page.locator('[data-test="product-card"]');
    this.categoryFilters = page.locator('.checkbox');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com');
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
  }

  async openProduct(productName: string) {
    await this.page.getByText(productName).click();
  }

  async filterByCategory(category: string) {
    await this.page.getByLabel(category).check();
  }
}