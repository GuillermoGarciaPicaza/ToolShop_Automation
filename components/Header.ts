// Header is a component and not a page because it's present in every other page, it doesn't have a unique URL
import { Page, Locator } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly logoButton: Locator;
  readonly homeButton: Locator;
  readonly categoriesDropdown: Locator;
  readonly contactButton : Locator;
  readonly signInButton: Locator;
  readonly cartButton: Locator; 
  readonly cartQuantityBadge: Locator;
  readonly languageDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoButton = page.getByRole('link', { name: 'Practice Software Testing -' });
    this.homeButton = page.locator('[data-test="nav-home"]');
    this.categoriesDropdown = page.locator('[data-test="nav-categories"]');
    this.contactButton = page.locator('[data-test="nav-contact"]');
    this.signInButton = page.locator('[data-test="nav-sign-in"]');
    this.cartButton = page.locator('[data-test="nav-cart"]');
    this.cartQuantityBadge = page.locator('.cart-quantity');
    this.languageDropdown = page.locator('[data-test="language-select"]');
  }

  async clickLogo() {
    await this.logoButton.click();
  }

  async clickHome() {
    await this.homeButton.click();
  }

  async clickCategories() {
    await this.categoriesDropdown.click();
  }

  async clickContact() {
    await this.contactButton.click();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickCart() {
    await this.cartButton.click();
  }

  async getCartCount() {
    return Number(await this.cartQuantityBadge.textContent());
  }

  async clickLanguage() {
    await this.languageDropdown.click();
  }
}