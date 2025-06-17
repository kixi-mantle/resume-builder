"use client"

import Image from "next/image"; 
import type { Template_1_type } from "../resumeSchema";
import { useEffect, useState } from "react";


const Template_1 = ({ data , height , width } : { data : Template_1_type , height :  number | undefined , width: number |undefined }) => {


const [scale , setScale] = useState(1);


useEffect(()=>{
 

const scaleValue = Math.min(
  
      (width || 794) / 794,
      (height || 1123) / 1123
    );
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
    <div className=" relative  shadow-lg rounded-lg border-2 "
    style={{
          width: '794px',
  height: '1123px',
  maxWidth: '794px',
  transform: `scale(${scale})`,
  transformOrigin: "top center",
  margin: '0 auto'
     }}
        >
        <div 
        className='absolute top-0 left-0 w-full h-full  overflow-hidden overflow-x-hidden overflow-y-auto bg-white'  >
      {/* Header Section */}
      <div className=" text-black p-6 pb-4 flex">
        <div className="flex justify-between items-center w-full">
          <div className="mt-3">
            <h1 className="text-3xl font-bold mb-4 text-purple-700">{data.name}</h1>
            
            <p className="">{data.address}</p>
            <p className="">{data.phone} | {data.email}</p>
            <p className="">{data.website}</p>
          </div>
          <div className="w-24 h-24 rounded-full border-4 border-purple-700 overflow">
            <Image 
              src={data.photo || '/placeholder-profile.jpg'} 
              alt="Profile"
              width={12}
              height={12}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 border-b-2 border-purple-200 pb-1 mb-3">SUMMARY</h2>
          <p className="text-gray-700">{data.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 border-b-2 border-purple-200 pb-1 mb-3">EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                <span className="text-sm text-gray-500">{exp.date}</span>
              </div>
              <h4 className="text-md font-medium text-gray-600 mb-2">{exp.company}</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
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

        {/* Additional Info */}
        <section>
          <h2 className="text-xl font-bold text-purple-700 border-b-2 border-purple-200 pb-1 mb-3">ADDITIONAL INFORMATION</h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(data.additionalInfo).map(([key , val],idx)=>(
                <div key={idx}>
              <h3 className="font-semibold text-gray-800 inline">{key} : </h3>
              <p className="text-gray-700 inline">{val}</p>
            </div>
            ))}
          </div>
        </section>
      </div>
      </div>
    </div>
  );
};

export default Template_1
