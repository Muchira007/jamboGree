// src/contexts/authContexts.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../services/apiClient';
import Cookies from 'js-cookie';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (loginData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('authToken');
      if (token) {
        try {
          const response = await apiClient.post('/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (loginData: { email: string; password: string }) => {
    try {
      const response = await apiClient.post('/login', loginData);
      const { token, user } = response.data;
      console.log(token);
      Cookies.set('authToken', token, { expires: 1 }); // Set cookie with 1 day expiration
      setUser(user);
      console.log('Login successful:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
