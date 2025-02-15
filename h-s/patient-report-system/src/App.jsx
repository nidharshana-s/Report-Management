import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectUser from "./components/Auth/SelectUser";
import Login from "./components/Auth/login";
import PatientAuth from "./components/Auth/PatientAuth";
import DoctorAuth from "./components/Auth/DoctorAuth";
import PatientDashboard from "./components/Dashboard/PatientDashboard";
import DoctorDashboard from "./components/Dashboard/DoctorDashboard";
import ViewReports from "./components/reports/ViewReports";
import UploadReport from "./components/reports/UploadReports";
import ViewReportPdf from "./components/reports/ViewReports";
// import Register from "./components/auth/Register";
// import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>  {/* ✅ Wrap Routes inside Router */}
      <Routes>
        <Route path="/" element={<SelectUser />} />
        <Route path="/" element={<Login />} />
        <Route path="/patient-auth" element={<PatientAuth />} />
        <Route path="/doctor-auth" element={<DoctorAuth />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} /> 
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/upload-report" element={<UploadReport />} />
        <Route path="/patient/view-reports" element={<ViewReports />} />
        <Route path="/patient/view-report/:reportId" element={<ViewReportPdf />} />

        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/view-reports/:patientId" element={<ViewReports />} />
        <Route path="/doctor/view-report/:reportId" element={<ViewReportPdf />} />
      </Routes>
    </Router>
  );
}

export default App;
