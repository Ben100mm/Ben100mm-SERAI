'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient, ApiResponse } from '@/lib/api';

interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'GUEST' | 'HOST' | 'ADMIN' | 'SUPER_ADMIN';
  isVerified: boolean;
  isActive: boolean;
  preferences?: {
    language: string;
    currency: string;
    timezone: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  socialLogin: (socialData: {
    provider: 'google' | 'facebook' | 'apple';
    providerId: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Development mode: Check if auto-login is enabled
        if (process.env.NODE_ENV === 'development') {
          const autoLoginEnabled = localStorage.getItem('dev-auto-login-enabled');
          
          // If auto-login is disabled, don't auto-login
          if (autoLoginEnabled === 'false') {
            setIsLoading(false);
            return;
          }
          
          // Auto-login with mock user (default behavior)
          const mockUser: User = {
            id: 'dev-user-123',
            email: 'dev@serai.com',
            firstName: 'Development',
            lastName: 'User',
            phone: '+1 (555) 123-4567',
            role: 'GUEST',
            isVerified: true,
            isActive: true,
            preferences: {
              language: 'en',
              currency: 'CAD',
              timezone: 'America/Toronto',
              emailNotifications: true,
              smsNotifications: false,
              pushNotifications: true,
            },
          };

          const mockToken = 'dev-mock-token-12345';

          setUser(mockUser);
          setToken(mockToken);
          apiClient.setToken(mockToken);
          localStorage.setItem('token', mockToken);
          
          console.log('🚀 Development mode: Auto-logged in as mock user');
          setIsLoading(false);
          return;
        }

        // Production mode: Check stored token
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          apiClient.setToken(storedToken);
          const response = await apiClient.getMe() as ApiResponse<User>;
          if (response.success && response.data) {
            setUser(response.data);
            setToken(storedToken);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('token');
            apiClient.setToken(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        apiClient.setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Development mode: Always succeed with mock user
      if (process.env.NODE_ENV === 'development') {
        const mockUser: User = {
          id: 'dev-user-123',
          email: email || 'dev@serai.com',
          firstName: 'Development',
          lastName: 'User',
          phone: '+1 (555) 123-4567',
          role: 'GUEST',
          isVerified: true,
          isActive: true,
          preferences: {
            language: 'en',
            currency: 'CAD',
            timezone: 'America/Toronto',
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
          },
        };

        const mockToken = 'dev-mock-token-12345';

        setUser(mockUser);
        setToken(mockToken);
        apiClient.setToken(mockToken);
        localStorage.setItem('token', mockToken);
        
        console.log('🚀 Development mode: Login successful with mock user');
        return { success: true };
      }
      
      // Production mode: Use real API
      const response = await apiClient.login({ email, password }) as ApiResponse<AuthResponse>;
      
      if (response.success && response.data) {
        const { user: userData, token: authToken, refreshToken } = response.data;
        
        setUser(userData);
        setToken(authToken);
        apiClient.setToken(authToken);
        localStorage.setItem('token', authToken);
        
        // Store refresh token for future use
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) => {
    try {
      setIsLoading(true);
      
      // Development mode: Always succeed with mock user
      if (process.env.NODE_ENV === 'development') {
        const mockUser: User = {
          id: 'dev-user-123',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone || '+1 (555) 123-4567',
          role: 'GUEST',
          isVerified: true,
          isActive: true,
          preferences: {
            language: 'en',
            currency: 'CAD',
            timezone: 'America/Toronto',
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
          },
        };

        const mockToken = 'dev-mock-token-12345';

        setUser(mockUser);
        setToken(mockToken);
        apiClient.setToken(mockToken);
        localStorage.setItem('token', mockToken);
        
        console.log('🚀 Development mode: Registration successful with mock user');
        return { success: true };
      }
      
      // Production mode: Use real API
      const response = await apiClient.register(userData) as ApiResponse<AuthResponse>;
      
      if (response.success && response.data) {
        const { user: userData, token: authToken, refreshToken } = response.data;
        
        setUser(userData);
        setToken(authToken);
        apiClient.setToken(authToken);
        localStorage.setItem('token', authToken);
        
        // Store refresh token for future use
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration' };
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (socialData: {
    provider: 'google' | 'facebook' | 'apple';
    providerId: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }) => {
    try {
      setIsLoading(true);
      
      // Development mode: Always succeed with mock user
      if (process.env.NODE_ENV === 'development') {
        const mockUser: User = {
          id: 'dev-user-123',
          email: socialData.email || 'dev@serai.com',
          firstName: socialData.firstName || 'Development',
          lastName: socialData.lastName || 'User',
          phone: '+1 (555) 123-4567',
          avatar: socialData.avatar,
          role: 'GUEST',
          isVerified: true,
          isActive: true,
          preferences: {
            language: 'en',
            currency: 'CAD',
            timezone: 'America/Toronto',
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
          },
        };

        const mockToken = 'dev-mock-token-12345';

        setUser(mockUser);
        setToken(mockToken);
        apiClient.setToken(mockToken);
        localStorage.setItem('token', mockToken);
        
        console.log('🚀 Development mode: Social login successful with mock user');
        return { success: true };
      }
      
      // Production mode: Use real API
      const response = await apiClient.socialLogin(socialData) as ApiResponse<AuthResponse>;
      
      if (response.success && response.data) {
        const { user: userData, token: authToken, refreshToken } = response.data;
        
        setUser(userData);
        setToken(authToken);
        apiClient.setToken(authToken);
        localStorage.setItem('token', authToken);
        
        // Store refresh token for future use
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Social login failed' };
      }
    } catch (error) {
      console.error('Social login error:', error);
      return { success: false, message: 'An error occurred during social login' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiClient.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      apiClient.setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        return false;
      }

      const response = await apiClient.refreshToken(storedRefreshToken) as ApiResponse<{ token: string; refreshToken?: string }>;
      
      if (response.success && response.data) {
        const { token: newToken, refreshToken: newRefreshToken } = response.data;
        
        setToken(newToken);
        apiClient.setToken(newToken);
        localStorage.setItem('token', newToken);
        
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }
        
        return true;
      } else {
        // Refresh token is invalid, logout user
        await logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    socialLogin,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};