// @ts-check
const { test, expect } = require('@playwright/test');
import {homePageHelpers} from '../helpers/element_items/homepage'
const homePage = homePageHelpers()
import { signInHelpers } from '../helpers/element_items/signIn';
const signInPage = signInHelpers()

test.beforeEach(async({page})=>{  
  await page.goto('https://www.amazon.com/');
}) 
test('Validate a valid username & password successfully logs in and redirects to homepage', async ({ page }) => {
  // Click on the Sign In button
  await page.locator(homePage.signInSignUpLink()).click()
  // Enter A Valid Email and Password
  await page.waitForLoadState('domcontentloaded')
  await page.locator(signInPage.emailField()).fill("")
  await page.locator(signInPage.continueButton()).last().click()
  await page.waitForLoadState('domcontentloaded')
  await page.locator(signInPage.passwordField()).fill('')
  // Click Submit
  await page.locator(signInPage.signInSubmit()).click()
  await page.waitForLoadState('domcontentloaded')
  // Very page redirects to homepage
  await expect(page).toHaveURL("https://www.amazon.com/?ref_=nav_ya_signin")
});

