"use server"

import bcrypt from "bcrypt"
import { randomBytes } from "crypto";

export async function passwordHash(password : string){

   const hashedPassword = await bcrypt.hash(password , 10)

    return hashedPassword

}

export async function comparePassword({hashedPassword , password} : { hashedPassword : string , password : string}){

    if(!hashedPassword || !password) return false
    
    const matched = await  bcrypt.compare(password , hashedPassword);
    return matched
}

export async function getVerificationToken(){
    return randomBytes(32).toString('hex')
}
