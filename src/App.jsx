// src/App.jsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
// import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
// import authService from "./services/authService";

const App = () => {
  // const [authenticated, setAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       const result = await authService.checkAuthStatus();
  //       setAuthenticated(true);
  //     } catch (error) {
  //       setAuthenticated(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignUpPage />} path="/signup" />

    </Routes>
  );
};

export default App;
