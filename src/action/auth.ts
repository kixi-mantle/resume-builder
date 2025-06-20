"use server"

import { Types } from "mongoose"
import { createJWT, getVerificationToken, verifyJWT } from "../server/safety"
import { sendVerificationEmail } from "./helper/mailer"
import { connectDB } from "../lib/mongodb"
import User from "../models/User"
import { cookies } from "next/headers"


export const signUp = async (data : {name : string , email : string , password : string}) =>{
    try {
    await connectDB()
    const newUser = await User.create(data)

    if(!newUser) return { error : true , msg : "Unexpected Error happen"}

        const token = await getVerificationToken()
        newUser.emailVerifyToken = token
        newUser.emailVerifyExpires = new Date(Date.now() + 10 * 60 * 1000)
        await newUser.save()

        await sendVerificationEmail(newUser.email! , token , newUser._id.toString())
        return {error : false , msg : "verification"}
    } catch (error) {
        console.error(error)
        return {error : true , msg : "verification"}
    }


}


export const login = async ( {email  , password } : { email : string , password : string  }) =>{
    try {
    await connectDB()
    const user = await User.findOne({email})

    if(!user) return { error : true , msg : "Invalid field"}

        if(user.isEmailVerified){
        const token = await getVerificationToken()
        user.emailVerifyToken = token
        user.emailVerifyExpires = new Date(Date.now() + 10 * 60 * 1000)
        await user.save()
        await sendVerificationEmail(user.email! , token , user._id.toString())
        return {error : true , msg : 'verification'}
        }

        const ispasswordMatch = await user.isPasswordMatch(password)

        if(!ispasswordMatch){

            return {error : true , msg : "Invalid field"}
        }
        const cookieStore = await cookies()


        const token = await createJWT(user._id.toString())

            cookieStore.set('session' , token , {
                httpOnly : true,
                maxAge : 60 * 60 * 24 * 7 , 
                sameSite : 'lax',
                
            })

            return {error : false , msg : "Successfully logged in"}



    } catch (error) {
        console.error(error)
        return {error : true , msg : "verification"}
    }


}

export const verifyEmail = async({token , id}:{token : string , id : string}) =>{

    try {
        const user = await User.findById(new Types.ObjectId(id)).select("+emailVerifyToken");
        const cookieStore = await cookies()
        if(!user) return {error: true , msg : "verification failed"}
        const expire = user.emailVerifyExpires?.getTime()
    

    const isTokenMatch = user.emailVerifyToken == token ? true : false
    
        if ( isTokenMatch&& expire && (Date.now() <= expire)){
            user.isEmailVerified = true;
            await user.save()

            const token = await createJWT(user._id.toString())

            cookieStore.set('session' , token , {
                httpOnly : true,
                maxAge : 60 * 60 * 24 * 7 , 
                sameSite : 'lax',
                
            })

            return {error: false , msg : "verification successfull"}
        }
            return {error: true , msg : "verification failed"}
        
    } catch (error) {
     console.error(error)
     return {error: true , msg : "verification failed"}   
    }

    
}

export async function getUserFromSession(){

const sessionCookie = (await  cookies()).get('session')?.value
    
    if (!sessionCookie) {
      return {error : true , msg : "Unauthorized access"}
    }

 await connectDB()

    
    
    const {userId} = verifyJWT(sessionCookie)
    const user = await User.findById(userId).select('name email _id').lean()

     if (!user) {
      return {error : true , msg : "Unauthorized access"}
      
    }

   return {error : false , data : { id: user._id,name: user.name,email: user.email}}
}
