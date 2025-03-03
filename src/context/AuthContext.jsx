import React, { createContext, useState, useEffect, useRef } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const qrUsageTrackerRefs = useRef([]);
  
  // Register QRUsageTracker refs to update when auth state changes
  const registerQRUsageTracker = (ref) => {
    if (ref && !qrUsageTrackerRefs.current.includes(ref)) {
      qrUsageTrackerRefs.current.push(ref);
    }
  };
  
  // Update all registered QRUsageTrackers when auth state changes
  useEffect(() => {
    qrUsageTrackerRefs.current.forEach(tracker => {
      if (tracker.current && tracker.current.setAuthenticated) {
        tracker.current.setAuthenticated(isAuthenticated);
      }
    });
  }, [isAuthenticated]);
  
  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Auth functions
  const login = () => {
    // Here you would implement actual login logic
    // For demo purposes:
    const demoUser = { id: 1, name: "Demo User" };
    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(demoUser));
  };
  
  const signup = () => {
    // Here you would implement actual signup logic
    // For demo purposes:
    const newUser = { id: Date.now(), name: "New User" };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        signup, 
        logout, 
        registerQRUsageTracker 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;