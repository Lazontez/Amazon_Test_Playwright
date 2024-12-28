// @ts-check
const { test, expect } = require('@playwright/test');
import { signInHelpers } from '../helpers/element_items/signIn.js';
const signInPage = signInHelpers()
import {authentication}  from '../helpers/ui_functionality/authentication.js'
const dotenv = require('dotenv')
dotenv.config()

test.beforeEach(async({page})=>{  
  await page.goto('https://www.amazon.com/');
}) 
test('Validate a valid username & password successfully logs in and redirects to homepage', async ({ page }) => {
  const auth = await authentication(page)
  await auth.login()
  // Verify page redirects to homepage
  await expect(page).toHaveURL("https://www.amazon.com/?ref_=nav_ya_signin")
});
test('Validate an invalid email & password displays error', async ({page}) =>{
  const auth = await authentication(page)
  // Enter invalid email and. Cbeck Error and Enter Correct Email
  await auth.incorrectEmail()
  await expect(page.getByText('We cannot find an account with that email address')).toBeVisible()
  await page.locator(signInPage.emailField()).fill("darenchanelei@gmail.com")
  // Click Continue Button
  await page.locator(signInPage.continueButton()).last().click()
  // Click Submit
  await auth.incorrectPassword()
  // Verify the error message appears
  await expect(page.getByText('Your password is incorrect')).toBeVisible()
  // Correcting Password and submitting
  await page.locator(signInPage.passwordField()).fill("ky_4D:6jfUKx8An")
  // Click Submit
  await page.locator(signInPage.signInSubmit()).click()
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  // Verify page redirects to homepage
  await expect(page).toHaveURL("https://www.amazon.com/?ref_=nav_ya_signin")

});
