import { searchpage } from "../element_items/searchPage"
import { expect } from "@playwright/test"
const searchPageHelpers = searchpage()

export function searching(page) {
    return {
        withInput: async (searchContents) => {
            let data;
            let defaultSearch = 'Apple Watch'
        
            if (!searchContents){
 
                ({ inputText: defaultSearch } = searchContents);
            }
            
            else{
                data = searchContents
            }
            const searchInput = await page.getByPlaceholder(searchPageHelpers.searchField());
            await searchInput.fill(data.inputText);

            // Identify and click the search button
            const searchBtn = await page.locator(searchPageHelpers.searchBtn());
            await searchBtn.click();

            // Wait for navigation to complete
            await page.waitForNavigation({ waitUntil: 'load' });
        }
    };
}
