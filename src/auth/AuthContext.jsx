// src/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../../src/auth/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async (userData) => {
    try {
      const result = await authService.login(userData);
      setAccessToken(result.access_token);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Propagate the error for handling in the UI
    }
  };

  const signup = async (userData) => {
    try {
      const result = await authService.signup(userData);
      setUser(result.user);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; // Propagate the error for handling in the UI
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setAccessToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Propagate the error for handling in the UI
    }
  };

  const checkAuthStatus = async () => {
    try {
      const token = authService.getToken();
  
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }
  
      // Add the token to the request headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Rest of your code...
    } catch (error) {
      console.error("Error checking auth status:", error);
    }
  };
  
  // On component mount, check the authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const contextValue = {
    user,
    accessToken,
    login,
    signup,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
