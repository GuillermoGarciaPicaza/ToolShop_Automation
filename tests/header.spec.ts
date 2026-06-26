import { test, expect } from '@playwright/test';
import { Header } from '../components/Header';

test.describe('Header tests', () => {

  test('The ToolShop icon is visible in the Header', async ({ page }) => {
    const header = new Header(page);
    await page.goto('https://practicesoftwaretesting.com');
    
    await test.step('Verify ToolShop icon is visible', async () => {
      await expect(header.logoButton).toBeVisible();
    });

    await test.step('Home Button is visible', async () => {
      await expect(header.homeButton).toBeVisible();
    });

    await test.step('Categories Dropdown is visible', async () => {
      await expect(header.categoriesDropdown).toBeVisible();
    });

    await test.step('Contact Button is visible', async () => {
      await expect(header.contactButton).toBeVisible();
    });

    await test.step('Sign In Button is visible', async () => {
      await expect(header.signInButton).toBeVisible();
    });

    /*only visible after adding a product to the cart
    await test.step('Cart Button is visible', async () => {
      await expect(header.cartButton).toBeVisible();
    });*/

    await test.step('Language Dropdown is visible', async () => {
      await expect(header.languageDropdown).toBeVisible();
    });
  });

  //test('Cart badge updates after adding a product');

  //test('Cart icon is visible');

});