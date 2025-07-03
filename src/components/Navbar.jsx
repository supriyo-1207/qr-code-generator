import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext'; 
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check localStorage on component mount
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated');
      return auth === 'true';
    };
    
    // Force re-render if authentication state changes
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // const API_URL = import.meta.env.VERCEl_API_URL || "http://localhost:5000";

  const handleLogout = async() => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/logout",{
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      if (response.status === 200) {
        localStorage.removeItem('isAuthenticated');
        toast.success("Logout successful");
        navigate('/signin'); // Redirect to the login page
      }
    } catch (error) {
      console.error(error);
    }
    navigate('/signin'); // Redirect to the login page
  };
  
  const handleLogin = () => {
    navigate('/signin'); // Redirect to the login page
  };
  
  const handleSignup = () => {
    navigate('/signup'); // Redirect to the signup page
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <svg
            className="w-8 h-8 mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <span className="text-xl font-bold text-gray-800">QR Generator</span>
        </div>
        
        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {localStorage.getItem('isAuthenticated') === 'true' ? (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Log out
            </button>
          ) : (
            <>
              <button 
                onClick={handleLogin}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={handleSignup}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
              >
                Sign up free
              </button>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 px-2 pt-2 pb-4 space-y-1">
          <div className="pt-4 border-t border-gray-200">
            {localStorage.getItem('isAuthenticated') === 'true' ? (
              <button 
                onClick={handleLogout}
                className="w-full px-3 py-2 text-left text-blue-600 hover:bg-gray-100 rounded-md"
              >
                Log out
              </button>
            ) : (
              <>
                <button 
                  onClick={handleLogin}
                  className="w-full px-3 py-2 text-left text-blue-600 hover:bg-gray-100 rounded-md"
                >
                  Log in
                </button>
                <button 
                  onClick={handleSignup}
                  className="w-full mt-2 px-3 py-2 text-left text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Sign up free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;