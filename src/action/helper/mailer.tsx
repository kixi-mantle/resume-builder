"use server"

import nodemailer, {TransportOptions} from 'nodemailer'
import env from '../../server/data'
import {google} from 'googleapis'





const oAuth2Client = new google.auth.OAuth2(
  env.CLIENT_ID,
  env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
  
)

oAuth2Client.setCredentials({refresh_token : env.REFRESH_TOKEN})

export const sendVerificationEmail = async (email : string , token : string , id : string)=>{

  try {
    const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        type : "oauth2",
        user: env.EMAIL_USERNAME,
        clientId : env.CLIENT_ID,
        clientSecret : env.CLIENT_SECRET,
        refreshToken : env.REFRESH_TOKEN,
        accessToken : accessToken.token
    }
} as TransportOptions)
          
    const verificationUrl =  `https://resume-builder-silk-kappa.vercel.app/verify-email?token=${token}&id=${id}`

    const mailOptions = {
        from : env.EMAIL_USERNAME,
        to: email ,
        subject : 'Verify Your Email',
        html : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Resume Builder</h1>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #333; margin-top: 0;">Welcome to Resume Builder!</h2>
        <p style="color: #555; line-height: 1.6;">Thank you for signing up. To start creating professional resumes, please verify your email address by clicking the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Email Address</a>
        </div>
        
        <p style="color: #777; font-size: 14px; line-height: 1.6;">If you didn't create an account with Resume Builder, you can safely ignore this email.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #999; font-size: 12px;">This link will expire in 24 hours.</p>
        </div>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p>© ${new Date().getFullYear()} Resume Builder. All rights reserved.</p>
      </div>
    </div>
    `,
    text: `Welcome to Resume Builder!\n\nPlease verify your email by visiting this link: ${verificationUrl}\n\nIf you didn't create an account, you can ignore this email.`

    }

    await transporter.sendMail(mailOptions)
    
  } catch (error) {
    throw error
    
  }

  
}

