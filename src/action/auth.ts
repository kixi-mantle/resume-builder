"use server"

import { Types } from "mongoose"
import { getVerificationToken } from "../server/safety"
import { sendVerificationEmail } from "./helper/mailer"
import { connectDB } from "../lib/mongodb"
import User from "../models/User"


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

export const verifyEmail = async({token , id}:{token : string , id : string}) =>{

    try {
        const user = await User.findById(new Types.ObjectId(id)).select("+emailVerifyToken");
        if(!user) return {error: true , msg : "verification failed"}
        const expire = user.emailVerifyExpires?.getTime()
    

    const isTokenMatch = user.emailVerifyToken == token ? true : false
    if(!isTokenMatch){
        console.log(user)
        console.log('\n')
        console.log(user.emailVerifyToken)
        console.log('\n')
        console.log(token)
        
    }

        if ( isTokenMatch&& expire && (Date.now() <= expire)){
            user.isEmailVerified = true;
            await user.save()
            return {error: false , msg : "verification successfull"}
        }
            return {error: true , msg : "verification failed"}
        
    } catch (error) {
     console.error(error)
     return {error: true , msg : "verification failed"}   
    }

    
}
