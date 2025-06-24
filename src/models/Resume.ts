import mongoose, { Document, Model, Schema, Types } from "mongoose";
import {  Template_1_type } from "../ResumeTemplate/resumeSchema";




export interface IResume extends Document , Template_1_type {
    _id : Types.ObjectId,
    title : string ,
    owner_id : Types.ObjectId,
    createdAt: Date;   
  updatedAt: Date;
  
}



const ResumeSchema : Schema<IResume> = new Schema({
    
  title : {
    type : String,
    unique : true,
    required : true,
  },
   name: { type: String,  trim: true },
  address: { type: String ,trim: true },
  phone: { type: String, trim: true },
  email: { 
    type: String, 

    trim: true,
    lowercase: true,
  },
  
  // Optional Fields
  website: { type: String, trim: true },
  photo: { type: String },
  additionalInfo: { type: String, trim: true },
 
  // Required Sections
  summary: { type: String,  trim: true },
  
  // Experience Array (defined inline)
  experience: [{
    position: { type: String,  },
    company: { type: String,  },
    date: { type: String,  },
    achivement: { type: String,  },
    // You can add more fields as needed
  }],
  
  // Education Array (defined inline)
  education: [{
    degree: { type: String, },
    institution: { type: String, },
    date: { type: String, },
    // Additional education fields can be added here
  }],
  
  // System Fields
  owner_id: { 
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'user' 
  }
},{timestamps : true})

const Resume : Model<IResume> = mongoose.models.resume || mongoose.model("resume" , ResumeSchema)

export default Resume;


