"use client"



import { useEffect, useRef, useState } from "react";
import Template_body from "../../../../../ResumeTemplate/resumes/Template-1_body";
import { Template_1_type } from "../../../../../ResumeTemplate/resumeSchema";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function Preview  ({resumeId , data} : {resumeId : string , data : Template_1_type}){
  const pdfRef = useRef<HTMLDivElement | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
 useEffect(()=>{

   
   const generatePdf = async()=>{

    try {
       if(!pdfRef.current || !data) return

        await new Promise(res => setTimeout(res, 3000)); 

  const canvas = await html2canvas(pdfRef.current , {
    scale : 2,
    useCORS : true
  });

  const imgData = canvas.toDataURL("image/jpeg");

  const pdf = new jsPDF({
    orientation : "portrait",
    unit : "pt",
    format : "a4",
  })

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, "JPEG", 0 ,0, pdfWidth , pdfHeight , undefined , "MEDIUM");
  

  const pdfBlob = pdf.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  

  setPdfUrl(url)

  setIsLoading(false)
  setCreated(true)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      setCreated(false)  
    }
     
    

}


  generatePdf()
  
  
 },[resumeId , data])
  
  



  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center gap-6">

      <div style={{width : '794px' , height : '1123px' }} ref={pdfRef}>
        <Template_body data={data}/>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-red-600 font-medium">Creating your resume PDF...</p>
        </div>
      ) : created ? (
        <>
          <p className="text-green-700 text-lg font-semibold">
            Your resume has been created!
          </p>

          <button
            onClick={() => {
              if (pdfUrl) {
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.download = "resume.pdf";
                link.click();
              }
            }}
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Download PDF
          </button>

          {pdfUrl && (
            <div className="w-full border rounded shadow-md mt-4">
              <iframe
                src={pdfUrl}
                title="Resume PDF Preview"
                className="w-full h-[600px]"
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-red-600 font-medium">
          Failed to generate PDF. Please try again.
        </div>
      )}
    </div>
  );
}

