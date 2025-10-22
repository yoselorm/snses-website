import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import newsletterImg from "../assets/newsletter.jpg"; 

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
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white w-[90%] max-w-4xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row font-garamond"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              x
            </button>

            {/* Left Section */}
            <div className="flex-1 p-8 flex flex-col justify-center text-left bg-[#faf8f6]">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl font-light text-gray-900 mb-4"
              >
                Join Our Circle of Inspiration ✨
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mb-6 leading-relaxed text-[15px]"
              >
                Be the first to discover new scents, timeless designs, and exclusive offers
                crafted for those who appreciate artistry and simplicity.
              </motion.p>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 border border-b text-sm outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="bg-amber-600 text-white px-6 py-3 text-sm font-semibold hover:bg-amber-700 transition"
                >
                  Subscribe
                </motion.button>
              </motion.form>
            </div>

            {/* Right Section (Image) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 hidden md:block"
            >
              <img
                src={newsletterImg}
                alt="Newsletter Invitation"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
