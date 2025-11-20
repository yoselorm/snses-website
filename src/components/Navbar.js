import React, { useState, useRef, useEffect } from 'react';
import { User, Heart, ShoppingCart, X, Search, LogOut } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCustomer } from '../redux/AuthSlice';
import logo from '../assets/logozz.png';
import AuthModal from './AuthModal';
import WishlistDropdown from './WishlishtDropdown';
import CartDropdown from './CartDropDown';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.customer);
  const token = localStorage.getItem('snsesCustomerToken')
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const userMenuRef = useRef(null);

  const isAuthenticated = !!token;

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
    { name: 'OUR STORY', path: '/our-story' },
    { name: 'COMMUNITY', path: '/community' },
  ];

  const activePage = pages.find(p => p.path === location.pathname)?.name;

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutCustomer());
    setIsUserMenuOpen(false);
  };

  // inside Navbar component (replace existing cartCount usage)
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const computeCount = (cart) => (cart || []).reduce((acc, it) => acc + (it.quantity || 0), 0);

    const loadAndSet = () => {
      const stored = JSON.parse(localStorage.getItem('snsesCart')) || [];
      setCartCount(computeCount(stored));
    };

    // initial load
    loadAndSet();

    // listener for same-tab updates
    const onCartUpdated = (e) => {
      if (e?.detail) setCartCount(computeCount(e.detail));
      else loadAndSet();
    };

    window.addEventListener('snses_cart_updated', onCartUpdated);
    window.addEventListener('storage', onCartUpdated); // cross-tab

    return () => {
      window.removeEventListener('snses_cart_updated', onCartUpdated);
      window.removeEventListener('storage', onCartUpdated);
    };
  }, []);



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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsUserMenuOpen(false);
    if (isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  return (
    <nav className="font-metro-nova tracking-[1px] w-full bg-[#f4f1eb]  sticky top-0 left-0 z-50 shadow-sm">
      <div className="bg-[#d4c6a8] py-[2px] overflow-hidden relative font-garamond">
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

      <div className='w-full bg-[#4b0c0c] text-[#d4af37] '>
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between ">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 text-[#f6e6c7] hover:text-[#e3c27b] transition"
              >
                <User size={20} />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            ) : (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsCartOpen(false);
                    setIsWishlistOpen(false);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-2 text-[#f6e6c7] hover:text-[#e3c27b] transition"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">My Account</span>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-48 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {currentUser?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {currentUser?.email || ''}
                        </p>
                      </div>
                      {/* <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} />
                      My Profile
                    </Link> */}
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShoppingCart size={16} />
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Center Logo */}
          <div className="flex items-center sm:ml-12">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="SNSES Logo" className="h-[68px] w-auto" />
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
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
                    className="flex items-center justify-center w-10 h-10 text-[#f6e6c7] hover:text-[#e3c27b] transition"
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
                              <span className="text-sm font-semibold text-[#DDC57A]">
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
              className="hidden sm:flex items-center gap-2 text-[#f6e6c7] hover:text-[#e3c27b] transition relative"
              onClick={() => {
                setIsWishlistOpen(!isWishlistOpen);
                setIsCartOpen(false);
                setIsSearchOpen(false);
                setIsUserMenuOpen(false);
              }}
            >
              <Heart size={20} />
            </button>

            {/* Cart Button */}
            <button
              className="hidden sm:flex items-center gap-2 text-[#f6e6c7] hover:text-[#e3c27b] transition relative"
              onClick={() => {
                setIsCartOpen(!isCartOpen);
                setIsWishlistOpen(false);
                setIsSearchOpen(false);
                setIsUserMenuOpen(false);
              }}
            >
              <ShoppingCart size={20} />
              <span className="-ml-1 text-sm text-[#f6e6c7] ">{cartCount}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden text-[#f6e6c7] "
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <span className="text-xl">☰</span>}
            </button>
          </div>
        </div>


        {/* Navigation Menu */}
        <div className="">
          <div className="max-w-7xl mx-auto px-4">
            {/* Desktop Nav */}
            <ul className="hidden sm:flex items-center justify-center gap-20 py-4">
              {pages.map((page) => {
                const isActive = activePage === page.name;
                return (
                  <li key={page.name} className="relative group">
                    <Link
                      to={page.path}
                      className={`text-[11px] font-thin ${isActive ? 'text-[#DDC57A]' : 'text-[#f6e6c7]'
                        } hover:text-[#DDC57A] transition`}
                    >
                      {page.name}
                    </Link>

                    {/* Animated underline */}
                    <motion.div
                      layoutId="underline"
                      className={`absolute left-0 bottom-0 h-[2px] bg-[#DDC57A]`}
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
                  {/* Pages */}
                  {pages.map((page) => (
                    <li key={page.name}>
                      <Link
                        to={page.path}
                        className={`text-[x-small] ${activePage === page.name
                            ? 'text-[#DDC57A]'
                            : 'text-gray-600 hover:text-[#DDC57A]'
                          }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {page.name}
                      </Link>
                    </li>
                  ))}

                  {/* Wishlist Mobile */}
                  <li
                    className="flex items-center gap-2 text-gray-600 hover:text-[#DDC57A] cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    <Heart size={18} />
                    <span className="text-sm">Wishlist</span>
                  </li>

                  {/* Cart Mobile */}
                  <li
                    className="flex items-center gap-2 text-gray-600 hover:text-[#DDC57A] cursor-pointer"
                    onClick={() => {
                      setIsCartOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    <ShoppingCart size={18} />
                    <span className="text-sm">Cart ({cartCount})</span>
                  </li>
                </motion.ul>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />



      <WishlistDropdown
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />


      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;