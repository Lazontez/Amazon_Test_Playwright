const { test, expect } = require('@playwright/test');
import { authentication } from '../helpers/ui_functionality/authentication.js'
import { searchpage } from '../helpers/element_items/searchPage.js';
import { resultsPage } from '../helpers/element_items/results.js';
const searchHelpers = searchpage()
const dotenv = require('dotenv')
dotenv.config()
import {searching} from '../helpers/ui_functionality/search.js'



test.beforeEach(async ({ page }) => {
    await page.goto('https://www.amazon.com/');
  })

test('Validate Search for a Product and Verify Results', async ({page}) =>{
  const searchBox = await page.getByPlaceholder('Search Amazon');
  const searchBoxVisible = await searchBox.isVisible();
  await expect(searchBoxVisible).toBe(true);
  const search = await searching(page)
  await search.withInput()
  const moreResultsVisble = await page.locator('[id="nav-search-submit-button"]').isVisible()
  await expect(moreResultsVisble).toBe(true)
  
})