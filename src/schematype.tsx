import { z } from "zod";


export const SignInData = z.object({
  
    email : z.string().min(1,{
       message :  "email is required"
    }),
    password : z.string().min(1,{
       message :  "Password is required"
    }),
})

export const SignupData = z.object({
  
    email : z.string().min(1,{
       message :  "email is required"
    }),
    password : z.string().min(1 , {
        message : "Password is required"
    }),
    name : z.string().min(1 , {
        message :  "Username is required"
    })

})

