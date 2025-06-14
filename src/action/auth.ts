import { Types } from "mongoose"
import User from "../models/User"
import { getVerificationToken } from "../server/safety"
import { sendVerificationEmail } from "./helper/mailer"
import { redirect } from "next/navigation"


export const signUp = async (data : {name : string , email : string , password : string}) =>{
    const newUser = await User.create(data)

    if(!newUser) return { error : true , msg : "Unexpected Error happen"}

    try {
        const token = await getVerificationToken()
        newUser.emailVerifyToken = token
        newUser.emailVerifyExpires = new Date(Date.now() + 3 * 60)
        await newUser.save()

        await sendVerificationEmail(newUser.email! , await getVerificationToken() , newUser._id.toString())
    } catch (error) {
        console.error(error)
    }


}

export const verifyEmail = async(token : string , id : string) =>{

    const user = await User.findById(new Types.ObjectId(id));
    if(!user) redirect('/')
    const expire = user.emailVerifyExpires?.getTime()
    if ( user.emailVerifyToken == token && expire && Date.now() <= expire){
        user.isEmailVerified = true;
        await user.save()
        return {error: false , msg : "verification successfull"}
    }
        return {error: true , msg : "verification failed"}
    
}
