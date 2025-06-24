import { Control, useFieldArray, UseFormRegister, UseFormSetValue, useFormState } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Experience, Template_1_type } from "../../../../ResumeTemplate/resumeSchema";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorCom from "./Editor";

export type ResumeExperienceProps = {
  data:  Experience[],
  setValue : UseFormSetValue<Template_1_type>
  register: UseFormRegister<Template_1_type>;
  control: Control<Template_1_type>;
};

const WorkExperience = ({ register, control , setValue  }: ResumeExperienceProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  // Get form errors
  const { errors } = useFormState({ control });

  const defaultValue: Experience = {
    position: "",
    company: "",
    date: "",
    achievements: "",
  };
  
       const editor =  useEditor({
        extensions: [StarterKit.configure({
                      bulletList: {
                        HTMLAttributes: {
                          class: 'list-disc pl-4',
                        },
                      },
                      orderedList: {
                        HTMLAttributes: {
                          class: 'list-decimal pl-4',
                        },
                      },
                    })],
       
         editorProps : {
        attributes : {
          class: 'min-h-[200px] p-2 outline-none whitespace-pre-wrap'
        },
      },
        
        autofocus : true,
        immediatelyRender:false
    
      });
    
      if (!editor) {
        return (
          <div className="flex flex-col w-full space-y-2">
            <label className="text-sm font-semibold text-gray-600">Summary</label>
            <div className="p-4 bg-gray-100 rounded-md text-gray-500">
              Loading editor...
            </div>
          </div>
        );
      }
    

  return (
    <div className="flex relative flex-col space-y-4 w-full">
      {fields.map((exp, index) => (
        <Card key={exp.id} className="border-gray-400 shadow-sm relative">
          <X 
            className="absolute right-2 top-2 hover:text-red-500 cursor-pointer text-sm" 
            onClick={() => remove(index)}
          />
          <CardHeader>
            <CardTitle className="text-xl">
              Work Experience {index + 1}
            </CardTitle>
          </CardHeader>
         
          <CardContent className="space-y-2 text-gray-700">
            {/* Company Field */}
            <div>
              <p className="font-medium mb-1">Company:</p>
              <input
                {...register(`experience.${index}.company`, { required: "Company is required" })}
                defaultValue={exp.company}
                placeholder="Company"
                className="border border-gray-400 rounded-lg px-2 py-1 w-full"
              />
              {errors?.experience?.[index]?.company && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.experience[index]?.company?.message}
                </p>
              )}
            </div>

            {/* Position Field */}
            <div>
              <p className="font-medium mb-1">Position:</p>
              <input
                {...register(`experience.${index}.position`, { required: "Position is required" })}
                defaultValue={exp.position}  // Fixed: was using exp.company
                placeholder="Position"
                className="border border-gray-400 rounded-lg px-2 py-1 w-full"
              />
              {errors?.experience?.[index]?.position && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.experience[index]?.position?.message}
                </p>
              )}
            </div>

            {/* Date Field */}
            <div>
              <p className="font-medium mb-1">Date:</p>
              <input
                {...register(`experience.${index}.date`, { required: "Date is required" })}
                defaultValue={exp.date}
                placeholder="Date"
                className="border border-gray-400 rounded-lg px-2 py-1 w-full"
              />
              {errors?.experience?.[index]?.date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.experience[index]?.date?.message}
                </p>
              )}
            </div>

            {/* Achievements Field */}
            <div>
              <p className="font-medium mb-1">Achievement:</p>
              <EditorCom editor={editor} initialContent={exp.achievements} onChange={(data)=>{
                setValue(`experience.${index}.achievements` , data , {shouldValidate : true})
              }}/>
              {errors?.experience?.[index]?.achievements && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.experience[index]?.achievements?.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        onClick={() => append(defaultValue)}
        className="self-center bg-green-700 text-white hover:bg-green-800 shadow-sm rounded-lg hover:cursor-pointer"
      >
        + Add Work Experience
      </Button>
    </div>
  );
};

export default WorkExperience;