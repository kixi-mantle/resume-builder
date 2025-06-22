import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Education as EducationType, Template_1_type } from "../../../ResumeTemplate/resumeSchema";
import { Button } from "@/components/ui/button";
import {  X } from "lucide-react";

import 'prosemirror-view/style/prosemirror.css';


export type ResumeEducationProps = {
  data: EducationType[];
  register: UseFormRegister<Template_1_type>;
  control : Control<Template_1_type>
 
};


const Education = ({ register, control }: ResumeEducationProps) => {

    
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education", // must match your form schema path exactly
  });

    
    const defualtValue : EducationType = {
       date : '',
       institution: '',
       degree : ''
    }
    
    
  return (
    <div className="flex   flex-col space-y-4 overflow-y-auto w-full">
      { fields.map((education, index) => (
        <Card key={index} className="border-gray-300 bg-transparent shadow-sm relative">

            <X className="absolute right-2 top-2 hover:text-red-500 cursor-pointer text-sm" onClick={()=>remove(index)}></X>
            <CardHeader>
              <CardTitle>
                Work Experience {index + 1}
              </CardTitle>
            </CardHeader>
         
          <CardContent className="space-y-2 text-gray-700">
            <div>
              <p className="font-medium mb-1">Institution:</p>
              <input
                {...register(`education.${index}.institution`)}
                defaultValue={education.institution}
                placeholder="Company"
                className="border border-gray-400 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <p className="font-medium mb-1">Date:</p>
              <input
                {...register(`education.${index}.date`)}
                defaultValue={education.date}
                placeholder="Company"
                className="border border-gray-400 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <p className="font-medium mb-1">Degree:</p>
              <input
                {...register(`education.${index}.degree`)}
                defaultValue={education.degree}
                placeholder="Date"
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
        + Add Education
      </Button>
    </div>
  );
};

export default Education;
