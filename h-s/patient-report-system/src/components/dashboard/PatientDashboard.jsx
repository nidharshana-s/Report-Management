import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const navigate = useNavigate();
  // const [patientDetails, setPatientDetails] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    name: "John Doe",
    age: 30,
    gender: "Male",
    phno: "9876543210",
    address: "123 Street",
  });
  
  const patientId = "P12345"; 

  useEffect(() => {
    // Fetch patient details from backend
    fetch(`http://localhost:5000/api/patient/${patientId}`)
      .then((res) => res.json())
      .then((data) => setPatientDetails(data))
      .catch((error) => console.error("Error fetching patient details:", error));
  }, [patientId]);

  return (
    <div className="patient-dashboard">
      <h2>Patient Dashboard</h2>

      {patientDetails ? (
        <div className="patient-info">
          <p><strong>Name:</strong> {patientDetails.name}</p>
          <p><strong>Age:</strong> {patientDetails.age}</p>
          <p><strong>Gender:</strong> {patientDetails.gender}</p>
          <p><strong>Phone:</strong> {patientDetails.phno}</p>
          <p><strong>Address:</strong> {patientDetails.address}</p>
        </div>
      ) : (
        <p>Loading patient details...</p>
      )}

      <div className="patient-actions">
        <button onClick={() => navigate(`/patient/upload/${patientId}`)}>
          Upload Report
        </button>
        <button onClick={() => navigate(`/patient/reports/${patientId}`)}>
          View Reports
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
