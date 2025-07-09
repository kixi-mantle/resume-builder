import type { NextApiRequest, NextApiResponse } from 'next'
import { renderToString } from 'react-dom/server'
import React from 'react'
import puppeteer from 'puppeteer-core'
import { getResume } from '../../../src/action/resumeAction'
import Template_body from '../../../src/ResumeTemplate/resumes/Template-1_body'
import chromium from 'chrome-aws-lambda'

// PDF Generation Utility
const generatePDF = async (html: string) => {

 
  
  const browser = await puppeteer.launch({
    headless: true, // Use new Headless mode
    args: ['--no-sandbox' , '--disable-setuid-sandbox'],
    devtools: false,
    executablePath : await getLocalChromePath()

  });


  try {
    const page = await browser.newPage();
    
    // Set viewport to match A4 dimensions
    await page.setViewport({
      width: 1240,
      height: 1754,
      deviceScaleFactor: 2
    });


    // Enable request interception
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      request.continue();
    });

    // Inject HTML with proper Next.js image handling
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; }
            
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

   await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3 seconds


   
    await page.evaluate(async()=>{
      const images : HTMLImageElement[] = Array.from(document.querySelectorAll('img'));
      for(const img of images) {

       await new Promise<void>((resolve)=>{
         const timeoutId =  setTimeout(()=>{
            cleanup()
            resolve()
          },3000)

           const cleanup = () => {
          clearTimeout(timeoutId);
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
        };

        const onLoad = () => {
          cleanup();
          resolve();
        };

        const onError = () => {
          cleanup();
          resolve(); // treat error as "done"
        };

        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onError, { once: true });

        })

       
      }

        
 
      

     
      
    })

  


    // Generate PDF
    const buffer = await page.pdf({
      format: 'a4',
      printBackground: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
      preferCSSPageSize: true,
      timeout: 30000
    });

    return buffer;
  } finally {
   browser.close()
  }
};

  async function getLocalChromePath() {
   const path = await chromium.executablePath;
 if (process.env.AWS_EXECUTION_ENV) {
    if (!path) throw new Error('🚨 chrome-aws-lambda executablePath is null on Vercel!');
    return path;
  }

  return path || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
}
// Error Handler
const handleError = async (res: NextApiResponse, status: number, message: string): Promise<void> => {
  const errorHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: sans-serif;
            padding: 2rem;
            color: #dc2626;
          }
          h1 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        <h1>Error Generating PDF</h1>
        <p>${message}</p>
      </body>
    </html>
  `
  
  try {
    const pdf = await generatePDF(errorHtml)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename=error.pdf`)
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    return res.status(status).send(pdf)
  } catch (err) {
    console.error('Failed to generate error PDF:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Main Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return handleError(res, 405, 'Only POST requests allowed')
    }

    // Validate resumeId
    const { resumeId } = req.body
    if (!resumeId || typeof resumeId !== 'string') {
      return handleError(res, 400, 'Missing or invalid resume ID')
    }

    // Fetch resume data
    const data = await getResume(resumeId)
    if (!data) {
      return handleError(res, 404, 'Resume not found')
    }

    // Render component to HTML with proper dimensions
    const componentHtml = renderToString(
      React.createElement(
        'div',
        { 
          style: { 
            width: '210mm',  // A4 width
            height: '297mm', // A4 height
            margin: '0 auto'
          } 
        },
        React.createElement(Template_body, { data })
      )
    )

    // Generate PDF
    const pdfBuffer = await generatePDF(componentHtml)

    // Verify PDF was generated
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Empty PDF buffer generated')
    }

    // Set response headers
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=resume.pdf',
      'Content-Length': pdfBuffer.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    })

     res.status(200).end(pdfBuffer)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('PDF Generation Error:', error)
    return handleError(res, 500, message)
  }
}

