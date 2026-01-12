// pages/OrderSuccess.js
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleOrder, clearSingleOrder } from '../redux/OrderSlice';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderCreated, loading } = useSelector((state) => state.orders);
  const userToken = localStorage.getItem('snsesCustomerToken');

//   useEffect(() => {
//     if (orderId) {
//       dispatch(fetchSingleOrder(orderId));
//     }

//     return () => {
//       dispatch(clearSingleOrder());
//     };
//   }, [orderId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4b0c0c] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-12 font-garamond">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your order. We'll send you a confirmation email shortly.</p>
        </div>

        {/* Order Details */}
        {/* {orderCreated && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Details</h2>
              <p className="text-sm text-gray-600">Order ID: <span className="font-mono">{orderCreated.id}</span></p>
              <p className="text-sm text-gray-600">Date: {new Date(orderCreated.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {orderCreated.orders?.map((item, index) => (
                  <div key={index} className="flex justify-between items-start border-b pb-3">
                    <div className="flex gap-3">
                      {item.productImage && (
                        <img 
                          src={item.productImage} 
                          alt={item.productName} 
                          className="w-16 h-16 object-cover rounded border"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{item.productName}</p>
                        <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">£{item.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Delivery Information</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-medium">Name:</span> {orderCreated.delivery?.fname}</p>
                <p><span className="font-medium">Email:</span> {orderCreated.delivery?.email}</p>
                <p><span className="font-medium">Phone:</span> {orderCreated.delivery?.phone}</p>
                <p><span className="font-medium">Address:</span> {orderCreated.delivery?.address}</p>
                <p><span className="font-medium">City:</span> {orderCreated.delivery?.city}, {orderCreated.delivery?.country}</p>
                {orderCreated.delivery?.addNote && (
                  <p><span className="font-medium">Note:</span> {orderCreated.delivery.addNote}</p>
                )}
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">Total Amount:</p>
              <p className="text-2xl font-bold text-[#4b0c0c]">£{orderCreated.amount?.toFixed(2)}</p>
            </div>
          </div>
        )} */}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="px-6 py-3 bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] font-semibold rounded-lg text-center transition"
          >
            Continue Shopping
          </Link>
       { userToken &&  <Link
            to="/orders"
            className="px-6 py-3 border-2 border-[#4b0c0c] text-[#4b0c0c] hover:bg-[#4b0c0c] hover:text-[#f1e7c7] font-semibold rounded-lg text-center transition"
          >
            View All Orders
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;