import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'; // We'll create this context
import { Link,useNavigate  } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, login, signup, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handlelogout = () => {
    navigate('/login'); // Redirect to the login page
  };
  const handleLogin = () => {
    navigate('/signin'); // Redirect to the login page
  };
  const handlesignup = () => {
    navigate('/signup'); // Redirect to the login page
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
        
        {/* Desktop Navigation */}
        {/* <div className="hidden md:flex items-center space-x-4">
          <Link to="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link to="#templates" className="text-gray-600 hover:text-blue-600 transition-colors">
            Templates
            </Link>
          <Link to="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
            </Link>
          <Link to="#help" className="text-gray-600 hover:text-blue-600 transition-colors">
            Help
            </Link>
        </div> */}
        
        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <button 
              onClick={handlelogout}
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
                onClick={handlesignup}
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
         <Link to="#features" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600">
            Features
            </Link>
          <Link to="#templates" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600">
            Templates
            </Link>
          <Link to="#pricing" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600">
            Pricing
            </Link>
          <Link to="#help" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600">
            Help
            </Link>
          <div className="pt-4 border-t border-gray-200">
            {isAuthenticated ? (
              <button 
                onClick={handlelogout}
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
                  onClick={handlesignup}
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