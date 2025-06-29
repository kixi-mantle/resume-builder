"use client"



import { useEffect, useState } from "react";
import env from "../../../../../server/data";


export default function PreviewPage  ({resumeId} : {resumeId : string}){
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
 useEffect(()=>{


  
  const getpdf = async()=>{
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/resume/create-pdf?resumeId=${resumeId}`)

  if(!res.ok){
    setIsLoading(false)
   setCreated(true)
     
  }
  

  const blob = await res.blob()

  const url = window.URL.createObjectURL(blob)

    setPdfUrl(url)
    setIsLoading(false)
    setCreated(true)
  }
  getpdf()
 },[resumeId])
  
  


  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center gap-6">


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

