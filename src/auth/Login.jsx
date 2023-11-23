import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ email, password, role });
      // Assuming that the login function sets the user role in the context
      // You can get the role from the context and redirect accordingly
      const { user } = useAuth();
      
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
      <form onSubmit={(e) => e.preventDefault()}>
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

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
          <option value="farmer">Farmer</option>
        </select>

        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
