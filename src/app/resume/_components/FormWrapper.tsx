import { Control, UseFormRegister } from "react-hook-form"
import { Template_1_type } from "../../../ResumeTemplate/resumeSchema"
import PersonalInfo, { PersonalInfoProps } from "./PersonalData"
import Summary, { SummaryProps } from "./ResumeSummary"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState } from "react"
import WorkExperience, { ResumeExperienceProps } from "./ResumeExperience"
import Education, { ResumeEducationProps } from "./ResumeEducation"


type FormWrapperProps = {
    form : Template_1_type ,
    register : UseFormRegister<Template_1_type>,
    control : Control<Template_1_type>
}

type ComponentKey<T> = {
  component: React.ElementType;
  data: T;
  name : string
};




const FormWrapper  =({form , register , control} : FormWrapperProps) => {
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
   }

   type StepKey = keyof typeof components;


   const [curr, setCurr] = useState<StepKey>('1');
  const totalSteps = Object.keys(components).length;
  const CurrComponent : React.ElementType = components[curr].component;
   const currData = components[curr].data;
   const CurrComponentName = components[curr].name;
   const stepOrder: StepKey[] = ['1', '2' , '3' , '4'];

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

  const handleSave = () => {
    // Your save logic here
  };
  const handleLink = (i : StepKey)=>{
    const currIndex = stepOrder.indexOf(i);
    setCurr(stepOrder[currIndex])
            
  }

 


   return (
   <div className="w-full h-full flex flex-col border-2 border-gray-400 rounded-xl shadow-sm bg-white">
  {/* Top: Breadcrumb */}
  <div className="h-fit relative p-6 bg-white rounded-t-xl">
    <div className="absolute h-[2px] bg-gray-400 w-full bottom-0 left-0"></div>

    <Breadcrumb>
      <BreadcrumbList className="flex space-x-4 justify-center">
        {stepOrder.map((i, idx) => (
          <div key={i} className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => handleLink(i)}
                className={`text-[15px] cursor-pointer transition-colors ${
                  i === curr
                    ? 'font-semibold text-red-500 border-b-2 border-red-400 pb-1'
                    : 'text-gray-500 hover:text-amber-600'
                }`}
              >
                {components[i].name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {idx !== stepOrder.length - 1 && (
              <BreadcrumbSeparator className="translate-y-0.5 text-gray-400" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>

    <h1 className="text-center text-3xl mt-6 font-semibold text-gray-700">
      {CurrComponentName}
    </h1>
  </div>

  {/* Middle: Dynamic component */}
  <div className="flex-1   p-6  overflow-y-auto ">
    <div className="max-w-2xl mx-auto"> {/* Added a constraining container */}
    <CurrComponent data={currData} register={register} control={control} />
  </div>
  </div>

  {/* Bottom: Buttons */}
  <div className="flex justify-between p-6 relative bg-white rounded-b-xl">
    <div className="absolute h-[2px] bg-gray-400 w-full top-0 left-0"></div>

    {/* Prev Button */}
   {/* Prev Button */}
{stepOrder.indexOf(curr) > 0 ? (
  <button
    onClick={handlePrev}
    className="px-5 py-2 bg-amber-400 text-white rounded-lg shadow-sm hover:bg-amber-500 transition"
  >
    Prev
  </button>
) : (
  <div />
)}

{/* Save Button */}
<button
  onClick={handleSave}
  className="px-5 py-2 bg-red-400 text-white rounded-lg shadow-sm hover:bg-red-500 transition"
>
  Save
</button>

{/* Next or Finish Button */}
{stepOrder.indexOf(curr) === totalSteps - 1 ? (
  <button
    className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 transition"
  >
    Finish
  </button>
) : (
  <button
    onClick={handleNext}
    className="px-5 py-2 bg-amber-400 text-white rounded-lg shadow-sm hover:bg-amber-500 transition"
  >
    Next
  </button>
)}

  </div>
</div>

   )

}

export default FormWrapper