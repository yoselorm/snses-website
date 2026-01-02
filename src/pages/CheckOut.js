import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import visa from '../assets/card-icons.jpg';
import { createOrder } from '../redux/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import PaymentModal from '../components/PaymentModal';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'UK',
    notes: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    clientSecret: '',
    orderId: '',
    amount: '',
  });

  const customerId = localStorage.getItem('snsesUserId');
  const dispatch = useDispatch();
  const { loading, error, success, orderCreated } = useSelector((state) => state.orders);

  const SHIPPING_OPTIONS = {
    standard: {
      name: 'Standard Shipping',
      cost: 4.95,
      description: '3–5 business days'
    },
    express: {
      name: 'Express Shipping',
      cost: 8.95,
      description: '1–2 business days'
    }
  };

  const isUK = formData.country === 'UK';

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

  const shippingCost = isUK ? SHIPPING_OPTIONS[shippingMethod].cost : 0;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = () => {
    const { name, email, phone, address, city, country } = formData;
    if (!name || !email || !phone || !address || !city || !country) {
      alert('Please fill in all delivery details.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Check if international shipping is selected
    if (country !== 'UK') {
      alert('International shipping is not available yet. Currently, we only ship within the UK.');
      return;
    }

    const orderData = {
      customerId: customerId,
      amount: total,
      shippingPrice: shippingCost,
      shippingType: SHIPPING_OPTIONS[shippingMethod].name,
      orders: cartItems.map((item) => ({
        productToken: item.productToken,
        qty: item.quantity || 1,
        amount: parseFloat(item.price || 0) * (item.quantity || 1),
        productName: item.productName || item.name,
        productImage: item.image
      })),
      delivery: {
        fname: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        country: country,
        addNote: formData.notes || ''
      }
    };

    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    if (success && orderCreated) {
      setPaymentDetails({
        clientSecret: orderCreated?.clientSecret,
        orderId: orderCreated?.id,
        amount: total,
      });
      setShowPaymentForm(true);
    }
  }, [success, orderCreated, dispatch, total]);

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

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Subtotal:</p>
                  <p className="text-sm font-sans text-gray-800">£{subtotal.toFixed(2)}</p>
                </div>
                {isUK && (
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Shipping:</p>
                    <p className="text-sm font-sans text-gray-800">£{shippingCost.toFixed(2)}</p>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t">
                  <p className="text-lg font-semibold text-gray-700">Total:</p>
                  <p className="text-lg font-sans text-amber-700">£{total.toFixed(2)}</p>
                </div>
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
                  placeholder="+44..."
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
                  placeholder="London"
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
                  <option value="UK">UK</option>
                  <option value="Ghana">Ghana</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>

            {/* SHIPPING OPTIONS */}
            {isUK ? (
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-600 mb-3">Shipping Method</label>
                <div className="space-y-3">
                  <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mt-1 mr-3 accent-amber-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">Standard Shipping</span>
                        <span className="font-semibold text-gray-800 font-sans">£4.95</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Orders processed within 3–5 business days</p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="mt-1 mr-3 accent-amber-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">Express Shipping</span>
                        <span className="font-semibold text-gray-800 font-sans">£8.95</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Orders processed within 1–2 business days</p>
                    </div>
                  </label>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-medium text-amber-800">
                    🌍 International Shipping Not Available
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    We currently only ship within the UK. International shipping (5-14 business days) will be available soon.
                  </p>
                </div>
              </div>
            )}

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
              <div className="flex items-center gap-3">
                <img src={visa} alt="Visa" className="h-6" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0}
              className="mt-6 w-full bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] font-semibold py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Order...
                </span>
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </form>
        </div>
      </div>

      {showPaymentForm && paymentDetails && (
        <PaymentModal 
          isOpen={showPaymentForm}
          clientSecret={paymentDetails.clientSecret}
          orderId={paymentDetails.orderId}
          amount={paymentDetails.amount}
          onClose={() => setShowPaymentForm(false)}
        />
      )}
    </div>
  );
};

export default Checkout;