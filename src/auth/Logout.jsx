import React from "react";
import { useNavigate } from "react-router-dom";
// import authService from "../services/authService";
import { useAuth } from "../auth/AuthContext";

const Logout = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout function from the authentication service
      await authService.logout();

      // Clear the access token in the context
      setAccessToken(null);

      // Redirect the user to the home page or login page
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle the logout error (e.g., display an error message to the user)
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
