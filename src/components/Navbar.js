import React, { useState } from 'react';
import { User, Heart, ShoppingCart, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/main-logo.png';

const Navbar = () => {
  const location = useLocation();
  const [cartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthenticated] = useState(false); // Change this dynamically when you integrate auth
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'NEWS', path: '/news' },
    { name: 'OUR STORY', path: '/our-story' },
    { name: 'COMMUNITY', path: '/community' },
    // { name: 'CONTACT US', path: '/contact' },
  ];

  const activePage = pages.find(p => p.path === location.pathname)?.name;

  return (
    <nav className="font-metro-nova tracking-[1px] w-full bg-[#f4f1eb] border-b border-gray-200 sticky top-0 left-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition">
              <User size={20} />
              <span className="text-sm font-medium">Sign In</span>
            </button>
          ) : (
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
            >
              <User size={20} />
              <span className="text-sm font-medium">My Account</span>
            </Link>
          )}
        </div>

        {/* Center Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="SNSES Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Wishlist Button */}
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition relative"
            onClick={() => {
              setIsWishlistOpen(!isWishlistOpen);
              setIsCartOpen(false);
            }}
          >
            <Heart size={20} />
            {/* <span className="text-sm font-medium hidden sm:inline">Wishlist</span> */}
          </button>

          {/* Cart Button */}
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition relative"
            onClick={() => {
              setIsCartOpen(!isCartOpen);
              setIsWishlistOpen(false);
            }}
          >
            <ShoppingCart size={20} />
            {/* <span className="text-sm font-medium hidden sm:inline">Cart</span> */}
            <span className="-ml-1 text-sm text-gray-500">{cartCount}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="sm:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <span className="text-xl">☰</span>}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Nav */}
          <ul className="hidden sm:flex items-center justify-center gap-20 py-4">
            {pages.map((page) => {
              const isActive = activePage === page.name;
              return (
                <li key={page.name} className="relative group">
                  <Link
                    to={page.path}
                    className={`text-[9px] font-thin ${
                      isActive ? 'text-amber-600' : 'text-gray-500'
                    } hover:text-amber-600 transition`}
                  >
                    {page.name}
                  </Link>

                  {/* Animated underline */}
                  <motion.div
                    layoutId="underline"
                    className={`absolute left-0 bottom-0 h-[2px] bg-amber-600`}
                    initial={false}
                    animate={{
                      width: isActive ? '100%' : '0%',
                    }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeInOut',
                    }}
                  />
                </li>
              );
            })}
          </ul>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:hidden items-center gap-4 py-4 bg-white border-t border-gray-100"
              >
                {pages.map((page) => (
                  <li key={page.name}>
                    <Link
                      to={page.path}
                      className={`text-[x-small] ${
                        activePage === page.name
                          ? 'text-amber-600'
                          : 'text-gray-600 hover:text-amber-600'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 🛒 Cart Dropdown */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute right-4 top-20 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Your Cart ({cartCount})</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="text-center py-8 text-gray-500">
              Shopping cart is empty!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ❤️ Wishlist Dropdown */}
      <AnimatePresence>
        {isWishlistOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute right-28 top-20 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Your Wishlist</h3>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {isAuthenticated ? (
              <div className="text-center py-8 text-gray-500">
                Your wishlist is empty!
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Kindly <span className="text-amber-600 font-semibold">login</span> to view your wishlist.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
