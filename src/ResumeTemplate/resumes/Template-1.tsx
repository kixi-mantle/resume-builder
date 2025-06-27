"use client"

import Image from "next/image"; 
import type { Template_1_type } from "../resumeSchema";
import { useEffect, useRef, useState } from "react";
import { useRefStore } from "../../store/data";


const Template_1 = ({ data , height , width } : { data : Template_1_type , height :  number | undefined , width: number |undefined }) => {


const [scale , setScale] = useState(1);
const TemplateRef = useRef<HTMLDivElement | null>(null);
 const{setResumeRef} = useRefStore()


useEffect(()=>{
    setResumeRef(TemplateRef)
},[TemplateRef , setResumeRef])

 
useEffect(()=>{
 

const scaleValue = ((width || 794) -32)/ 794

  
    setScale(scaleValue);

},[width , height])





  if(scale == 1) {
    return (
      <div className="w-full h-full items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
      </div>
    )
  }

  return (
    <div className= {`resume   relative  shadow-lg rounded-lg border-2  bg-white` }
     ref={TemplateRef}
    style={{
          width: `794px`,
  height: '1123px',
  transform: `scale(${scale})`,
  transformOrigin: "top left",
  
     }} 
    
        >
      <div className=" bg-white rounded-md">
  {/* Header Section */}
  <header className="text-black p-5 pb-4 flex border-b border-gray-200">
    <div className="flex justify-between items-center w-full">
      <div className="mt-1">
        <h1 className="text-3xl font-bold mb-1 text-purple-700">{data.name}</h1>
        <p className="text-xl font-semibold italic text-purple-500 mb-3">{data.occupation}</p>
        <p className="text-gray-700">{data.address}</p>
        <p className="text-gray-700">{data.phone} | {data.email}</p>
        <p className="text-gray-700">{data.website}</p>
      </div>
      <div className="w-[100px] h-[100px] rounded-full border-4 border-purple-700 overflow-hidden flex-shrink-0">
        <Image 
          src={data.photo || '/placeholder-profile.jpg'} 
          alt="Profile"
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="p-6 ">
    {/* Summary */}
    {data.summary && (
      <section className="mb-8">
        <h2 className="text-xl font-bold text-purple-700 border-b-2 border-purple-200 pb-1 mb-3">SUMMARY</h2>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data.summary }}></div>
      </section>
    )}

    {/* Experience */}
    {data.experience.length > 0 && (
      <section className="mb-8">
        <h2 className="text-xl font-bold text-purple-700 border-b-2 border-purple-200 pb-1 mb-3">EXPERIENCE</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
              <span className="text-sm text-gray-500">{exp.date}</span>
            </div>
            <h4 className="text-md font-medium text-gray-600 mb-2">{exp.company}</h4>
            <div className="space-y-1 text-gray-700" dangerouslySetInnerHTML={{ __html: exp.achievements }} />
          </div>
        ))}
      </section>
    )}

    {/* Education */}
    {data.education.length > 0 && (
      <section className="mb-8">
        <h2 className="text-xl font-bold text-purple-700 border-b-2 border-purple-200 pb-1 mb-3">EDUCATION</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
              <span className="text-sm text-gray-500">{edu.date}</span>
            </div>
            <p className="text-gray-600">{edu.institution}</p>
          </div>
        ))}
      </section>
    )}

    {/* Additional Info */}
    {data.additionalInfo && (
      <section>
        <h2 className="text-xl font-bold text-purple-700 border-b-2 border-purple-200 pb-1 mb-3">ADDITIONAL INFORMATION</h2>
        <div dangerouslySetInnerHTML={{ __html: data.additionalInfo }} />
      </section>
    )}
  </main>
</div>

    </div>
  );
};

export default Template_1
