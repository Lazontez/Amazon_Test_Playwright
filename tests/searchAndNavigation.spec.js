const { test, expect } = require('@playwright/test');
import { authentication } from '../helpers/ui_functionality/authentication.js'
import { searchpage } from '../helpers/element_items/searchPage.js';
const searchHelpers = searchpage()
const dotenv = require('dotenv')
dotenv.config()

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.amazon.com/');
  })

test('Validate Search for a Product and Verify Results', async ({page}) =>{
  const searchBox = page.locator('[placeholder="Search Amazon"]');
  const isVisible = await searchBox.isVisible();
  expect(isVisible).toBe(true);
  
})