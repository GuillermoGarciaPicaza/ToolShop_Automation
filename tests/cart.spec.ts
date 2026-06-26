import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Operations in cart page', () =>
  test('Add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cart = new CartPage(page);

    //we land in the homepage
    await test.step('Navigation to the HomePage', async() => {
      await homePage.goto();
    })

    //search for a product and open the detailed page
    await test.step('Search and open product details', async () => {
      await homePage.searchProduct('Claw Hammer with Shock Reduction Grip');
      await homePage.openProduct('Claw Hammer with Shock Reduction Grip');
    });

    //click the add to cart button
    await test.step('Add product to cart', async () => {
      await productPage.setQuantity(2);
      await productPage.addToCart();
    });
    

    /* await homePage.searchProduct('Thor Hammer');
    await homePage.openProduct('Thor Hammer'); */

    
    //await productPage.addToCart();

    //await page.goto('https://practicesoftwaretesting.com/checkout/cart');

    //assertion to check the number of items in cart after adding. The number between the parenthesis has to be one unit lower than the expected number.
    expect(await cart.getItemsCount()).toBe(1);
    await page.goto('https://practicesoftwaretesting.com/checkout/cart');
    await cart.clearCart();
  }));