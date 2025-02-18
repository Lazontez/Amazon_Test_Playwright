const { test, expect } = require('@playwright/test');
import { authentication } from '../helpers/ui_functionality/authentication.js'
import { searchpage } from '../helpers/element_items/searchPage.js';
import { resultsPage } from '../helpers/element_items/results.js';
const resultsPageHelper = resultsPage()
const searchHelpers = searchpage()
const dotenv = require('dotenv')
dotenv.config()
import {searching} from '../helpers/ui_functionality/search.js'



test.beforeEach(async ({ page }) => {
    await page.goto('https://www.amazon.com/');
  })

test('Validate search for a product and verify results are displayed on page', async ({page}) =>{
  const searchBox = await page.getByPlaceholder('Search Amazon');
  const searchBoxVisible = await searchBox.isVisible();
  await expect(searchBoxVisible).toBe(true);
  const search = await searching(page)
  await search.withInput()
  const moreResultsVisble = await page.locator('[id="nav-search-submit-button"]').isVisible()
  await expect(moreResultsVisble).toBe(true)
  
});
test('Validate user can search and filter products by brand', async ({page}) =>{
  const searchBox = await page.getByPlaceholder('Search Amazon');
  const searchBoxVisible = await searchBox.isVisible();
  await expect(searchBoxVisible).toBe(true);
  const search = await searching(page)
  await search.withInput({inputText: 'PS5'})
  const moreResultsVisble = await page.locator(resultsPageHelper.moreResults).isVisible()
  await expect(moreResultsVisble).toBe(true)
  const brands = await page.getByLabel('Apply PlayStation filter to')
  await brands.click()
  await page.waitForLoadState('load')
  const brandsLocator = page.locator(resultsPageHelper.productTitle); 
  await brandsLocator.first().waitFor({ state: 'visible' });
  const brandTexts = await brandsLocator.allTextContents();
  const brandPattern = /playstation|ps5/i;
  for (const text of brandTexts) {
    console.log(`Title Text: ${text}`)
    expect(text).toMatch(brandPattern);
  }
  
});