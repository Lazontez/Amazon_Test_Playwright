import { searchpage } from "../element_items/searchPage"
import { expect } from "@playwright/test"
const searchPageHelpers = searchpage()

export function searching(page) {
    return {
        withInput: async () => {
            const searchInput = await page.getByPlaceholder(searchPageHelpers.searchField());
            await searchInput.fill('Apple Watch');

            // Identify and click the search button
            const searchBtn = await page.locator(searchPageHelpers.searchBtn());
            await searchBtn.click();

            // Wait for navigation to complete
            await page.waitForNavigation({ waitUntil: 'load' });
        }
    };
}
