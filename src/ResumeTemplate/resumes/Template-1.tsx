"use client"

import type { Template_1_type } from "../resumeSchema";
import { useEffect, useState } from "react";
import Template_body from "./Template-1_body";


const Template_1 = ({ data , width } : { data : Template_1_type ,  width: number |undefined }) => {


const [scale , setScale] = useState(1);




useEffect(()=>{
 

const scaleValue = ((width || 794) -32)/ 794

  
    setScale(scaleValue);

},[width ])





  if(scale == 1) {
    return (
      <div className="w-full h-full items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
      </div>
    )
  }

  return (
    <div className= {`resume   relative  shadow-lg rounded-lg border-2  bg-white` }
    
    style={{
          width: `794px`,
  height: '1123px',
  transform: `scale(${scale})`,
  transformOrigin: "top left",
  
     }} 
    
        >

          <Template_body data={data} ></Template_body>
      

    </div>
  );
};

export default Template_1
