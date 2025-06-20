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
    
    const matched = bcrypt.compare(password , hashedPassword);
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



export function createJWT(userId: string): string {
  

    const payload : JwtPayload = {
        userId
    }

    

  return jwt.sign(payload , getJwtSecret() )
}


export function verifyJWT(token : string) : JWTPayload {
    return jwt.verify(token , getJwtSecret()) as JWTPayload
}