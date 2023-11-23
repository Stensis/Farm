// src/auth/authService.js
const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  const getToken = () => {
    // Implement your logic to retrieve the token from storage (localStorage, sessionStorage, etc.)
    // For example, if you are using localStorage:
    return localStorage.getItem('accessToken');
  };
  
  const checkTokenExpiry = (token) => {
    const decodedToken = decodeToken(token);
  
    if (decodedToken && decodedToken.exp) {
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
  
      // Check if the token is expired
      return expirationTime > currentTime;
    }
  
    // Token is invalid or does not have an expiration time
    return false;
  };
  
  // Your existing authService code...
  
  export default {
    // Export your existing authService functions...
    decodeToken,
    checkTokenExpiry,
    getToken,
  };
  