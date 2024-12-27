import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('authToken') || null;
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('userName') || null;
  });

  // Function to handle user register
  const register = (token, name) => {
    setAuthToken(token); 
    setUsername(name);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name);
  };

  // Function to handle logout
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('username'); 
  };

  useEffect(() => {
    console.log('AuthToken updated:', authToken);
    console.log('Username updated:', username);
  }, [authToken, username]);

  return (
    <AuthContext.Provider value={{ authToken, username, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
