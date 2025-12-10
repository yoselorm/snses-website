import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../utils/stripe';

// Payment Form Component
const CheckoutForm = ({ clientSecret, orderId, amount, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    if (!clientSecret) {
      setMessage('Payment session not initialized');
      return;
    }

    // Check payment status on mount
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Please enter your payment details.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment successful!');
      // Clear cart
      localStorage.removeItem('snsesCart');
      window.dispatchEvent(new CustomEvent('snses_cart_updated', { detail: [] }));
      
      // Navigate to success page
      setTimeout(() => {
        navigate(`/order-success/${orderId}`);
      }, 1500);
    } else {
      setMessage('Payment processing...');
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600">Order Total</p>
        <p className="text-2xl font-bold text-[#4b0c0c] font-sans">£{amount.toFixed(2)}</p>
      </div>

      <PaymentElement options={paymentElementOptions} />

      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.includes('successful') || message.includes('succeeded')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : message.includes('error') || message.includes('wrong')
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full font-sans bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay £${amount.toFixed(2)}`
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secured by Stripe. We never store your card details.
      </p>
    </form>
  );
};

// Payment Modal Component
const PaymentModal = ({ isOpen, clientSecret, orderId, amount, onClose }) => {

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);



  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#4b0c0c',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#dc2626',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  console.log(clientSecret)


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-garamond">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-auto transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
              <p className="text-sm text-gray-600 mt-1">Enter your card details to complete your order</p>
            </div>

            {/* Stripe Elements */}
            {clientSecret ? (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm 
                  clientSecret={clientSecret} 
                  orderId={orderId}
                  amount={amount}
                  onClose={onClose}
                />
              </Elements>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4b0c0c] mx-auto mb-4"></div>
                <p className="text-gray-600">Initializing payment...</p>
              </div>
            )}

            {/* Security Badges */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <span>•</span>
                <span>SSL Encrypted</span>
                <span>•</span>
                <span>PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;