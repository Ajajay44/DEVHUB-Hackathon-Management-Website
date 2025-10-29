// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useCustomToast from '../hooks/useCustomToast';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useCustomToast();

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        // Set the token in axios headers for all future requests
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
          // Fetch user data using the protected /me route
          const res = await axios.get('http://localhost:5000/api/auth/me');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          // Token is invalid (e.g., expired)
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
          delete axios.defaults.headers.common['x-auth-token'];
        }
      }
      setLoading(false); // We're done loading
    };
    
    loadUser();
  }, [token]); // This effect re-runs whenever the token changes

  // 3. Login Function
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setIsAuthenticated(true);
      toast.success('Login successful! Welcome back');
      return { success: true };
    } catch (err) {
      console.error(err.response.data);
      toast.error(err.response.data.msg || 'Login failed. Please try again.');
      return { success: false, message: err.response.data.msg };
    }
  };

  // 4. Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['x-auth-token'];
    toast.info('You have been logged out');
  };

  // 5. Provide the values to children components
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 6. Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};