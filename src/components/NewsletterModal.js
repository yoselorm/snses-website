import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { api_url_v1 } from "../utils/config";
import newsletterImg from "../assets/comm03.jpeg"; 
import logo from '../assets/logozzz.png';
import { Link } from "react-router-dom";

const NewsletterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage("");

    try {
      const response = await axios.post(
        `${api_url_v1}/addEmailToNewsletter`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setStatus('success');
      setMessage(response.data?.message || 'Successfully subscribed!');
      
      // Reset and close after 2 seconds
      setTimeout(() => {
        setEmail("");
        setStatus(null);
        setMessage("");
        onClose();
      }, 2000);

    } catch (error) {
      setStatus('error');
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.status === 409) {
        setMessage('This email is already subscribed');
      } else {
        setMessage(error.message || 'Failed to subscribe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !loading) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="w-[90%] max-w-3xl bg-white flex flex-col md:flex-row overflow-hidden shadow-2xl font-garamond"
          >
            {/* Left Section - Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={newsletterImg}
                alt="Newsletter Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Section - Form */}
            <div className="w-full md:w-1/2 bg-[#4b0c0c] text-[#d4af37] text-center flex flex-col justify-center items-center px-6 py-10 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                disabled={loading}
                className="absolute top-3 right-4 text-gray-300 hover:text-white text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                x
              </button>

              {/* Logo Image */}
              <img 
                src={logo} 
                alt="SNSES Logo" 
                className="h-16 w-auto mb-6 object-contain"
              />

              {/* Offer */}
              <p className="text-lg font-light mb-6 text-[#e6c76e]">
                Enjoy 10% Off Your First Order
              </p>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="w-full max-w-xs mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-200 text-sm">
                  {message}
                </div>
              )}

              {status === 'error' && (
                <div className="w-full max-w-xs mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">
                  {message}
                </div>
              )}

              {/* Email Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full max-w-xs gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 text-sm text-black bg-white placeholder-gray-500 outline-none disabled:bg-gray-200 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-2 text-sm tracking-wide font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SUBMITTING...
                    </>
                  ) : (
                    'SUBMIT'
                  )}
                </button>
              </form>

              {/* No Thanks */}
              <button
                onClick={onClose}
                disabled={loading}
                className="mt-4 text-sm underline text-[#e6c76e] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                No Thanks
              </button>

              {/* Terms */}
              <p className="text-[11px] text-gray-300 mt-6 max-w-sm leading-snug">
                By entering your email, you agree to our{" "}
                <Link to='/privacy' className="underline text-[#e6c76e]">
                  Terms and Conditions
                </Link>{" "}
                &{" "}
                <a href="/terms" className="underline text-[#e6c76e]">
                  Privacy Policy
                </a>.
              </p>

              <p className="text-[10px] text-gray-400 mt-3">
                *Discount only for first-time subscribers
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;