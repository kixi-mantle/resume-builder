import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Experience, Template_1_type } from "../../../ResumeTemplate/resumeSchema";
import { Button } from "@/components/ui/button";
import {  X } from "lucide-react";

export type ResumeExperienceProps = {
  data: Experience[];
  register: UseFormRegister<Template_1_type>;
  control : Control<Template_1_type>
 
};


const WorkExperience = ({ data, register, control }: ResumeExperienceProps) => {

    
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience", // must match your form schema path exactly
  });

    
    const defualtValue : Experience = {
        position : "",
        company : "",
        date : "",
        achievements : "",
    }
    
    
  return (
    <div className="flex relative flex-col space-y-4 w-full">
      { fields.map((exp, index) => (
        <Card key={index} className="border-gray-400 shadow-sm">

            <X className="absolute right-2 top-2 hover:text-red-500 cursor-pointer text-sm" onClick={()=>remove(index)}></X>
         
          <CardContent className="space-y-2 text-gray-700">
            <div>
              <p className="font-medium mb-1">Company:</p>
              <input
                {...register(`experience.${index}.company`)}
                defaultValue={exp.company}
                placeholder="Company"
                className="border border-gray-400 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <p className="font-medium mb-1">Position:</p>
              <input
                {...register(`experience.${index}.position`)}
                defaultValue={exp.company}
                placeholder="Company"
                className="border border-gray-400 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <p className="font-medium mb-1">Date:</p>
              <input
                {...register(`experience.${index}.date`)}
                defaultValue={exp.date}
                placeholder="Date"
                className="border border-gray-400 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <p className="font-medium mb-1">Achievement:</p>
              <textarea
                {...register(`experience.${index}.achievements`)}
                defaultValue={exp.achievements}
                placeholder="Achievements"
                className="border border-gray-400 rounded px-2 py-1 w-full"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add Work Experience Button */}
      <Button
         type="button"
        onClick={() => append(defualtValue)}
        className="self-center bg-green-700 text-white hover:bg-green-800 shadow-sm rounded-lg hover:cursor-pointer"
      >
        + Add Work Experience
      </Button>
    </div>
  );
};

export default WorkExperience;
