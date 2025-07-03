import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { comparePassword, passwordHash } from "../server/crypto";



const auth = ["email" , "google" ] as const
type authEnum   = typeof auth[number] 

export interface IUser extends Document {
  _id : Types.ObjectId; 
  name: string;
  
  email: string;
  passwordHash?: string;
  googleId? : string,
  resumeIds : [Types.ObjectId]

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

    isPasswordMatch(password: string): Promise<boolean>;
}

const UserSchema : Schema<IUser> = new Schema(
    {
        
        email: {
    type: String,
    unique: true,
  },
  name: String,
 
  createdAt: { type: Date, default: Date.now },
  
  // Fields for email/password auth
  passwordHash: {
    type: String,
    select: false ,// Never return password in queries
    sparse : true
  },

  resumeIds : {
    type : [Schema.Types.ObjectId],
    ref : 'resume'
  },
  
  authType : {
    type : String , 
    enum : ['email' , 'google'],
    default : 'email'
    
  },
  
  isEmailVerified: { type: Boolean, default: false },
  emailVerifyToken: { type: String, select: false },
   emailVerifyExpires: {type : Date },
    }

)

UserSchema.methods.isPasswordMatch = async function(password : string) : Promise<boolean> {

  if(!password || !this.passwordHash) {
    console.error("args missing")
    return false 
  }

     return await comparePassword({password , hashedPassword : this.passwordHash})
}

UserSchema.pre<IUser>('save' , async function (next){
  if(this.isModified('passwordHash') && this.passwordHash){
    
    this.passwordHash = await passwordHash(this.passwordHash)
  }
  next();
})
const User : Model<IUser> = mongoose.models.user || mongoose.model("user" , UserSchema)

export default User;

