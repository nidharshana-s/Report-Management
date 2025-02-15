import React from "react";
import { useNavigate } from "react-router-dom";
import "./SelectUser.css";
// import Sidebar from "../Layout/Sidebar"; // Ensure Sidebar path is correct

const SelectUser = () => {
  const navigate = useNavigate();

  return (
    <div className="select-container">
      <div className="select-box animate-slide-in">
        <h2 className="select-title">Welcome to Patient Report System</h2>
        <p className="select-subtitle">Choose Your Role</p>

        <div className="button-group">
          <button onClick={() => navigate("/patient-auth")} className="select-btn animate-bounce">Patient</button>
          <button onClick={() => navigate("/doctor-auth")} className="select-btn animate-bounce">Doctor</button>
        </div>
      </div>
    </div>
  );
};

export default SelectUser;
