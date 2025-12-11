import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, ChevronDown, ChevronUp, Leaf, Clock, Sparkles, MapPin, Recycle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductByToken, addToWishlist, clearSuccess, clearError } from '../redux/ProductSlice';

const ProductDetail = () => {
  const { productToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct, loading, wishlistLoading, wishlistSuccess, wishlistError } = useSelector(
    (state) => state.products
  );
  const { token } = useSelector((state) => state.customer);
  console.log(selectedProduct)

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250g');
  const [openSections, setOpenSections] = useState({
    story: true,
    olfactive: true,
    details: true,
  });
  const [cartMessage, setCartMessage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  // Fetch product if not in state
  // useEffect(() => {
  //   if (!selectedProduct || selectedProduct.productToken !== productToken) {
  //     dispatch(getProductByToken(productToken));
  //   }
  // }, [dispatch, productToken, selectedProduct]);

  // Set up images when product loads
  useEffect(() => {
    if (selectedProduct?.images) {
      const mainImage = selectedProduct.images.main_image;
      const backupImage = selectedProduct.images.backup_image;

      setSelectedImage(mainImage);

      // Create thumbnails array - repeat main and backup images
      const thumbs = [];
      if (mainImage) thumbs.push(mainImage);
      if (backupImage) thumbs.push(backupImage);
      if (mainImage) thumbs.push(mainImage);
      if (backupImage) thumbs.push(backupImage);

      setThumbnails(thumbs);
    }
  }, [selectedProduct]);

  // Toggle accordion sections
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle quantity change
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, selectedProduct?.stock || 999)));
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const cart = JSON.parse(localStorage.getItem('snsesCart')) || [];
    const idx = cart.findIndex((c) => c.productToken === selectedProduct.productToken);

    if (idx >= 0) {
      cart[idx].quantity = (cart[idx].quantity || 0) + quantity;
    } else {
      cart.push({
        productToken: selectedProduct.productToken,
        productName: selectedProduct.productName,
        price: parseFloat(selectedProduct.price || 0),
        image: selectedProduct.images?.main_image || '/placeholder-product.png',
        quantity,
      });
    }

    localStorage.setItem('snsesCart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('snses_cart_updated', { detail: cart }));

    setCartMessage(`${selectedProduct.productName} added to cart`);
    setTimeout(() => setCartMessage(null), 2200);
  };

  // Add to wishlist
  const handleAddToWishlist = () => {
    if (!token) {
      setCartMessage('Please log in to add items to wishlist');
      setTimeout(() => setCartMessage(null), 2500);
      return;
    }
  
    if (selectedProduct?.isInWishlist) {
      setCartMessage('This item is already in your wishlist');
      setTimeout(() => setCartMessage(null), 2500);
      return;
    }
  
    dispatch(
      addToWishlist({
        customerId: localStorage.getItem('snsesUserId'),
        productToken: selectedProduct.productToken,
      })
    );
  };
  

  // Clear messages
  useEffect(() => {
    if (wishlistSuccess || wishlistError) {
      setTimeout(() => {
        dispatch(clearSuccess());
        dispatch(clearError());
      }, 3000);
    }
  }, [wishlistSuccess, wishlistError, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f1eb] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DDC57A]"></div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-[#f4f1eb] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#DDC57A] text-white px-6 py-2 rounded hover:bg-amber-700"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Format price with GBP symbol - using HTML entity or fallback
  const formatPrice = (price) => {
    const amount = parseFloat(price || 0).toFixed(2);
    // Return with pound sign - will render as text
    return `£${amount}`;
  };

  return (
    <div className="min-h-screen bg-[#f4f1eb] font-garamond">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Images with Side Thumbnails */}
          <div className="flex gap-4">
            {/* Thumbnail Column */}
            <div className="flex flex-col gap-3 w-24">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-full aspect-square border-2 overflow-hidden transition ${selectedImage === img ? 'border-gray-800' : 'border-gray-300'
                    }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-square bg-white overflow-hidden">
              <img
                src={selectedImage || '/placeholder-product.png'}
                alt={selectedProduct.productName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 uppercase tracking-wide mb-3">
                {selectedProduct.productName}
              </h1>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {selectedProduct.description}
              </p>
              <p className="text-2xl font-sans text-gray-900">
                <span className="">£ </span>{parseFloat(selectedProduct.price || 0).toFixed(2)}
              </p>
            </div>

            {/* Size Selection with Input */}


            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 border border-gray-400 flex items-center justify-center hover:bg-gray-100 text-lg"
              >
                -
              </button>
              <span className="text-base font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 border border-gray-400 flex items-center justify-center hover:bg-gray-100 text-lg"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
           <div className='flex flex-col gap-4'>
           <button
              onClick={handleAddToCart}
              className="w-full bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] py-3 text-sm font-semibold transition tracking-wider uppercase"
            >
              Add to Cart
            </button>
            {/* Add to Wishlist */}
            <button
              onClick={handleAddToWishlist}
              disabled={selectedProduct?.isInWishlist || wishlistLoading}
              className={`w-full py-3 text-sm font-semibold uppercase tracking-wider transition ${selectedProduct?.isInWishlist || wishlistLoading
                  ? 'text-[#4b0c0c] bg-[#f1e7c7]  cursor-not-allowed'
                  : 'text-[#4b0c0c] bg-[#f1e7c7] hover:bg-[#f3e6bb] hover:shadow'
                }`}
            >
              {wishlistLoading
                ? 'Adding...'
                : selectedProduct?.isInWishlist
                  ? 'Already in Wishlist'
                  : 'Add to Wishlist'}
            </button>
           </div>


            {/* Accordion Sections */}
            <div className="space-y-1 border-t pt-6">
              {/* Story */}
              <div className="border-b border-gray-300">
                <button
                  onClick={() => toggleSection('story')}
                  className="w-full flex items-center justify-between text-left py-4 text-base font-semibold uppercase tracking-wide"
                >
                  <span>Story</span>
                  {openSections.story ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <AnimatePresence>
                  {openSections.story && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pb-4 text-sm text-gray-700 leading-relaxed overflow-hidden"
                    >
                      {selectedProduct.story || 'No story available'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Olfactive Notes */}
              <div className="border-b border-gray-300">
                <button
                  onClick={() => toggleSection('olfactive')}
                  className="w-full flex items-center justify-between text-left py-4 text-base font-semibold uppercase tracking-wide"
                >
                  <span>Olfactive Notes</span>
                  {openSections.olfactive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <AnimatePresence>
                  {openSections.olfactive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pb-4 text-sm text-gray-700 space-y-3 overflow-hidden"
                    >
                      <p className="leading-relaxed">
                        {selectedProduct.description || 'Sultry blend of creamy shea butter, smoky wood and earthy spices infused with a hint of honey'}
                      </p>

                      {selectedProduct.primary_feature?.length > 0 && (
                        <div>
                          <strong className="font-semibold">Top Notes:</strong>{' '}
                          {selectedProduct.primary_feature.join(', ')}
                        </div>
                      )}
                      {selectedProduct.secondary_feature?.length > 0 && (
                        <div>
                          <strong className="font-semibold">Middle Notes:</strong>{' '}
                          {selectedProduct.secondary_feature.join(', ')}
                        </div>
                      )}
                      {selectedProduct.core_feature?.length > 0 && (
                        <div>
                          <strong className="font-semibold">Base Notes:</strong>{' '}
                          {selectedProduct.core_feature.join(', ')}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Product Details */}
              <div className="border-b border-gray-300">
                <button
                  onClick={() => toggleSection('details')}
                  className="w-full flex items-center justify-between text-left py-4 text-base font-semibold uppercase tracking-wide"
                >
                  <span>Product Details</span>
                  {openSections.details ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <AnimatePresence>
                  {openSections.details && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pb-4 text-sm text-gray-700 space-y-4 overflow-hidden"
                    >
                      {/* Icon Row */}
                      <div className="flex justify-between gap-4 py-4">
                        <div className="text-center flex-1">
                          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                            <Heart className="w-8 h-8 text-gray-700" fill="currentColor" />
                          </div>
                          <div className="text-[10px] text-gray-600 leading-tight">
                            Cruelty-Free & Vegan<br />Using Soy Blend Wax
                          </div>
                        </div>

                       { selectedProduct.burn_duration && <div className="text-center flex-1">
                          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                            <Clock className="w-8 h-8 text-gray-700" />
                          </div>
                          <div className="text-[10px] text-gray-600 leading-tight">
                            Up to {selectedProduct.burn_duration} Burn<br />Time
                          </div>
                        </div>}
                        <div className="text-center flex-1">
                          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-gray-700" />
                          </div>
                          <div className="text-[10px] text-gray-600 leading-tight">
                            Clean Burn Using<br />100% Cotton Wicks
                          </div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                            <MapPin className="w-8 h-8 text-gray-700" />
                          </div>
                          <div className="text-[10px] text-gray-600 leading-tight">
                            Made in the UK
                          </div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                            <Recycle className="w-8 h-8 text-gray-700" />
                          </div>
                          <div className="text-[10px] text-gray-600 leading-tight">
                            Recyclable Packaging
                          </div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                            <Leaf className="w-8 h-8 text-gray-700" />
                          </div>
                          <div className="text-[10px] text-gray-600 leading-tight">
                            Fragrance Created by<br />Natural Renowned Perfumer
                          </div>
                        </div>
                      </div>

                      <ul className="list-disc list-inside space-y-1">
                        {selectedProduct.width && <li>Diameter: {selectedProduct.width}</li>}
                        {selectedProduct.height && <li>Height: {selectedProduct.height}</li>}
                        {selectedProduct.weight && <li>Net Weight: {selectedProduct.weight}</li>}
                        {/* {selectedProduct.burn_duration && <li>Burn Time: {selectedProduct.burn_duration}</li>} */}
                        <li>
                          All SNSES Candle products are vegan, gluten and cruelty-free, and contain no phthalates or
                          parabens.
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;