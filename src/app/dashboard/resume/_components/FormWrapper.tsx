import {   Control, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, } from "react-hook-form"
import {  Template_1_type } from "../../../../ResumeTemplate/resumeSchema"
import PersonalInfo, { PersonalInfoProps } from "./PersonalData"
import Summary, { SummaryProps } from "./ResumeSummary"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useEffect, useState, useTransition } from "react"
import WorkExperience, { ResumeExperienceProps } from "./ResumeExperience"
import Education, { ResumeEducationProps } from "./ResumeEducation"
import { updateResume } from "../../../../action/resumeAction"
import { toast } from "sonner"
import AdditionalInfo, { InfoProps } from "./AdditionalInfo"
import { redirect } from "next/navigation"
import { Check, ChevronLeft, ChevronRight, Loader2, Save } from "lucide-react"


type ComponentKey<T> = {
  component: React.ElementType;
  data: T;
  name : string
};



type FormWrapperProps = {
    form : Template_1_type ,
    register : UseFormRegister<Template_1_type>,
    control : Control<Template_1_type>,
    handleSubmit : UseFormHandleSubmit<Template_1_type>
    setValue : UseFormSetValue<Template_1_type>,
    resumeId : string
}



const FormWrapper  =({form , register , control , handleSubmit , setValue , resumeId} : FormWrapperProps) => {


  
  

   const components : Record<string, ComponentKey<any>> = {
    '1' : {
        component : PersonalInfo , 
         data: {
      name: form.name,
      address: form.address,
      phone: form.phone,
      email: form.email,
      website: form.website,
      photo: form.photo,
      occupation : form.occupation
    } as PersonalInfoProps['data'],
    name : "Personal Information"
    },
    '2' : {
        component : Summary,
        data : {
        summary : form.summary
        } as SummaryProps['data'],
        name : "Summary"

    },
    '3' : {
        component : WorkExperience,
        data : form.experience as ResumeExperienceProps['data'],
        name : "Work Experience"
    },
    '4' : {
        component : Education,
        data : form.education as ResumeEducationProps['data'],
        name : "Education"
    },

    '5' : {
      component : AdditionalInfo,
      data : { additionalInfo : form.additionalInfo} as InfoProps['data'],
      name : "Additional Info"
    }
   }

   type StepKey = keyof typeof components;

   const [ispending , startTransition] = useTransition()
   const [curr, setCurr] = useState<StepKey>('1');
  const totalSteps = Object.keys(components).length;
  const CurrComponent : React.ElementType = components[curr].component;
   const currData = components[curr].data;
   const CurrComponentName = components[curr].name;
   const stepOrder: StepKey[] = ['1', '2' , '3' , '4' , '5'];

  const handleNext = () => {
    const currIndex = stepOrder.indexOf(curr);
  if (currIndex < stepOrder.length - 1) {
    setCurr(stepOrder[currIndex + 1]);
  }
  };

  const handlePrev = () => {
     const currIndex = stepOrder.indexOf(curr);
  if (currIndex > 0) {
    setCurr(stepOrder[currIndex - 1]);
  }
  };

  const handleSave = async (data: Template_1_type) => {
    
  startTransition(async () => {
    try {
      let finalPhotoUrl = data.photo;

      // Only process if it's not already a Cloudinary URL
      if (data.photo && !data.photo.startsWith('https://res.cloudinary.com')) {
        const response = await fetch(data.photo);
        const blob = await response.blob();
        const file = new File([blob], `photo-${Date.now()}`, {
          type: blob.type || 'application/octet-stream'
        });

        const form = new FormData();
        form.append('file', file);

        const res = await fetch(`/api/upload-image`, {
          method: 'POST',
          body: form
        });

        const resData = await res.json();
        if (resData.error) throw new Error(resData.error);
        
        finalPhotoUrl = resData.url;
        setValue('photo', finalPhotoUrl); // Update form with new URL
      }

      // Now update with the final URL (either original Cloudinary or new upload)
      const res = await updateResume({
        resumeId,
        updateData: { ...data, photo: finalPhotoUrl }
      });

      if (res.error) {
        toast.error('Error', {
          description: res.msg || 'Something went wrong'
        });
      }
    } catch (error) {
      toast.error('Upload failed', {
        description: error instanceof Error ? error.message : 'Failed to process image'
      });
    }
  });
  
  if(curr == '5'){
    
   redirect(`/dashboard/resume/${resumeId}/preview`)
   
  }
};



 

  
  const handleLink = (i : StepKey)=>{
    const currIndex = stepOrder.indexOf(i);
    setCurr(stepOrder[currIndex])
            
  }

 


   return (
   <form onSubmit={handleSubmit(handleSave, (errors) => {
  console.log("Validation errors:", errors);
  toast.error("Invalid field" , {
    description : "Please be sure to fill all the requred field(i.e experience and education)"
  })
})} className="w-full h-full flex flex-col border border-gray-200 rounded-xl shadow-sm bg-white">
      {/* Top: Breadcrumb */}
      <div className="h-fit relative p-6 bg-white rounded-t-xl">
        <div className="absolute h-[2px] bg-gray-200 w-full bottom-0 left-0"></div>

        <Breadcrumb>
          <BreadcrumbList className="flex space-x-4 justify-center">
            {stepOrder.map((i, idx) => (
              <div key={i} className="flex items-center">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => handleLink(i)}
                    className={`text-[15px] cursor-pointer transition-colors ${
                      i === curr
                        ? 'font-medium text-blue-600 border-b-2 border-blue-500 pb-1'
                        : 'text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    {components[i].name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {idx !== stepOrder.length - 1 && (
                  <BreadcrumbSeparator className="translate-y-0.5 text-gray-300" />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-center text-2xl mt-6 font-medium text-gray-800">
          {CurrComponentName}
        </h1>
      </div>

      {/* Middle: Dynamic component */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <CurrComponent data={currData} register={register} control={control} setValue={setValue} />
        </div>
      </div>

      {/* Bottom: Buttons */}
      <div className="flex justify-between p-6 relative bg-white rounded-b-xl">
        <div className="absolute h-[1px] bg-gray-100 w-full top-0 left-0"></div>

        {/* Prev Button */}
        {stepOrder.indexOf(curr) > 0 ? (
          <button
            
            onClick={handlePrev}
            className="px-5 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 disabled:opacity-50 flex items-center gap-2"
            disabled={ispending}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
        ) : (
          <div />
        )}

        {/* Save Button */}
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[7rem] gap-2 shadow-sm"
          disabled={ispending}
        >
          {ispending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing
            </>
          ) : stepOrder.indexOf(curr) == totalSteps - 1 ? (
            <>
              <Check className="w-4 h-4" />
              Complete
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </button>

        {/* Next or Finish Button */}
        {stepOrder.indexOf(curr) < totalSteps - 1 && (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200 disabled:opacity-50 flex items-center gap-2"
            disabled={ispending}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>

   )

}

export default FormWrapper