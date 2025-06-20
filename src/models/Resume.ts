import mongoose, { Document, Model, Schema, Types } from "mongoose";
import {  Template_1_type } from "../ResumeTemplate/resumeSchema";




export interface IResume extends Document , Template_1_type {
    _id : Types.ObjectId,
    owner_id : Types.ObjectId
  
}

// const ExperienceSchema = new Schema<Experience>({
//   position: { type: String, required: true },
//   company: { type: String, required: true },
//   date: { type: String, required: true },
//   achievements: { type: String, required: true }
// })

// const EducationSchema = new Schema<Education>({
//   degree: { type: String, required: true },
//   institution: { type: String, required: true },
//   year: { type: String, required: true }
// }, { _id: true });

const ResumeSchema : Schema<IResume> = new Schema({

   name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
  },
  
  // Optional Fields
  website: { type: String, trim: true },
  photo: { type: String },
  additionalInfo: { type: String, trim: true },
 
  // Required Sections
  summary: { type: String, required: true, trim: true },
  
  // Experience Array (defined inline)
  experience: [{
    position: { type: String, required: true },
    company: { type: String, required: true },
    date: { type: String, required: true },
    achivement: { type: String, required: true },
    // You can add more fields as needed
  }],
  
  // Education Array (defined inline)
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    date: { type: String, required: true },
    // Additional education fields can be added here
  }],
  
  // System Fields
  owner_id: { 
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'User' 
  }
},)

const Resume : Model<IResume> = mongoose.models.resume || mongoose.model("resume" , ResumeSchema)

export default Resume;


