"use server"


import {jwtVerify , SignJWT} from 'jose'
import env from "./data";


interface JWTPayload {
  userId: string
  exp?: number
}


const getJwtSecret = (): string => {
  return env.JWT_SECRET
}



export async function createJWT(userId: string ): Promise<string> {
  
const secret = new TextEncoder().encode(getJwtSecret());

const alg = 'HS256';

  return await new SignJWT({ userId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);

}


export async function verifyJWT(token : string) : Promise< JWTPayload | null> {
  try {
    
    const secret = new TextEncoder().encode(getJwtSecret());

    const {payload} = await jwtVerify(token , secret);
    if(typeof payload.userId != 'string'){
      return null
    } 

      return {
        userId : payload.userId,
        exp : payload.exp
      }
  } catch (error) {
    console.error(error)
    return null
  }

   
  }