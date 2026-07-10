import { Locator, Page } from '@playwright/test';
import { Header } from '../components/Header';

export class HomePage {
  //create objects to important elements of the page
  readonly page: Page;
  readonly header: Header;
  readonly sliderMin: Locator;
  readonly sliderMax: Locator;
  readonly searchInput: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.sliderMin = page.getByRole('slider', { name: 'ngx-slider', exact: true });
    this.sliderMax = page.getByRole('slider', { name: 'ngx-slider-max' })
    this.searchInput = page.getByPlaceholder('Search');
    this.productCards = page.locator('[data-test="product-card"]');
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

  async checkFilter(label: string) {
    await this.page.locator(`label:has-text("${label}")`).click();
  }

  async getProducts() {
    const cards = await this.productCards.all();
    const products = [];

    for (const card of cards) {
      const tags = await card.locator('.product-tags span').allTextContents();
      products.push({ tags });
    }

    return products;
  }
}