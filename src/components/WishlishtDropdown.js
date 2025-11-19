import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
  clearError,
  clearSuccess,
} from "../redux/ProductSlice";
import { Trash2 } from "lucide-react";

const WishlistDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("snsesCustomerToken");

  const {
    wishlist,
    wishlistLoading,
    wishlistError,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (isOpen && token) {
      dispatch(getWishlist());
    }
  }, [isOpen, token, dispatch]);

  const handleDelete = (productToken) => {
    dispatch(removeFromWishlist(productToken));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute right-28 top-20 bg-white border border-gray-200 rounded-xl shadow-2xl p-6 w-80 z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Your Wishlist
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          {!token ? (
            <div className="text-center py-8 text-gray-500">
              Kindly{" "}
              <span
                className="text-[#DDC57A] font-semibold cursor-pointer"
                onClick={onClose}
              >
                login
              </span>{" "}
              to view your wishlist.
            </div>
          ) : wishlistLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : wishlistError ? (
            <div className="text-center py-8 text-red-500">{wishlistError}</div>
          ) : wishlist && wishlist.length > 0 ? (
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
              {wishlist.map((item) => {
                const product = item.productData || {};
                const image = product.images?.main_image;

                return (
                  <div
                    key={item.productToken}
                    className="flex justify-between items-center py-3"
                  >
                    <div className="flex items-center gap-3 cursor-pointer">
                      {/* 🖼️ Product Image */}
                      <img
                        src={image}
                        alt={product.productName}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      />

                      {/* 📝 Product Details */}
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-800">
                          {product.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.category?.category || "No category"}
                        </p>
                      </div>
                    </div>

                    {/* 🗑️ Delete Button */}
                    <button
                      onClick={() => handleDelete(item.productToken)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Your wishlist is empty!
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WishlistDropdown;
