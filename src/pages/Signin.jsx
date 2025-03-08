import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const API_URL = import.meta.env.VERCEl_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    
    try {
      const response = await axios.post("https://qr-code-backend-liard.vercel.app/api/v1/auth/signin ", {
        email: email,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      // console.log("Login Response:", response.data);
      
      if (response.status === 200) {
        // Store authentication status in localStorage or context
        localStorage.setItem('isAuthenticated', 'true');
        // You might want to store the token as well
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        toast.success("Login successful");
        setLoading(false);
        navigate("/"); // Navigate to homepage after successful login
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Invalid email or password");
      // console.error("Login Error:", error.response?.data || error.message);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md border border-gray-300 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
        
       
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl text-white font-semibold shadow-md transition-all"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Don't have an account?
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:text-blue-500 ml-1"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;