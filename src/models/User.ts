import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { comparePassword, passwordHash } from "../server/safety";



const auth = ["email" , "google" ] as const
type authEnum   = typeof auth[number] 

export interface IUser extends Document {
  _id : Types.ObjectId; 
  name: string;
  email?: string;
  passwordHash?: string;
  googleId? : string,

  authType : authEnum
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean
  emailVerifyToken?: string 
   emailVerifyExpires?: Date,
  googleProfile: {
    accessToken: string,
    refreshToken: string
  }
}

const UserSchema : Schema<IUser> = new Schema(
    {
        
        email: {
    type: String,
    unique: true,
    sparse: true // Allows null for Google users who haven't provided email
  },
  name: String,
  createdAt: { type: Date, default: Date.now },
  
  // Fields for email/password auth
  passwordHash: {
    type: String,
    select: false // Never return password in queries
  },
  
  
  // Fields for Google OAuth
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows null for email/password users
  },
  googleProfile: {
    accessToken: String,
    refreshToken: String
  },
  
  // Fields for email verification
  isEmailVerified: { type: Boolean, default: false },
  emailVerifyToken: { type: String, select: false },
   emailVerifyExpires: {type : Date },
    }

)

const User : Model<IUser> = mongoose.model("user" , UserSchema)

export default User;


UserSchema.methods.isPasswordMatch = async function(password : string) : Promise<boolean> {
     return await comparePassword({password , hashedPassword : this.passwordHash})
}

UserSchema.pre<IUser>('save' , async function (next){
  if(this.isModified('passwordHash') && this.passwordHash){
    this.passwordHash = await passwordHash(this.passwordHash)
  }
  next();
})