import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import newsletterImg from "../assets/newsletter.jpg"; // Replace with your background image

const NewsletterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
            <div className="w-full md:w-1/2 bg-[#4b0c0c] text-center flex flex-col justify-center items-center px-6 py-10 text-[#d4af37] relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-4 text-gray-300 hover:text-white text-xl"
              >
                ×
              </button>

              {/* Logo */}
              <h2 className="text-3xl font-semibold tracking-[0.2em] mb-6">SNSES</h2>

              {/* Offer */}
              <p className="text-lg font-light mb-6 text-[#e6c76e]">
                Enjoy 10% Off Your First Order
              </p>

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
                  className="w-full px-4 py-2 text-sm text-black bg-white placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 text-sm tracking-wide font-semibold hover:bg-gray-800 transition"
                >
                  SUBMIT
                </button>
              </form>

              {/* No Thanks */}
              <button
                onClick={onClose}
                className="mt-4 text-sm underline text-[#e6c76e] hover:text-white"
              >
                No Thanks
              </button>

              {/* Terms */}
              <p className="text-[11px] text-gray-300 mt-6 max-w-sm leading-snug">
                By entering your email, you agree to our{" "}
                <a href="#" className="underline text-[#e6c76e]">
                  Terms and Conditions
                </a>{" "}
                &{" "}
                <a href="#" className="underline text-[#e6c76e]">
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
