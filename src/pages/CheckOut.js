import React, { useEffect, useState } from "react";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("snsesCart")) || [];
    setCart(storedCart);
  }, []);

  // Calculate total whenever cart changes
  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(subtotal);
    localStorage.setItem("snsesCart", JSON.stringify(cart));
  }, [cart]);

  // Increase quantity
  const handleIncrease = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    const updated = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updated);
  };

  // Remove item
  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
  };

  const handleProceedToPayment = () => {
    alert("Proceeding to payment...");
    // integrate Stripe or backend payment flow here
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty!</p>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      GHS {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-gray-800 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="w-24 text-right text-gray-700 font-semibold">
                  GHS {(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span> {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <span>Tax (2%)</span>
              <span> {(total * 0.02).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 text-lg mt-4">
              <span>Total</span>
              <span> {(total * 1.02).toFixed(2)}</span>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
