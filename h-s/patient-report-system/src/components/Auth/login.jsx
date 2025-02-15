import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../../styles/login.css";

const Login = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role || !username || !password) {
      alert("Please enter all fields");
      return;
    }

    if (role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (role === "patient") {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
