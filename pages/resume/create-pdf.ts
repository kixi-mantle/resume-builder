import type { NextApiRequest, NextApiResponse } from 'next';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { getResume } from '../../src/action/resumeAction';
import Template_body from '../../src/ResumeTemplate/resumes/Template-1_body';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { resumeId } = req.query;
    
    if (!resumeId || typeof resumeId !== 'string') {
      return res.status(400).json({ error: true, msg: 'Invalid resumeId' });
    }

    const data = await getResume(resumeId);

    if (!data) {
      return res.status(404).json({ error: true, msg: 'Data does not exist' });
    }

    // Render component to string
    const componentHtml = renderToString(
      React.createElement(
        'div',
        { style: { width: '794px', height: '1123px' } },
        React.createElement(Template_body, { data })
      )
    );

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            img { max-width: 100%; height: auto; }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${componentHtml}
        </body>
      </html>
    `;

    console.log(html)

    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.setViewport({ width: 794, height: 1123 });
    // await page.setContent(html, { waitUntil: 'networkidle0' });
    // await page.waitForSelector('img');

    // const pdfBuffer = await page.pdf({
    //   format: 'A4',
    //   printBackground: true,
    //   preferCSSPageSize: true,
    //   margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    // });

    // await browser.close();

    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', `attachment; filename=resume_${resumeId}.pdf`);
    // res.send(pdfBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, msg: 'PDF generation failed' });
  }
}
