export function signInHelpers (){
    return ({
        emailField:()=>{
            return "[id='ap_email']"
        }, 
        continueButton:()=>{
            return "[id='continue']"
        },
        passwordField:()=>{
            return "[id='ap_password']"
        },
        signInSubmit:()=>{
            return "[id='signInSubmit']"
        }
    })
}