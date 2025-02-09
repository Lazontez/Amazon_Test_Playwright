export function signInHelpers (){
    return ({
        emailField:()=>{
            return "[id='ap_email']"
        }, 
        continueButton:()=>{
            return "[id='continue']"
        },
        customerNameField:()=>{
            return "[id='ap_customer_name']"
        },
        passwordField:()=>{
            return "[id='ap_password']"
        },
        confirmPasswordField:()=>{
            return "[id='ap_password_check']"
        },
        signInSubmit:()=>{
            return "[id='signInSubmit']"
        },
        thereWasaProblemBox:()=>{
            return "[class='a-alert-heading']"
        }, 
        createNewAccountButton:()=>{
            return "[id='createAccountSubmit']"
        },
        reCaptchaId:()=>{
            return "[id='aacb-captcha-header']"
        }
    })
}