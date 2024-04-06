// authContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');

  // Retrieve token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, authToken, setAuthenticated, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};