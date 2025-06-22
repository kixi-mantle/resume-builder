"use server"

import bcrypt from "bcrypt"
import { randomBytes } from "crypto";
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from "./data";

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

interface JWTPayload {
  userId: string
  exp?: number
}


const getJwtSecret = (): jwt.Secret => {
  return env.JWT_SECRET
}



export async function createJWT(userId: string): Promise<string> {
  

    const payload : JwtPayload = {
        userId
    }

    

  return jwt.sign(payload , getJwtSecret() )
}


export async function verifyJWT(token : string) : Promise<JWTPayload> {
    return jwt.verify(token , getJwtSecret()) as JWTPayload
}