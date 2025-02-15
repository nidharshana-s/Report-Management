import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const [doctorDetails] = useState({
    name: "Dr. John Doe",
    department: "Radiology",
    hospital: "City Hospital",
  });

  const handleSearch = async () => {
    // Fetch patient details from backend
    try {
      const response = await fetch(`http://localhost:5000/api/patient/${patientId}`);
      const data = await response.json();
      if (data) {
        setPatientDetails(data);
      } else {
        alert("Patient not found");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert("Error fetching details");
    }
  };

  return (
    <div className="doctor-dashboard">
      <div className="doctor-info">
        <h2>Doctor Dashboard</h2>
        <p><strong>Name:</strong> {doctorDetails.name}</p>
        <p><strong>Age:</strong> {doctorDetails.age}</p>
        <p><strong>Gender:</strong> {doctorDetails.gender}</p>
        <p><strong>Address:</strong> {doctorDetails.address}</p>
        <p><strong>Phno:</strong> {doctorDetails.phno}</p>

      </div>

      <div className="patient-search">
        <h3>Search Patient Reports</h3>
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {patientDetails && (
        <div className="patient-details">
          <h3>Patient Details</h3>
          <p><strong>Name:</strong> {patientDetails.name}</p>
          <p><strong>Age:</strong> {patientDetails.age}</p>
          <p><strong>Gender:</strong> {patientDetails.gender}</p>
          <button onClick={() => navigate(`/doctor/reports/${patientId}`)}>
            View Reports
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
