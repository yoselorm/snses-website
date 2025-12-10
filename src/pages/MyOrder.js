import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Package, Search, Filter, Download, Eye, CheckCircle, Clock, XCircle, Truck, X, MapPin, Phone, Mail, User } from 'lucide-react';
import { fetchUserOrders } from '../redux/OrderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    dispatch(fetchUserOrders);
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={18} />;
      case 'processing':
        return <Clock className="text-blue-600" size={18} />;
      case 'shipped':
        return <Truck className="text-purple-600" size={18} />;
      case 'pending':
        return <Clock className="text-amber-600" size={18} />;
      case 'cancelled':
        return <XCircle className="text-red-600" size={18} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      pending: 'bg-amber-100 text-amber-700',
      cancelled: 'bg-red-100 text-red-700'
    };

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
        {getStatusIcon(status)}
        <span className="capitalize ml-1">{status}</span>
      </span>
    );
  };

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = 
      order.payId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryDetails?.fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryDetails?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };




  const getTotalItems = (orders) => {
    return orders?.reduce((sum, item) => sum + item.qty, 0) || 0;
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 font-garamond">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by payment ID, customer, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-600" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              {/* <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                <Download size={18} />
                <span>Export</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <Package className="mx-auto text-gray-400 mb-3" size={48} />
                      <p className="text-gray-600">No orders found</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.payId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 text-sm">{order.payId?.substring(0, 20)}...</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.deliveryDetails?.fname}</p>
                          <p className="text-sm text-gray-500">{order.deliveryDetails?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">{getTotalItems(order.orders)} items</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900 font-sans">£{parseFloat(order.amount).toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900">{order.deliveryDetails?.city}</p>
                          <p className="text-sm text-gray-500">{order.deliveryDetails?.country}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {filteredOrders.length} of {orders?.length || 0} orders
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Payment ID and Status */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment ID</p>
                  <p className="font-mono text-sm text-gray-900">{selectedOrder.payId}</p>
                </div>
           
              </div>

              {/* Customer Information */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <User size={20} className="mr-2 text-amber-600" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium text-gray-900">{selectedOrder.deliveryDetails?.fname}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Mail size={14} className="mr-1" />
                      Email
                    </p>
                    <p className="font-medium text-gray-900">{selectedOrder.deliveryDetails?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Phone size={14} className="mr-1" />
                      Phone
                    </p>
                    <p className="font-medium text-gray-900">{selectedOrder.deliveryDetails?.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      Location
                    </p>
                    <p className="font-medium text-gray-900">{selectedOrder.deliveryDetails?.city}, {selectedOrder.deliveryDetails?.country}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-6 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <MapPin size={20} className="mr-2 text-blue-600" />
                  Delivery Address
                </h3>
                <p className="text-gray-900">{selectedOrder.deliveryDetails?.address}</p>
                {selectedOrder.deliveryDetails?.addNote && (
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Additional Note:</p>
                    <p className="text-gray-900 italic">{selectedOrder.deliveryDetails?.addNote}</p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Package size={20} className="mr-2 text-amber-600" />
                  Order Items
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Token</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Qty</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.orders?.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">{item.productName?.trim()}</td>
                          <td className="px-4 py-3 text-gray-600 font-mono text-sm">{item.productToken}</td>
                          <td className="px-4 py-3 text-gray-900">{item.qty}</td>
                          <td className="px-4 py-3 text-gray-900 font-semibold font-mono">£{parseFloat(item.amount).toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div className="bg-amber-50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-amber-600 font-serif">£{parseFloat(selectedOrder.amount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;