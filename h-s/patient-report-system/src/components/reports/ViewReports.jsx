import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "./ViewReports.css";

// Set worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewReports = () => {
  const { reportId } = useParams(); // Get the report ID from the URL
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    // Fetch the PDF file URL from the backend
    const fetchReport = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reports/${reportId}`);
        const blob = await response.blob();
        setPdfUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching the PDF:", error);
      }
    };

    fetchReport();
  }, [reportId]);

  return (
    <div className="pdf-container">
      <h2>Report Preview</h2>
      {pdfUrl ? (
        <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} pageNumber={index + 1} />
          ))}
        </Document>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default ViewReports;
