import React, { useEffect, useState } from 'react';
import { Heart, Loader, Loader2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getProducts,
  addToWishlist,
  getWishlist,
  clearSuccess,
  clearError,
  setSelectedProduct,
} from '../redux/ProductSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products,
    loading,
    wishlist,
    wishlistLoading,
    wishlistSuccess,
    wishlistError,
    message
  } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.customer);

  const [sortBy, setSortBy] = useState('alphabetical');
  const [displayProducts, setDisplayProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [maxPrice, setMaxPrice] = useState(1000);
  const [wishlistProductTokens, setWishlistProductTokens] = useState(new Set());
  const [cartMessage, setCartMessage] = useState(null);

  // Fetch products and wishlist on mount
  useEffect(() => {
    dispatch(getProducts());
    if (token) {
      dispatch(getWishlist(localStorage.getItem('snsesUserId')));
    }
  }, [dispatch, token]);
  // Extract wishlist product tokens for quick lookup
  useEffect(() => {
    if (wishlist && Array.isArray(wishlist)) {
      const tokens = new Set(
        wishlist.map((item) => item.productToken || item.product?.productToken).filter(Boolean)
      );
      setWishlistProductTokens(tokens);
    }
  }, [wishlist]);


  // Calculate max price from products
  useEffect(() => {
    if (products && products.length > 0) {
      const prices = products.map((p) => parseFloat(p.price || 0));
      const max = Math.max(...prices);
      setMaxPrice(Math.ceil(max / 100) * 100);
      setPriceRange({ min: 0, max: Math.ceil(max / 100) * 100 });
    }
  }, [products]);

  // Sort and filter products
  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        const price = parseFloat(product.price || 0);
        return price >= priceRange.min && price <= priceRange.max;
      });

      const sorted = [...filtered];
      switch (sortBy) {
        case 'price-low-high':
          sorted.sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0));
          break;
        case 'price-high-low':
          sorted.sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0));
          break;
        case 'alphabetical':
        default:
          sorted.sort((a, b) => {
            const nameA = (a.productName || '').toLowerCase();
            const nameB = (b.productName || '').toLowerCase();
            return nameA.localeCompare(nameB);
          });
          break;
      }
      setDisplayProducts(sorted);
    }
  }, [products, sortBy, priceRange]);

  // ✅ Add to cart (with notification)
  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem('snsesCart')) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.productToken === product.productToken
    );

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        productToken: product.productToken,
        productName: product.productName,
        price: parseFloat(product.price || 0),
        image: product.images?.main_image || '/placeholder-product.png',
        quantity: 1,
      });
    }

    localStorage.setItem('snsesCart', JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent('snses_cart_updated', { detail: existingCart }));

    // ✅ Show top popup message
    setCartMessage(`${product.productName} added to cart`);
    setTimeout(() => setCartMessage(null), 3000);
  };

  // Wishlist logic
  const isInWishlist = (productToken) => wishlistProductTokens.has(productToken);

  const handleAddToWishlist = (e, productToken) => {
    e.stopPropagation();

    if (!token) {
      setCartMessage('Please login to add items to wishlist');
      setTimeout(() => setCartMessage(null), 3000);
      return;
    }

    if (isInWishlist(productToken)) return;

    dispatch(
      addToWishlist({
        customerId: localStorage.getItem('snsesUserId'),
        productToken: productToken,
      })
    );
  };

  // Handle product click
  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.productToken}`);
  };

  // Handle price range
  const handlePriceChange = (value) => {
    setPriceRange({ ...priceRange, max: parseInt(value) });
  };

  // Clear success/error messages
  useEffect(() => {
    if (wishlistSuccess || wishlistError) {
      setTimeout(() => {
        dispatch(clearSuccess());
        dispatch(clearError());
      }, 3000);
    }
  }, [wishlistSuccess, wishlistError, dispatch]);

  return (
    <div className="min-h-screen bg-[#f4f1eb] font-garamond relative">

      {/* ✅ Top Notification Popup */}
      <AnimatePresence>
        {cartMessage && (
          <motion.div
            key="cartMessage"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg z-50 text-sm"
          >
            {cartMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Top Controls: Sort + Price Filter */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <p className="text-sm text-gray-600">
            Showing {displayProducts?.length || 0} products
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-amber-500 bg-white"
              >
                <option value="alphabetical">Alphabetically, A-Z</option>
                <option value="price-low-high">Price, Low to High</option>
                <option value="price-high-low">Price, High to Low</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600">Price up to:</label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-48 accent-[#DDC57A] cursor-pointer"
              />
              <span className="text-sm font-medium  font-sans">
                £{priceRange.max}
              </span>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {wishlistSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm"
            >
              {message}
            </motion.div>
          )}
          {wishlistError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm"
            >
              {wishlistError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DDC57A]"></div>
          </div>
        ) : displayProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => {
              const inWishlist = isInWishlist(product.productToken);

              return (
                <motion.div
                  key={product.id || product.productToken}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleProductClick(product)}
                  className="bg-white overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.images?.main_image || '/placeholder-product.png'}
                      alt={product.productName}
                      className="w-full h-full object-cover absolute inset-0 group-hover:opacity-0 transition-opacity duration-300"
                    />
                    <img
                      src={
                        product.images?.backup_image ||
                        product.images?.main_image ||
                        '/placeholder-product.png'
                      }
                      alt={product.productName}
                      className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Wishlist */}
                    <button
                      onClick={(e) => handleAddToWishlist(e, product.productToken)}
                      disabled={wishlistLoading || inWishlist}
                      className={`absolute top-3 right-3 rounded-full p-2 shadow-md transition z-10 ${inWishlist ? 'bg-[#DDC57A] cursor-default' : 'bg-white hover:bg-amber-50'
                        }`}
                      title={inWishlist ? 'Already in wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        size={18}
                        className={
                          inWishlist
                            ? 'text-white fill-white'
                            : 'text-gray-600 hover:text-[#DDC57A]'
                        }
                      />
                    </button>

                    {/* ⭐ Bestseller Tag */}
                    {product?.status?.toLowerCase().includes('out of stock') && (
                      <span className="absolute top-3 right-16 bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10">
                        Out of Stock
                      </span>
                    )}
                  </div>


                  {/* Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-sm font-medium text-gray-800 mb-1 uppercase tracking-wide">
                      {product.productName}
                    </h3>

                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {product.description || 'No description available'}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4">
                      <span className="text-sm text-gray-900 font-sans">
                        £{parseFloat(product.price || 0).toFixed(2)}
                      </span>

                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={product?.status?.toLowerCase().includes('out of stock')}
                        className={`px-4 py-2 rounded text-sm transition flex items-center gap-2 
    ${product?.status?.toLowerCase().includes('out of stock')
                            ? 'bg-rose-100 text-rose-800 cursor-not-allowed border border-rose-200'
                            : 'bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8]'
                          }`}
                      >
                        {product?.status?.toLowerCase().includes('out of stock') ? (
                          <>
                            {/* Optional: <XCircle size={16} /> */}
                            Unavailable
                          </>
                        ) : (
                          <>
                            {/* <ShoppingCart size={16} /> */}
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No products found in this price range.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
