import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DoctorReportList.css";

const DoctorReportList = () => {
  const { patientId } = useParams();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports from backend
    fetch(`http://localhost:5000/api/reports/${patientId}`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, [patientId]);

  return (
    <div className="report-list">
      <h2>Reports for Patient ID: {patientId}</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <span>{report.type} Report - {report.date}</span>
              <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer">
                View PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorReportList;
