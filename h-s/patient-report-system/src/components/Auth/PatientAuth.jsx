import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientAuth.css";

const PatientAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", age: "", gender: "", phno: "", address: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!formData.phno) {
      alert("Please enter a phone number.");
      return;
    }
    try {
      await axios.post("/api/patient/send-otp", { phno: formData.phno });
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await axios.post("/api/patient/login", { phno: formData.phno, otp: formData.otp });
        navigate("/patient-dashboard");
      } else {
        await axios.post("/api/patient/register", {
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          phno: formData.phno,
          address: formData.address,
        });
        alert("Registration Successful! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box animate-slide-in">
        <h2 className="auth-title">{isLogin ? "Patient Login" : "Patient Registration"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="input-field animate-fade-in" required />
              <input type="number" name="age" placeholder="Age" onChange={handleChange} className="input-field animate-fade-in" required />
              <select name="gender" onChange={handleChange} className="input-field animate-fade-in" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="address" placeholder="Address" onChange={handleChange} className="input-field animate-fade-in" required />
            </>
          )}

          <input type="tel" name="phno" placeholder="Phone Number" onChange={handleChange} className="input-field animate-fade-in" required />

          {isLogin && (
            <>
              <button type="button" onClick={sendOtp} className="otp-btn">
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>
              <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} className="input-field animate-fade-in" required />
            </>
          )}

          <button type="submit" className="submit-btn animate-bounce">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "New user?" : "Already have an account?"}
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default PatientAuth;
