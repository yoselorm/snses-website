import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Package, CheckCircle, Clock, XCircle, Truck, MapPin, Phone, Mail, User, Calendar, AlertCircle } from 'lucide-react';
import { api_url_v1 } from '../utils/config';

const OrderTracking = () => {
  const { order_id } = useParams();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch order from backend API
  const fetchOrderByNumber = async (order_id) => {
    const response = await fetch(`${api_url_v1}/getOrderDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pay_id:order_id })
    });

    if (!response.ok) {
      throw new Error('Order not found');
    }

    const result = await response.json();
    // Extract the data object from the response
    return result.data || result;
  };

  // Function to track order by ID (used for URL params)
  const handleTrackOrderById = async (order_id) => {
    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const data = await fetchOrderByNumber(order_id);
      setOrderData(data);
    } catch (err) {
      setError('Order not found. Please check your order number and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check for order ID in URL on component mount
  useEffect(() => {
    if (order_id) {
      setOrderNumber(order_id);
      // Automatically fetch the order
      handleTrackOrderById(order_id);
    }
  }, [order_id]);

  // Function to track order from form submission
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    await handleTrackOrderById(orderNumber.trim());
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'delivered':
      case 'paid':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'processing':
        return <Clock className="text-blue-600" size={20} />;
      case 'shipped':
        return <Truck className="text-purple-600" size={20} />;
      case 'pending':
      case 'unpaid':
        return <Clock className="text-amber-600" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-gray-600" size={20} />;
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    const styles = {
      completed: 'bg-green-100 text-green-700',
      delivered: 'bg-green-100 text-green-700',
      paid: 'bg-green-100 text-green-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      pending: 'bg-amber-100 text-amber-700',
      unpaid: 'bg-amber-100 text-amber-700',
      cancelled: 'bg-red-100 text-red-700'
    };

    return (
      <span className={`inline-flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium ${styles[statusLower] || 'bg-gray-100 text-gray-700'}`}>
        {getStatusIcon(status)}
        <span className="capitalize ml-1">{status}</span>
      </span>
    );
  };

  const getTotalItems = (orders) => {
    return orders?.reduce((sum, item) => sum + item.qty, 0) || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-sm font-garamond">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="text-amber-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order number to view details and tracking information</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleTrackOrder}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number / Payment ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="orderNumber"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., PAY123456789"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
              <div className="sm:self-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:ring-4 focus:ring-amber-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Tracking...
                    </span>
                  ) : (
                    'Track Order'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="text-red-600 mt-0.5 mr-2 flex-shrink-0" size={20} />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6 animate-fadeIn">
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Order Status</h2>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Ordered on {formatDateShort(orderData.date)}
                  </p>
                </div>
                {getStatusBadge(orderData.status)}
              </div>

              {/* Order Timeline */}
              {orderData.timeline && (
                <div className="relative">
                  {orderData.timeline.map((step, index) => (
                    <div key={index} className="flex items-start mb-6 last:mb-0">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="text-white" size={20} />
                          ) : (
                            <Clock className="text-white" size={20} />
                          )}
                        </div>
                        {index < orderData.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </p>
                        <p className="text-sm text-gray-600">{formatDate(step.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tracking Info */}
              {orderData.trackingNumber && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                    <p className="font-mono font-semibold text-gray-900">{orderData.trackingNumber}</p>
                    {orderData.estimatedDelivery && (
                      <p className="text-sm text-gray-600 mt-2">
                        Estimated delivery: <span className="font-medium">{formatDateShort(orderData.estimatedDelivery)}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Order Number</p>
                  <p className="font-mono font-semibold text-gray-900">{orderData.payId}</p>
                </div>
                {orderData.shippingType && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Shipping Method</p>
                    <p className="font-semibold text-gray-900">{orderData.shippingType}</p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Package size={18} className="mr-2 text-amber-600" />
                  Items ({getTotalItems(orderData.orders)})
                </h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Qty</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orderData.orders?.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="text-gray-900 font-medium">{item.productName?.trim()}</p>
                            <p className="text-sm text-gray-500 font-mono">{item.productToken}</p>
                          </td>
                          <td className="px-4 py-3 text-gray-900">{item.qty}</td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900 font-sans">£{parseFloat(item.amount).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div className="bg-amber-50 rounded-lg p-4 flex items-center justify-between border-2 border-amber-200">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-amber-600 font-sans">£{parseFloat(orderData.amount).toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Information */}
            {orderData.deliveryDetails && orderData.deliveryDetails !== false && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin size={20} className="mr-2 text-amber-600" />
                  Delivery Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {orderData.deliveryDetails?.fname && (
                    <div>
                      <p className="text-sm text-gray-600 flex items-center mb-1">
                        <User size={14} className="mr-1" />
                        Full Name
                      </p>
                      <p className="font-medium text-gray-900">{orderData.deliveryDetails.fname}</p>
                    </div>
                  )}
                  {orderData.deliveryDetails?.email && (
                    <div>
                      <p className="text-sm text-gray-600 flex items-center mb-1">
                        <Mail size={14} className="mr-1" />
                        Email
                      </p>
                      <p className="font-medium text-gray-900">{orderData.deliveryDetails.email}</p>
                    </div>
                  )}
                  {orderData.deliveryDetails?.phone && (
                    <div>
                      <p className="text-sm text-gray-600 flex items-center mb-1">
                        <Phone size={14} className="mr-1" />
                        Phone
                      </p>
                      <p className="font-medium text-gray-900">{orderData.deliveryDetails.phone}</p>
                    </div>
                  )}
                  {orderData.deliveryDetails?.city && (
                    <div>
                      <p className="text-sm text-gray-600 flex items-center mb-1">
                        <MapPin size={14} className="mr-1" />
                        Location
                      </p>
                      <p className="font-medium text-gray-900">
                        {orderData.deliveryDetails.city}
                        {orderData.deliveryDetails.country && `, ${orderData.deliveryDetails.country}`}
                      </p>
                    </div>
                  )}
                </div>

                {orderData.deliveryDetails?.address && (
                  <div className="bg-blue-50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                    <p className="text-gray-900 font-medium">{orderData.deliveryDetails.address}</p>
                    {orderData.deliveryDetails?.addNote && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="text-sm text-gray-600 mb-1">Special Instructions:</p>
                        <p className="text-gray-900 italic">"{orderData.deliveryDetails.addNote}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderTracking;