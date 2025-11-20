import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import visa from '../assets/card-icons.jpg';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Ghana', 
    notes: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('snsesCart')) || [];
    setCartItems(stored);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('snsesCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('snses_cart_updated', { detail: updatedCart }));
  };

  const handleQuantityChange = (productToken, amount) => {
    const updated = cartItems.map((item) => {
      if (item.productToken === productToken) {
        const newQty = Math.max(1, (item.quantity || 1) + amount);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCart(updated);
  };

  const handleRemove = (productToken) => {
    const updated = cartItems.filter((item) => item.productToken !== productToken);
    updateCart(updated);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price || 0);
    const quantity = parseInt(item.quantity || 1);
    return acc + price * quantity;
  }, 0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = () => {
    const { name, email, phone, address, city, country } = formData;
    if (!name || !email || !phone || !address || !city || !country) {
      alert('Please fill in all delivery details.');
      return;
    }

    alert('Proceeding to payment...');
    // 🚀 Stripe checkout integration goes here
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-12 font-garamond">
      <div className="max-w-6xl mx-auto overflow-hidden grid md:grid-cols-2">
        {/* LEFT: CART SUMMARY */}
        <div className="p-8 border-r border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>

          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>Your cart is empty.</p>
              <Link to="/shop" className="text-[#DDC57A] hover:underline">
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.productToken}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.productName || item.name}
                      className="w-16 h-16 object-cover border rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.productName || item.name}</p>
                      <p className="text-sm text-gray-500 font-sans">
                      £{(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.productToken, -1)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l text-sm"
                        >
                          −
                        </button>
                        <span className="px-3 text-sm border-t border-b">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.productToken, 1)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-r text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productToken)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-lg font-semibold text-gray-700">Subtotal:</p>
                <p className="text-base font-sans text-amber-700">£{subtotal.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: DELIVERY DETAILS */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Details</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="+233..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Street name, house number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">City / Region</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Accra"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500 bg-white"
                >
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500 resize-none"
                placeholder="Any special instructions for delivery?"
              ></textarea>
            </div>

            <div className="pt-4">
              {/* <p className="text-sm text-gray-600 mb-2">We accept:</p> */}
              <div className="flex items-center gap-3">
                <img src={visa} alt="Visa" className="h-6" />
                {/* <img src={mastercard} alt="MasterCard" className="h-6" />
                <img src={amex} alt="Amex" className="h-6" />
                <img src={paypal} alt="PayPal" className="h-6" /> */}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-6 w-full bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] font-semibold py-3 transition"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
