import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDropdown = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
const userToken = localStorage.getItem('snsesCustomerToken');

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('snsesCart')) || [];
    setCartItems(storedCart);
  };

  useEffect(() => {
    if (isOpen) loadCart();

    const onCartUpdated = (e) => {
      if (e?.detail) setCartItems(e.detail);
      else loadCart();
    };

    window.addEventListener('snses_cart_updated', onCartUpdated);
    window.addEventListener('storage', onCartUpdated);

    return () => {
      window.removeEventListener('snses_cart_updated', onCartUpdated);
      window.removeEventListener('storage', onCartUpdated);
    };
  }, [isOpen]);

  const handleRemoveItem = (productToken) => {
    const updated = cartItems.filter((it) => it.productToken !== productToken);
    setCartItems(updated);
    localStorage.setItem('snsesCart', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('snses_cart_updated', { detail: updated }));
  };

  // ✅ FIXED subtotal calculation
  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price || 0);
    const quantity = parseInt(item.quantity || 1);
    return acc + price * quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.25 }}
          className="absolute right-4 top-20 bg-white border border-gray-200 shadow-2xl p-6 w-96 z-50 font-garamond"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-800">Your Cart</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
              <X size={20} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">🛍️ Your cart is empty.</div>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.productToken}
                    className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || 'https://via.placeholder.com/80'}
                        alt={item.productName || item.name}
                        className="w-14 h-14 object-cover border border-gray-200"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.productName || item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm text-[#DDC57A] font-sans">
                        £{(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.productToken)}
                      className="text-gray-400 hover:text-red-500 transition"
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="font-sans text-amber-700">£{total.toFixed(2)}</span>
                </div>

            <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] text-center text-sm py-2 transition"
                >
                  Proceed to Checkout
                </Link>
                
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
