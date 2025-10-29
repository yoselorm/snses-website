import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts, getProductsByCategory, addToWishlist, clearSuccess, clearError, setSelectedProduct } from '../redux/ProductSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, filteredProducts, loading, wishlistLoading, wishlistSuccess,     wishlistError,
  } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.customer);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [displayProducts, setDisplayProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [maxPrice, setMaxPrice] = useState(1000);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Products', count: 0 }]);
  const [cartMessage, setCartMessage] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Extract categories
  useEffect(() => {
    if (products && products.length > 0) {
      const categoryMap = new Map();

      products.forEach((product) => {
        if (product.category) {
          const catId = product.category.categoryid;
          const catName = product.category.category;

          if (categoryMap.has(catId)) {
            categoryMap.get(catId).count++;
          } else {
            categoryMap.set(catId, { id: catId, name: catName, count: 1 });
          }
        }
      });

      const extractedCategories = [
        { id: 'all', name: 'All Products', count: products.length },
        ...Array.from(categoryMap.values()),
      ];
      setCategories(extractedCategories);
    }
  }, [products]);

  // Determine max price
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => parseFloat(p.price || 0));
      const max = Math.max(...prices);
      setMaxPrice(Math.ceil(max / 100) * 100);
      setPriceRange({ min: 0, max: Math.ceil(max / 100) * 100 });
    }
  }, [products]);

  // Apply filters/sort
  useEffect(() => {
    let productsToDisplay = selectedCategory === 'all' ? products : filteredProducts;
    if (productsToDisplay) {
      // Filter by price
      let filtered = productsToDisplay.filter((p) => {
        const price = parseFloat(p.price || 0);
        return price >= priceRange.min && price <= priceRange.max;
      });

      // Sort
      let sorted = [...filtered];
      switch (sortBy) {
        case 'price-low-high':
          sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'price-high-low':
          sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        default:
          sorted.sort((a, b) =>
            (a.productName || '').localeCompare(b.productName || '', undefined, { sensitivity: 'base' })
          );
      }
      setDisplayProducts(sorted);
    }
  }, [products, filteredProducts, sortBy, selectedCategory, priceRange]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') dispatch(getProducts());
    else dispatch(getProductsByCategory(categoryId));
  };

  // Add to wishlist
  const handleAddToWishlist = (e, productToken) => {
    e.stopPropagation();
    if (!token) {
      alert('Please login to add items to wishlist');
      return;
    }
    dispatch(
      addToWishlist({
        customerId: localStorage.getItem('snsesUserId'),
        productToken,
      })
    );
  };

  // ✅ Add to cart (localStorage)
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
  
    const cart = JSON.parse(localStorage.getItem('snsesCart')) || [];
  
    const idx = cart.findIndex((c) => c.productToken === product.productToken);
    if (idx >= 0) {
      cart[idx].quantity = (cart[idx].quantity || 0) + 1;
    } else {
      cart.push({
        productToken: product.productToken,
        productName: product.productName,
        price: parseFloat(product.price || 0),
        image: product.images?.main_image || '/placeholder-product.png',
        quantity: 1,
      });
    }
  
    localStorage.setItem('snsesCart', JSON.stringify(cart));
  
    // notify same-tab listeners
    window.dispatchEvent(new CustomEvent('snses_cart_updated', { detail: cart }));
  
    // optional: UI feedback
    setCartMessage(`${product.productName} added to cart`);
    setTimeout(() => setCartMessage(null), 2200);
  };
  

  // Product click
  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.productToken}`);
  };

  // Price change
  const handlePriceChange = (value) => {
    setPriceRange({ ...priceRange, max: parseInt(value) });
  };

  // Clear success/error
  useEffect(() => {
    if (wishlistSuccess || wishlistError) {
      setTimeout(() => {
        dispatch(clearSuccess());
        dispatch(clearError());
      }, 3000);
    }
  }, [wishlistSuccess, wishlistError, dispatch]);

  return (
    <div className="min-h-screen bg-[#f4f1eb] font-garamond">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">CATEGORIES</h2>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left text-sm flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'text-amber-600 font-medium'
                          : 'text-gray-600 hover:text-amber-600'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-gray-400">({cat.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">PRICE RANGE</h2>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>${priceRange.min}</span>
                <span className="font-medium text-amber-600">${priceRange.max}</span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">Showing {displayProducts?.length || 0} products</p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 text-sm focus:outline-none"
                >
                  <option value="alphabetical">Alphabetically, A-Z</option>
                  <option value="price-low-high">Price, Low to High</option>
                  <option value="price-high-low">Price, High to Low</option>
                </select>
              </div>
            </div>

            {/* Feedback Messages */}
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
              {cartMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded text-sm"
                >
                  {cartMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              </div>
            ) : displayProducts?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((product) => (
                  <motion.div
                    key={product.productToken}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleProductClick(product)}
                    className="bg-white shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.images?.main_image || '/placeholder-product.png'}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => handleAddToWishlist(e, product.productToken)}
                        disabled={wishlistLoading}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-amber-50"
                      >
                        <Heart size={18} className="text-gray-600 hover:text-amber-600" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-800 uppercase">{product.productName}</h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {product.description || 'No description available'}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                          ${parseFloat(product.price || 0).toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="bg-amber-600 text-white px-4 py-2 rounded text-sm hover:bg-amber-700 flex items-center gap-2"
                        >
                          <ShoppingCart size={16} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
