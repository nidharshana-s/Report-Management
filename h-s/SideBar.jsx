// src/components/Layout/Sidebar.jsx
import React from "react";

import { NavLink } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import logo from "../../assets/logo.png";

const Sidebar = ({ userType }) => {
  return (
    <div className="w-64 h-screen bg-[#1995AD] text-white flex flex-col p-4 fixed">
      <img src={logo} alt="Logo" className="w-32 mx-auto mb-6" />
      <nav className="space-y-4 flex-1">
        <NavLink to={userType === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"} className="block p-3 rounded hover:bg-[#A1D6E2]">Dashboard</NavLink>
      </nav>
      <button className="mt-auto flex items-center gap-2 p-3 bg-red-500 rounded hover:bg-red-600">
        <FiLogOut /> Logout
      </button>
    </div>
  );
};
export default Sidebar;
