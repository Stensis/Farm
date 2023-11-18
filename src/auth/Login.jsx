// src/components/Login.jsx
import React, { useState } from "react";
import authService from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async () => {
    try {
      const result = await authService.login({
        user: { email, password, role },
      });
      console.log("login response data: ", result); // Handle the authentication result
    } catch (error) {
      console.error("Login failed:", error);
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

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
          <option value="farmer">Farmer</option>
        </select>

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
