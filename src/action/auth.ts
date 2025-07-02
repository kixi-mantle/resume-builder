"use server"

import { Types } from "mongoose"
import { comparePassword, createJWT, getVerificationToken, verifyJWT } from "../server/safety"
import { sendVerificationEmail } from "./helper/mailer"
import { connectDB } from "../lib/mongodb"
import User, { IUser } from "../models/User"
import { cookies } from "next/headers"


export const signUp = async (data : {name : string , email : string , password : string}) =>{
    try {
    await connectDB()
    const user = await User.findOne({email : data.email})
    if(user) return {error : true , msg : "user already exist"}
    const newUser = await User.create({...data , passwordHash : data.password})

    if(!newUser) return { error : true , msg : "Unexpected Error happen"}



        const token = await getVerificationToken()
        newUser.emailVerifyToken = token
        newUser.emailVerifyExpires = new Date(Date.now() + 10 * 60 * 1000)
        await newUser.save()

        await sendVerificationEmail(newUser.email! , token , newUser._id.toString())
        return {error : false , msg : "verification sent Successfully"}
    } catch (error) {
        console.error(error)
        return {error : true , msg : "verification"}
    }


}


export const login = async ( {email  , password } : { email : string , password : string  }) =>{
    try {
    await connectDB()
    const user = await User.findOne({email}).select("+passwordHash")
    console.log(user);
    

    if(!user) return { error : true , msg : "Invalid field"}
    const ispasswordMatch = await comparePassword({password , hashedPassword : user.passwordHash!})

    if(!ispasswordMatch){

        return {error : true , msg : "Invalid field"}
    }

        if(!user.isEmailVerified ){
            if(!user.emailVerifyToken || (user.emailVerifyExpires && (Date.now() <= user.emailVerifyExpires.getTime())) )
            {
                  await startVerification(user)
                  return {error : true , msg : 'verification'}
                
            }

        
        }

        const cookieStore = await cookies()


        const token = await createJWT(user._id.toString())

          await  cookieStore.set('session' , token , {
                httpOnly : true,
                maxAge : 60 * 60 * 24 , 
                sameSite : 'lax',
                path:'/'
                
            })

            return {error : false , msg : "Successfully logged in"}



    } catch (error) {
        console.error(error)
        return {error : true , msg : error instanceof Error ? error.message : 'Unknown error'}
    }


}

export async function startVerification(user : IUser){
                const token = await getVerificationToken()
                user.emailVerifyToken = token
                user.emailVerifyExpires = new Date(Date.now() + 10 * 60 * 1000)
                await user.save()
                await sendVerificationEmail(user.email! , token , user._id.toString())
              
}

export const verifyEmail = async({token , id}:{token : string , id : string}) =>{

    try {
        await connectDB()
        console.log(" this is token " , token)
        console.log(" this is id " , id)
        const user = await User.findById(new Types.ObjectId(id)).select("+emailVerifyToken");
        const cookieStore = await cookies()
        if(!user) return {error: true , msg : "user doesnt exist failed"}
        const expire = user.emailVerifyExpires?.getTime()
    

    const isTokenMatch = user.emailVerifyToken == token ? true : false
    if(!isTokenMatch){
        return {error: true , msg : "Token didn't match" , token: null}
    }
    
        if ( isTokenMatch&& expire && (Date.now() <= expire)){
            user.isEmailVerified = true;
            user.emailVerifyToken = undefined;
            user.emailVerifyExpires = undefined;
            await user.save()

            const sessiontoken = await createJWT(user._id.toString())

           await cookieStore.set('session' , sessiontoken , {
                httpOnly : true,
                maxAge : 60 * 60 * 24 * 7 , 
                sameSite : 'lax',
                
            })
        

            return {error: false ,msg : "verification succes", token : sessiontoken}
        }
            return {error: true , msg : "Token has alrady expired" , token : null}
        
    } catch (error) {
     console.error(error)
     return {error: true , msg : "verification failed"  , token : null}   
    }

    
}

export async function getUserFromSession(){

const sessionCookie = (await  cookies()).get('session')?.value
    
    if (!sessionCookie) {
      return {error : true , msg : "Unauthorized access" , data : null}
    }

 await connectDB()

    
    
    const data= await verifyJWT(sessionCookie)
    if (!data) {
      return {error : true , msg : "Unauthorized access" , data : null}
    }
    
    const user = await User.findById(data.userId).select('name email _id').lean()

     if (!user) {
      return {error : true , msg : "Unauthorized access" , data : null}
      
    }

   return {error : false , data : { id: user._id.toString(),name: user.name,email: user.email}}
}

export async function logout(){

    const cookieStore = await cookies()
    await cookieStore.delete({name : 'session' , path : '/'})
}
