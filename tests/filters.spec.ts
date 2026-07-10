import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Product Filters', () => {

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });

  test('Filter by checkbox', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  
  await home.checkFilter('Wrench');
  const products = await home.getProducts();
  for (const p of products) {
    expect(p.tags).toContain('Wrench');
    }
  });


  test('Filter by price slider', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    // adjust min value to 15
    await home.sliderMin.focus();

    // slider starts at 1
    for (let i = 1; i < 15; i++) {
      await page.keyboard.press('ArrowRight');
    }

    // adjust max value to 29
    await home.sliderMax.focus();

    //slider starts at 100
    for (let i = 0; i < 71; i++) { // 100 - 29 = 71
      await page.keyboard.press('ArrowLeft');
    }

    // verification
    const minValue = Number(await home.sliderMin.getAttribute('aria-valuenow'));
    const maxValue = Number(await home.sliderMax.getAttribute('aria-valuenow'));

    expect(minValue).toBe(15);
    expect(maxValue).toBe(29);
    expect(minValue).toBeLessThan(maxValue);
  });

  test('Search by product name', async ({ page }) => {

    await page.getByPlaceholder('Search').fill('Hammer');

    await page.getByRole('button', { name: 'Search' }).click();

    const cards = page.locator('[data-test="product-card"]');

    await expect(cards.first()).toBeVisible();

    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toContainText(/Hammer/i);
    }

  });

  test('Combine category and brand filters', async ({ page }) => {

    await page.getByLabel('Category').selectOption('Hammer');

    await page.getByLabel('Brand').selectOption('ForgeFlex');

    const cards = page.locator('[data-test="product-card"]');

    await expect(cards.first()).toBeVisible();

    const count = await cards.count();

    for (let i = 0; i < count; i++) {

      await expect(cards.nth(i)).toContainText('Hammer');
      await expect(cards.nth(i)).toContainText('ForgeFlex');

    }

  });

  test('Clear filters restores product list', async ({ page }) => {

    const initialCount = await page.locator('[data-test="product-card"]').count();

    await page.getByLabel('Category').selectOption('Hammer');

    await page.getByRole('button', { name: 'Reset Filters' }).click();

    await expect(page.locator('[data-test="product-card"]'))
      .toHaveCount(initialCount);

  });

});