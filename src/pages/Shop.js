import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts, getProductsByCategory, addToWishlist, getWishlist, clearSuccess, clearError, setSelectedProduct } from '../redux/ProductSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, filteredProducts, loading, wishlist, wishlistLoading, wishlistSuccess, wishlistError } = useSelector((state) => state.products);
  const { currentUser, token } = useSelector((state) => state.customer);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [displayProducts, setDisplayProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [maxPrice, setMaxPrice] = useState(1000);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Products', count: 0 }]);
  const [wishlistProductTokens, setWishlistProductTokens] = useState(new Set());

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
        wishlist.map(item => item.productToken || item.product?.productToken).filter(Boolean)
      );
      setWishlistProductTokens(tokens);
    }
  }, [wishlist]);

  // Extract categories from products
  useEffect(() => {
    if (products && products.length > 0) {
      const categoryMap = new Map();
      
      products.forEach(product => {
        if (product.category) {
          const catId = product.category.categoryid;
          const catName = product.category.category;
          
          if (categoryMap.has(catId)) {
            categoryMap.get(catId).count++;
          } else {
            categoryMap.set(catId, {
              id: catId,
              name: catName,
              count: 1
            });
          }
        }
      });

      const extractedCategories = [
        { id: 'all', name: 'All Products', count: products.length },
        ...Array.from(categoryMap.values())
      ];
      
      setCategories(extractedCategories);
    }
  }, [products]);

  // Calculate max price from products
  useEffect(() => {
    if (products && products.length > 0) {
      const prices = products.map(p => parseFloat(p.price || 0));
      const max = Math.max(...prices);
      setMaxPrice(Math.ceil(max / 100) * 100);
      setPriceRange({ min: 0, max: Math.ceil(max / 100) * 100 });
    }
  }, [products]);

  // Handle sorting, filtering, and price range - FIXED
  useEffect(() => {
    // Use the correct source based on selected category
    let productsToDisplay = selectedCategory === 'all' 
      ? products 
      : (filteredProducts && filteredProducts.length > 0 ? filteredProducts : products);
    
    if (productsToDisplay) {
      // Filter by price range and category
      let filtered = productsToDisplay.filter(product => {
        const price = parseFloat(product.price || 0);
        const matchesPrice = price >= priceRange.min && price <= priceRange.max;
        
        // If a specific category is selected, double-check category match
        if (selectedCategory !== 'all') {
          const matchesCategory = product.category?.categoryid === selectedCategory;
          return matchesPrice && matchesCategory;
        }
        
        return matchesPrice;
      });
      
      // Sort
      let sorted = [...filtered];
      
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
  }, [products, filteredProducts, sortBy, selectedCategory, priceRange]);

  // Handle category change - FIXED
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Reset price range when changing categories
    setPriceRange({ min: 0, max: maxPrice });
    
    if (categoryId === 'all') {
      dispatch(getProducts());
    } else {
      dispatch(getProductsByCategory(categoryId));
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productToken) => {
    return wishlistProductTokens.has(productToken);
  };

  // Handle add to wishlist
  const handleAddToWishlist = (e, productToken) => {
    e.stopPropagation();
    
    if (!token) {
      alert('Please login to add items to wishlist');
      return;
    }
    
    // Don't add if already in wishlist
    if (isInWishlist(productToken)) {
      return;
    }
    
    dispatch(addToWishlist({
      customerId: localStorage.getItem('snsesUserId'),
      productToken: productToken
    }));
  };

  // Handle product click
  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.productToken}`);
  };

  // Handle price range change
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

  // Refresh wishlist after successful add
  useEffect(() => {
    if (wishlistSuccess && token) {
      dispatch(getWishlist(localStorage.getItem('snsesUserId')));
    }
  }, [wishlistSuccess, token, dispatch]);

  return (
    <div className="min-h-screen bg-[#f4f1eb] font-garamond">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories & Price Filter */}
          <aside className="lg:w-64 flex-shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">
                CATEGORIES
              </h2>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left text-sm flex items-center justify-between transition ${
                        selectedCategory === category.id
                          ? 'text-amber-600 font-medium'
                          : 'text-gray-600 hover:text-amber-600'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-400">({category.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">
                PRICE RANGE
              </h2>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-amber-600"
                  />
                  <div 
                    className="absolute top-0 left-0 h-2 rounded-lg pointer-events-none"
                    style={{ width: `${(priceRange.max / maxPrice) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${priceRange.min}</span>
                  <span className="font-medium text-amber-600">${priceRange.max}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing {displayProducts?.length || 0} products
              </p>
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
                  Added to wishlist successfully!
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
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
                          src={product.images?.backup_image || product.images?.main_image || '/placeholder-product.png'}
                          alt={product.productName}
                          className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        
                        {/* Wishlist Button - Now shows filled heart if in wishlist */}
                        <button
                          onClick={(e) => handleAddToWishlist(e, product.productToken)}
                          disabled={wishlistLoading || inWishlist}
                          className={`absolute top-3 right-3 rounded-full p-2 shadow-md transition z-10 ${
                            inWishlist 
                              ? 'bg-amber-600 cursor-default' 
                              : 'bg-white hover:bg-amber-50'
                          }`}
                          title={inWishlist ? 'Already in wishlist' : 'Add to wishlist'}
                        >
                          <Heart 
                            size={18} 
                            className={inWishlist ? 'text-white fill-white' : 'text-gray-600 hover:text-amber-600'}
                          />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-800 mb-1 uppercase tracking-wide">
                          {product.productName}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                          {product.description || 'No description available'}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900">
                            ${parseFloat(product.price || 0).toFixed(2)}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to cart logic here
                            }}
                            className="bg-amber-600 text-white px-4 py-2 rounded text-sm hover:bg-amber-700 transition flex items-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            Add to Cart
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;