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
test('Validate an invalid email displays error', async ({page}) =>{
  const auth = await authentication(page)
  await auth.incorrectEmail()
  await expect(page.getByText('We cannot find an account with that email address')).toBeVisible()
  await page.locator(signInPage.emailField())
  //Navigate to to the homepage
  // Click Sign In
  // Enter invalid username & password
  // Click Submit
  // Verify the error message appears
})
