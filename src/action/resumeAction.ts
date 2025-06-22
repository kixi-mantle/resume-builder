
"use server"

import { Template_1_type } from "../ResumeTemplate/resumeSchema";
import { ResumeInfo } from "../app/dashboard/DashboardPage";
import { connectDB } from "../lib/mongodb";
import Resume from "../models/Resume";
import User from "../models/User";
import { ObjectId } from "mongodb";

export const createResume = async ({
  ownerId,
  resumeData
} : {
   ownerId : string,
  resumeData : Template_1_type
}) => {
  try {
    await connectDB()
    const user = await User.findById(ownerId)
    if(!user) return {error : true , msg: "User doesn't exist"}
    const newResume = new Resume({
      ...resumeData,
      owner_id: ownerId
    });


    const savedResume = await newResume.save();
    return {error : false , data : savedResume};

  } catch (error) {
    console.error("Error creating resume:", error);
    return {error : true , msg : "Something went wrong" };

  }
};

export const updateResume = async ({
  resumeId,
  updateData
} : {
   resumeId : string,
  updateData : Template_1_type
}) => {
  try {
     await connectDB()
     await Resume.findByIdAndUpdate(
      resumeId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    return {error : false};

  } catch (error) {
    console.error("Error updating resume:", error);
   return {error : true , msg : "Couldn't update the resume" };

  }
};



export const getResumeFromUser = async(id : string) : Promise<ResumeInfo[]>=>{

  if(!id) return []
  await connectDB()
    const user  = await User.findById(new ObjectId(id)).select('resumeIds').populate<{resumeIds : {_id : ObjectId , title : string , createdAt: Date}[]}>({
      path : "resumeIds",
      select : 'title createdAt',
      options : {sort : {createdAt : -1}}
    });

   return user?.resumeIds?.map( val => toClientResume(val))  || []; 
}

// Convert MongoDB document to client-safe type
export function toClientResume(doc: {
  _id: ObjectId;
  title: string;
  createdAt: Date;
}): ResumeInfo {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    createdAt: doc.createdAt.toISOString()
  };
}
