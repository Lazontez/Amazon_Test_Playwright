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
  // Verify page redirects to homepage or recaptcha is triggered
  const currentUrl = page.url();
  expect(currentUrl).toMatch(
    /https:\/\/www\.amazon\.com\/ap\/cvf\/request\?arb=[0-9a-fA-F-]+|https:\/\/www\.amazon\.com\/\?ref_=nav_ya_signin/
);
});
test('Validate an invalid email & password displays error', async ({page}) =>{
  const auth = await authentication(page)
  // Enter invalid email and. Cbeck Error and Enter Correct Email
  await auth.incorrectEmail()
  await expect(page.getByText('We cannot find an account with that email address')).toBeVisible()
  await page.locator(signInPage.emailField()).fill("")
  // Click Continue Button
  await page.locator(signInPage.continueButton()).last().click()
  // Click Submit
  await auth.incorrectPassword()
  // Verify the error message appears
  await expect(page.getByText('Your password is incorrect')).toBeVisible()
  // Correcting Password and submitting
  await page.locator(signInPage.passwordField()).fill("")
  // Click Submit
  await page.locator(signInPage.signInSubmit()).click()
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  // Verify page redirects to homepage or recaptcha is triggered
  const currentUrl = page.url();
  expect(currentUrl).toMatch(
    /https:\/\/www\.amazon\.com\/ap\/cvf\/request\?arb=[0-9a-fA-F-]+|https:\/\/www\.amazon\.com\/\?ref_=nav_ya_signin/
);

});
test('Validate a new user can register successfully with all required fields entered correctly', async({page})=>{
  const auth = await authentication(page)
  await auth.registerNewAccount()
    // Verify recaptcha is triggered
  await expect(page).toHaveURL(/https:\/\/www\.amazon\.com\/ap\/cvf\/request\?arb=[0-9a-fA-F-]+/);
});
test('Validate attempt to register an email or username that already exists', async({page})=>{
  const auth = await authentication(page);
  await auth.registerDuplicateEmail();
  const duplicateEmailMsg = await page.getByText('There\'s already an account')
  await expect(duplicateEmailMsg).toBeVisible({visible:true})
})
