// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LogoutPage from "./pages/LogoutPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import BuyerDashboard from "./components/buyer/BuyerDashboard";
import FarmerDashboard from "./components/farmer/FarmerDashboard";
import { AuthProvider } from "./auth/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LogoutPage />} path="/logout" />
        {/* various Dashboards */}
        <Route element={<FarmerDashboard />} path="/farmer" />
        <Route element={<AdminDashboard />} path="/admin" />
        <Route element={<BuyerDashboard />} path="/buyer" />
      </Routes>
    </AuthProvider>
  );
};

export default App;
