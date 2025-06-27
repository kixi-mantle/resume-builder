import { useRefStore } from "../../../../../store/data";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

const Previewpage = () => {
  const { resumeRef } = useRefStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const createPdfUrl = async () => {
      const element = resumeRef.current;
      if (!element) return;

      try {
        setIsLoading(true);
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

        const pdfBlob = pdf.output("blob");
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
        setCreated(true);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsLoading(false);
      }
    };

    createPdfUrl();
  }, [resumeRef]);

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
};

export default Previewpage;