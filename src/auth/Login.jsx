import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import authService from "../services/authService";

const Login = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const result = await authService.login({ email, password});
      // console.log("Login successful!");
  
      // Assuming that the login function sets the user role in the context
      const { user, access_token, refresh_token } = result;

        // Store tokens in localStorage or state
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    // console.log("Access Token:", localStorage.getItem("access_token"));
    // console.log("Refresh Token:", localStorage.getItem("refresh_token"));
  
      switch (user.role) {
        case "buyer":
          navigate("/buyer");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "farmer":
          navigate("/farmer");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      // Handle login error

      console.error("Login failed:", error.message, error.response);
  
      // Print the entire error object for more details
      console.error("Error details:", error);
  
      // Handle the error appropriately based on the status code
      if (error.response?.status === 401) {
        console.error("Unauthorized access. Please check your credentials.");
      } else {
        console.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
          <option value="farmer">Farmer</option>
        </select> */}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
