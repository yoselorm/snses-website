import React, { useState, useRef, useEffect } from 'react';
import { User, Heart, ShoppingCart, X, Search } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo-name.png';
import AuthModal from './AuthModal';

const Navbar = () => {
  const location = useLocation();
  const [cartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);


  // Mock product data - replace with your actual products
  const allProducts = [
    { id: 1, name: 'African Print Dress', category: 'Dresses', price: 89.99 },
    { id: 2, name: 'Kente Cloth Shirt', category: 'Shirts', price: 65.00 },
    { id: 3, name: 'Ankara Skirt', category: 'Skirts', price: 55.00 },
    { id: 4, name: 'Dashiki Top', category: 'Tops', price: 45.00 },
    { id: 5, name: 'African Jewelry Set', category: 'Accessories', price: 35.00 },
    { id: 6, name: 'Adire Fabric', category: 'Fabrics', price: 25.00 },
  ];

  const pages = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    // { name: 'NEWS', path: '/news' },
    { name: 'OUR STORY', path: '/our-story' },
    { name: 'COMMUNITY', path: '/community' },
    // { name: 'CONTACT US', path: '/contact' },
  ];

  const activePage = pages.find(p => p.path === location.pathname)?.name;

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    if (isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  return (
    
    <nav className="font-metro-nova tracking-[1px] w-full bg-[#f4f1eb] border-b border-gray-200 sticky top-0 left-0 z-50 shadow-sm">
      <div className="bg-[#b79b4b] py-2 overflow-hidden relative font-garamond">
        <motion.div
          animate={{
            x: [0, -1000]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="whitespace-nowrap text-sm font-medium"
        >
          Enjoy 15% off with two or more items & free shipping on all orders. 
          &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
          Enjoy 15% off with two or more items & free shipping on all orders. 
          &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
          Enjoy 15% off with two or more items & free shipping on all orders. 
          &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
          Enjoy 15% off with two or more items & free shipping on all orders.
        </motion.div>
      </div>
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition">
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
          {/* Search */}
          <div ref={searchContainerRef} className="relative">
            <motion.div
              initial={false}
              animate={{
                width: isSearchOpen ? '280px' : '40px',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative"
            >
              {!isSearchOpen ? (
                <button
                  onClick={handleSearchClick}
                  className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition"
                >
                  <Search size={20} />
                </button>
              ) : (
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-amber-500 text-sm"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <button
                    onClick={handleSearchClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchOpen && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
                >
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">
                        {searchResults.length} Result{searchResults.length !== 1 ? 's' : ''}
                      </div>
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          className="w-full px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-b-0 transition"
                          onClick={() => {
                            console.log('Selected:', product.name);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{product.category}</span>
                            <span className="text-sm font-semibold text-amber-600">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist Button */}
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition relative"
            onClick={() => {
              setIsWishlistOpen(!isWishlistOpen);
              setIsCartOpen(false);
              setIsSearchOpen(false);
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
              setIsSearchOpen(false);
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
                    className={`text-[10px] font-thin ${
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

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

    </nav>
  );
};

export default Navbar;