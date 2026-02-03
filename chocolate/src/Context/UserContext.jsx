
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      const { access, refresh, user: userData } = res.data;

      // Store tokens and user data
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      return userData; // Return the full user object
    } catch (err) {
      console.error('Login error:', err);
      return null;
    }
  };

  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('Registration error:', err);
      return {
        success: false,
        error: err.response?.data || 'Registration failed'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.warn('⚠️ Failed to parse stored user');
        setUser(null);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
