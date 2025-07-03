"use client"

import { useEffect, useRef, useState } from "react";
import Template_body from "../../../../../ResumeTemplate/resumes/Template-1_body";
import { Template_1_type } from "../../../../../ResumeTemplate/resumeSchema";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Download, AlertCircle } from "lucide-react";

export default function Preview({ resumeId, data }: { resumeId: string, data: Template_1_type }) {
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
  const generatePdf = async () => {
    try {
      if (!data) return;
      
      // Simulate progress for better UX
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      // Send request to your API endpoint
      const response = await fetch('/api/resume/create-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeId: resumeId,
          // Include any other necessary data
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is PDF (success case)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/pdf')) {
        const pdfBlob = await response.blob();
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
        setProgress(100);
        setIsLoading(false);
        setCreated(true);
      } else {
        // Handle case where response isn't PDF
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid response format');
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      setIsLoading(false);
      setCreated(false);
      // Optionally set an error state here
    } 
  };

  generatePdf();

  // Cleanup function
  return () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl); // Free memory when component unmounts
    }
  };
}, [resumeId, data , pdfUrl]);

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center gap-8">
      <Card className="w-full p-6 flex flex-col items-center gap-6">

         {isLoading ? (
          <div className="w-full max-w-md flex flex-col items-center gap-4">
            <Progress value={progress} className="h-2 w-full" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-medium text-gray-700">
                {progress < 50 ? "Processing your resume..." : "Finalizing PDF..."}
              </span>
            </div>
          </div>
        ) : created ? (
          <div className="w-full flex flex-col items-center gap-6">
            <Alert className="w-full max-w-md border-green-200 bg-green-50">
              <Terminal className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Success!</AlertTitle>
              <AlertDescription>
                Your resume PDF is ready to download.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button 
                onClick={() => {
                  if (pdfUrl) {
                    const link = document.createElement("a");
                    link.href = pdfUrl;
                    link.download = `${data.name || 'my'}-resume.pdf`;
                    link.click();
                  }
                }}
                className="bg-red-600 hover:bg-red-700 gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>

            </div>

          </div>
        ) : (
          <Alert variant="destructive" className="w-full max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to generate PDF. Please try again.
            </AlertDescription>
          </Alert>
        )}
        <div 
          className="border rounded-md shadow-sm overflow-hidden"
          style={{ width: '794px', height: '1123px' }} 
          ref={pdfRef}
        >
          <Template_body data={data} />
        </div>

       
      </Card>
    </div>
  );
}