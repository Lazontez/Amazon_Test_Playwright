import { homePageHelpers } from '../element_items/homepage.js'
const homePage = homePageHelpers()
import { signInHelpers } from '../element_items/signIn.js';
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

            
            // Verify the error message appears
        }
    })
}