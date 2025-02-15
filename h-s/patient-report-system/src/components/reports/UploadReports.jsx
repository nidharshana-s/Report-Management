import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./UploadReports.css";

const UploadReport = () => {
  const { patientId } = useParams();
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("report", file);
    formData.append("patientId", patientId);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload error.");
    }
  };

  return (
    <div className="upload-report">
      <h2>Upload Report</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadReport;
