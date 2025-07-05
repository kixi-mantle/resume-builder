"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Page = () => {
  const [resumePosition, setResumePosition] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Gentle floating effect
    const floatInterval = setInterval(() => {
      setResumePosition((prev) => (prev >= 5 ? -5 : prev + 0.5));
    }, 100);
    
    // Auto-rotate steps
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev === 2 ? 0 : prev + 1));
    }, 3000);

    return () => {
      clearInterval(floatInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Resume Template */}
        <div 
          className="absolute w-[24rem] md:w-80 lg:w-96 h-[30rem]  bg-white shadow-2xl rounded-lg transition-transform duration-300"
          style={{
            transform: `translate(-50%, calc(-50% + ${resumePosition}px)) rotate(${resumePosition * 0.5}deg)`,
            top: '50%',
            left: '50%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div className="absolute inset-0 border-2 border-gray-100 rounded-lg m-2 flex flex-col p-4">
            {/* Mock resume content */}
            <div className="h-8 bg-blue-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="h-4 bg-blue-200 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-2 bg-gray-100 rounded"></div>
              ))}
            </div>
            <div className="h-4 bg-blue-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-100 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Build <span className="text-blue-600">professional-grade</span> resumes in minutes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create, customize, and download your perfect resume - completely free. Stand out to employers with our elegant templates.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Started
            <span className="absolute -right-2 -top-2 h-5 w-5 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Build your resume in <span className="text-blue-600">three easy steps</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div 
              className={`p-8 rounded-xl transition-all duration-500 ${activeStep === 0 ? 'bg-blue-50 border-2 border-blue-200 shadow-lg' : 'bg-gray-50 border border-gray-100'}`}
              onMouseEnter={() => setActiveStep(0)}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${activeStep === 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'} text-2xl font-bold`}>
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Initiate Your Resume</h3>
              <p className="text-gray-600">
                Select from our collection of professionally designed templates tailored for every industry.
              </p>
              <div className="mt-6 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Template Selection UI</span>
              </div>
            </div>

            {/* Step 2 */}
            <div 
              className={`p-8 rounded-xl transition-all duration-500 ${activeStep === 1 ? 'bg-blue-50 border-2 border-blue-200 shadow-lg' : 'bg-gray-50 border border-gray-100'}`}
              onMouseEnter={() => setActiveStep(1)}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${activeStep === 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'} text-2xl font-bold`}>
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fill Your Data</h3>
              <p className="text-gray-600">
                Our intuitive form guides you through entering all your professional details with ease.
              </p>
              <div className="mt-6 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Data Entry Form</span>
              </div>
            </div>

            {/* Step 3 */}
            <div 
              className={`p-8 rounded-xl transition-all duration-500 ${activeStep === 2 ? 'bg-blue-50 border-2 border-blue-200 shadow-lg' : 'bg-gray-50 border border-gray-100'}`}
              onMouseEnter={() => setActiveStep(2)}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${activeStep === 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'} text-2xl font-bold`}>
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Download & Share</h3>
              <p className="text-gray-600">
                Instantly download your polished resume in PDF format, ready to impress employers.
              </p>
              <div className="mt-6 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Download Options</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  );
};

export default Page;