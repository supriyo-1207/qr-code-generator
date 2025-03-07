import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import UsageLimitModal from './UsageLimitModal';

const QRUsageTracker = forwardRef((props, ref) => {
  const [qrCount, setQrCount] = useState(() => {
    // Get initial count from localStorage if available
    const savedCount = localStorage.getItem('qrGeneratedCount');
    return savedCount ? parseInt(savedCount, 0) : 0;
  });
  
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize authentication state from localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  // Check authentication status whenever component renders
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };
    
    // Check immediately
    checkAuthStatus();
    
    // Set up an interval to check periodically (optional, but helps with sync issues)
    const intervalId = setInterval(checkAuthStatus, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Update localStorage when count changes
  useEffect(() => {
    localStorage.setItem('qrGeneratedCount', qrCount.toString());
    
    // Show modal when limit is reached and user is not authenticated
    if (qrCount >= 3 && !isAuthenticated && !showModal) {
      setShowModal(true);
    }
  }, [qrCount, isAuthenticated, showModal]);
  
  const handleGenerateQR = () => {
    // First, check the current authentication status from localStorage
    const currentAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(currentAuthStatus);
    
    // This function would be called whenever a QR code is generated
    if (currentAuthStatus || qrCount < 3) {
      // Logic to generate QR code
      setQrCount(prevCount => prevCount + 1);
      return true; // QR generation allowed
    } else {
      setShowModal(true);
      return false; // QR generation blocked
    }
  };
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleGenerateQR,
    resetUsage: () => {
      setQrCount(0);
      localStorage.setItem('qrGeneratedCount', '0');
    },
    getCount: () => qrCount,
    isAuthenticated: () => localStorage.getItem('isAuthenticated') === 'true', // Always check localStorage
    setAuthenticated: (value) => {
      setIsAuthenticated(value);
      // Optionally sync with localStorage if you're using this method
      if (value) {
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        localStorage.removeItem('isAuthenticated');
      }
    }
  }));
  
  return (
    <>
      {/* The modal component */}
      <UsageLimitModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
});

export default QRUsageTracker;