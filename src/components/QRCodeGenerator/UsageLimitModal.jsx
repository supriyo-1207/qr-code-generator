import React from 'react';
import { useNavigate } from 'react-router-dom';
const UsageLimitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/signin'); // Redirect to the login page
  };
  const handlesignup = () => {
    navigate('/signup'); // Redirect to the login page
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}
        
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">You've reached the free limit!</h3>
          <p className="text-gray-600">
            You've generated 3 QR codes. Sign up for free or log in to continue generating unlimited QR codes.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handlesignup}
            className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign up for free
          </button>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Log in to your account
          </button>
          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">
              Create an account to save your QR codes and access premium features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageLimitModal;