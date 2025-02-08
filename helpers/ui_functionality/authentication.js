import { homePageHelpers } from '../element_items/homepage.js'
const homePage = homePageHelpers()
import { signInHelpers } from '../element_items/signIn.js';
import { datagenerator } from '../utils/data_generator.js';
import { expect } from '@playwright/test';
const dataGenerator = datagenerator()

const signInPage = signInHelpers()
const dotenv = require('dotenv')
dotenv.config()

export function authentication(page) {
    return ({

        login: async () => {
            // Click on the Sign In button
            await page.locator(homePage.signInSignUpLink()).click()
            // Enter A Valid Email and Password
            await page.waitForSelector(signInPage.emailField())
            await page.locator(signInPage.emailField()).fill(process.env.Amazon_Email)
            await page.locator(signInPage.continueButton()).last().click()
            await page.waitForSelector(signInPage.passwordField())
            await page.locator(signInPage.passwordField()).fill(process.env.Amazon_Password)
            // Click Submit
            await page.locator(signInPage.signInSubmit()).click()
            await page.waitForNavigation({ waitUntil: 'domcontentloaded' })

        },
        incorrectEmail: async () => {        
            // Click Sign In
            await page.locator(homePage.signInSignUpLink()).click()
            // Enter invalid email
            await page.waitForSelector(signInPage.emailField())
            await page.locator(signInPage.emailField()).fill('ThisEmailisIncorrect@grwe.com')
            // Click Submit
            await page.locator(signInPage.continueButton()).last().click()
            await page.waitForSelector(signInPage.thereWasaProblemBox())
        }, 
        incorrectPassword: async()=>{
            // Find Field 
            await page.waitForSelector(signInPage.passwordField())
            await page.locator(signInPage.passwordField()).fill("NoWayJose123901@")
            // Click Submit
            await page.locator(signInPage.signInSubmit()).click()
            await page.waitForSelector(signInPage.thereWasaProblemBox())

        },
        registerNewAccount: async()=>{
              // Click on the Sign In button
              await page.locator(homePage.signInSignUpLink()).click()
              await page.waitForSelector(signInPage.createNewAccountButton())
              await page.locator((signInPage.createNewAccountButton())).click()
              const createAccountHeading = await page.getByText('Create account')
              await expect(createAccountHeading).toBeVisible();
              await page.locator(signInPage.customerNameField()).fill('Johnathon Doe');
              await page.locator(signInPage.emailField()).fill(dataGenerator.newEmail());
              await page.locator(signInPage.passwordField()).fill(process.env.Amazon_Password);
              await page.locator(signInPage.confirmPasswordField()).fill(process.env.Amazon_Password);
              await page.locator(signInPage.continueButton()).click()
              await page.waitForNavigation({ waitUntil: 'networkidle' }); 
        }
    })
}