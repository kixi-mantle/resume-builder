
"use server"

import { revalidateTag } from "next/cache";
import { Template_1_type } from "../ResumeTemplate/resumeSchema";
import { connectDB } from "../lib/mongodb";
import Resume from "../models/Resume";
import User from "../models/User";
import { ObjectId } from "mongodb";

export const createResume = async ({
  ownerId,
  resumeData,
  title
} : {
   ownerId : string,
  resumeData : Template_1_type, title : string
}) : Promise<{error : boolean , msg : string , data :{id : string , title : string , createdAt : string } | null }> => {
  try {
    await connectDB()
    const user = await User.findById(ownerId)
    if(!user) return {error : true , msg: "User doesn't exist" , data : null}
    const newResume = new Resume({
      ...resumeData,
      owner_id: ownerId,
      title 
    });


    const savedResume = await newResume.save();
    user.resumeIds.push(savedResume._id)
    await user.save()
    revalidateTag(`user-${ownerId}-resume`)
    return {error : false , msg : `${savedResume.title} was created sucessfully` , data : { id : savedResume._id.toString() , title : savedResume.title , createdAt : savedResume.createdAt.toISOString()}};

  } catch (error) {
    console.error("Error creating resume:", error);
    return {error : true , msg : "Something went wrong"  , data : null};

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


type ResumeInfo = {
  id :string ,
  title : string , 
  createdAt : string ,
}


export const getResumeFromUser = async(id : string) : Promise<ResumeInfo[]>=>{

  if(!id) return []
  await connectDB()
    const user  = await User.findById(new ObjectId(id)).select('resumeIds').populate<{resumeIds : {_id : ObjectId , title : string , createdAt: Date}[]}>({
      path : "resumeIds",
      select : 'title createdAt',
      options : {sort : {createdAt : -1}}
    });

   return user?.resumeIds ?  await Promise.all(user.resumeIds.map( (val) =>  toClientResume(val))) : []; 
}

// Convert MongoDB document to client-safe type
export async  function toClientResume(doc: {
  _id: ObjectId;
  title: string;
  createdAt: Date;
}):Promise<ResumeInfo> {
  return {
    id: doc._id.toString(),
    title: doc.title,
    createdAt: doc.createdAt.toISOString()
  };
}

export async function getResume(id: string ){
    
  try {
    await connectDB();
    const  resume = await Resume.findById(id).lean()
    if(!resume) return null

 
    return {
      ...resume , _id : resume._id.toString() , owner_id : resume.owner_id.toString()
    }
  } catch (error) {
   
    throw error 
  }
}

