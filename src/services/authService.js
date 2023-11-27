// src/services/authService.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3001";

const authService = {
  signup: async (userData) => {
    console.log("signup data received: ", userData);
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData);
      console.log("signup response data: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error.response.data);
      throw error;
    }
  },

  login: async (loginUserData) => {
    console.log("login data received: ", loginUserData);
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

      const response = await axios.post(`${BASE_URL}/login`, loginUserData, {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      });
      // Check if the response object exists and has a data property
      if (response && response.data) {
        console.log("login response data: ", response.data);
        return response.data;
      } else {
        console.error("Login failed: No data in the response");
        throw new Error("Login failed: No data in the response");
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  checkAuthStatus: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth_check`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshTokens: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/refresh_token`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/logout`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
