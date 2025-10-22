import React from 'react';
import { Hammer } from 'lucide-react';
import { motion } from 'framer-motion';

const Shop = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#f4f1eb] text-center px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        className="mb-6"
      >
        <Hammer size={80} className="text-amber-600" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-4xl font-semibold text-gray-800 mb-3 tracking-wide"
      >
        This Page is Under Construction
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-600 text-sm md:text-base max-w-md"
      >
        We’re currently working on something exciting for you. Please check back soon!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >
        <div className="w-48 h-1 bg-amber-600 rounded-full animate-pulse"></div>
      </motion.div>
    </div>
  );
};

export default Shop;
