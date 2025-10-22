import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  subscribeToAuthChanges,
  loginUser,
  registerUser,
  logoutUser,
  resetPassword,
  getUserData,
} from '../services/authService';

// Create Auth Context
const AuthContext = createContext({});

/**
 * AuthProvider component
 * Manages authentication state and provides auth methods to children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Subscribe to authentication state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async authUser => {
      setLoading(true);
      if (authUser) {
        setUser(authUser);
        // Fetch additional user data from Firestore
        try {
          const data = await getUserData(authUser.uid);
          setUserData(data);
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Login with email and password
   */
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      await loginUser(email, password);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (email, password, displayName) => {
    try {
      setError(null);
      setLoading(true);
      await registerUser(email, password, displayName);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      setError(null);
      await logoutUser();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    }
  };

  /**
   * Send password reset email
   */
  const forgotPassword = async email => {
    try {
      setError(null);
      await resetPassword(email);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err };
    }
  };

  const value = {
    user,
    userData,
    loading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
