import dotenv from 'dotenv'
dotenv.config()

export function datagenerator (){
    return ({
        newEmail:()=>{
            const baseEmail = process.env.Amazon_Email;
            const now =  new Date()
            const reconstructedEmail =  `${baseEmail.slice(0,13)}+${now.getTime()}@gmail.com`
            return reconstructedEmail
        }
    })
}

