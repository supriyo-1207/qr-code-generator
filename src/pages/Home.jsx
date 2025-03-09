import React, { useRef, useContext, useEffect } from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator/QRCodeGenerator';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';

function Home() {
  const qrUsageTrackerRef = useRef();
  const { registerQRUsageTracker } = useContext(AuthContext);
  
  // Register the QRUsageTracker ref with AuthContext
  useEffect(() => {
    if (qrUsageTrackerRef.current) {
      registerQRUsageTracker(qrUsageTrackerRef);
    }
  }, [registerQRUsageTracker]);
  
  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* QR code generator */}
      <div className="min-h-screen bg-gray-50">
        <QRCodeGenerator qrUsageTrackerRef={qrUsageTrackerRef} />
      </div>
    </>
  );
}

export default Home;