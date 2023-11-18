import React, { useState } from "react";
import authService from "../services/authService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Default to 'buyer'
  const [fullName, setFullName] = useState("");
  const [tel, setTel] = useState("");
  const [location, setLocation] = useState("");

  const handleSignup = async () => {
    try {
      const signupData = {
        user: {
          email,
          password,
          role: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize the first letter
          full_name: fullName,
          tel,
          location,
        },
      };

      console.log("Signup data:", signupData); // Log the data being sent

      const result = await authService.signup(signupData);
      console.log("Sign up response data: ", result);
      // Handle the signup result as needed
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Telephone:</label>
        <input
          type="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
        />

        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
          <option value="farmer">Farmer</option>
        </select>

        <button onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
