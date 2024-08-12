import React, { createContext, useState, useEffect } from 'react';
import { login, logout, registerUser as register } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      const userData = await login(email, password);
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      } else {
        throw new Error('No se recibieron datos de usuario');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const registerUser = async (userData) => {
    const newUser = await register(userData);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserContext = (updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
    localStorage.setItem('user', JSON.stringify({
      ...JSON.parse(localStorage.getItem('user')),
      ...updatedUserData
    }));
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser, loading, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};