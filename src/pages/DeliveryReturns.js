import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, RotateCcw, Clock, Mail } from 'lucide-react';

const DeliveryReturns = () => {
  const heroRef = useRef(null);
  const deliveryRef = useRef(null);
  const returnsRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const deliveryInView = useInView(deliveryRef, { once: true, amount: 0.3 });
  const returnsInView = useInView(returnsRef, { once: true, amount: 0.3 });
  const contactInView = useInView(contactRef, { once: true, amount: 0.5 });

  const shippingOptions = [
    {
      method: 'Standard Shipping',
      time: '3–5 business days',
      cost: 'Calculated at checkout'
    },
    {
      method: 'Express Shipping',
      time: '1–2 business days',
      cost: 'Calculated at checkout'
    },
    {
      method: 'International Shipping',
      time: '5–14 business days',
      cost: 'Calculated at checkout'
    }
  ];

  return (
    <div className="bg-[#f4f1eb] min-h-screen font-serif">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-widest text-gray-600 mb-4">CUSTOMER CARE</p>
            <h1 className="text-5xl md:text-6xl font-thin tracking-wide text-gray-900 mb-6">
              Delivery & Returns
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about shipping, delivery times, and our returns policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Delivery Information Section */}
      <section ref={deliveryRef} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={deliveryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-6 h-6 text-gray-900" />
              <h2 className="text-3xl font-thin text-gray-900">Delivery Information</h2>
            </div>

            {/* Shipping Options */}
            <div className="bg-white p-8 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Shipping Options</h3>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                We offer reliable and tracked delivery worldwide. Delivery times and costs vary depending on your location and the shipping option you select at checkout.
              </p>

              {/* Shipping Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-900">
                      <th className="text-left py-4 px-2 font-medium text-gray-900 tracking-wider text-xs">
                        SHIPPING METHOD
                      </th>
                      <th className="text-left py-4 px-2 font-medium text-gray-900 tracking-wider text-xs">
                        ESTIMATED DELIVERY TIME
                      </th>
                      <th className="text-left py-4 px-2 font-medium text-gray-900 tracking-wider text-xs">
                        COST
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingOptions.map((option, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 px-2 text-gray-700">{option.method}</td>
                        <td className="py-4 px-2 text-gray-700">{option.time}</td>
                        <td className="py-4 px-2 text-gray-700">{option.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Processing & Delays */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Processing</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Orders are processed within 2–3 business days (excluding weekends and public holidays). Once your order has been shipped, you'll receive a confirmation email with your tracking information.
                </p>
              </div>

              <div className="bg-white p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Delays</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Please note that delivery times are estimates and may vary due to factors beyond our control (e.g., customs delays, weather conditions, or courier disruptions).
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Returns & Exchanges Section */}
      <section ref={returnsRef} className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={returnsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
              <RotateCcw className="w-6 h-6 text-gray-900" />
              <h2 className="text-3xl font-thin text-gray-900">Returns & Exchanges</h2>
            </div>

            <p className="text-sm text-gray-700 mb-8 leading-relaxed">
              We hope you love your purchase! However, if something isn't quite right, you can return your order within <strong>14 days of delivery</strong>.
            </p>

            {/* Return Conditions */}
            <div className="bg-[#f4f1eb] p-8 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Return Conditions</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span>Items must be unused, unopened, and in their original packaging with all tags attached.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span>Return shipping costs are non-refundable. Return shipping costs are the responsibility of the customer unless the item is faulty or incorrect.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span>For items above £100, we recommend using a trackable service or shipping insurance, as we can't guarantee receipt without proof of delivery.</span>
                </li>
              </ul>
            </div>

            {/* How to Return */}
            <div className="bg-[#f4f1eb] p-8 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">How to Return</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="font-medium mr-3">1.</span>
                  <span>Email our customer support team at support@houseofsnses.com with your order number and reason for return.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-3">2.</span>
                  <span>We'll provide you with a return authorisation and instructions.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-3">3.</span>
                  <span>Package your item securely and send it back using a tracked delivery service.</span>
                </li>
              </ol>
            </div>

            {/* Refund Process */}
            <div className="bg-[#f4f1eb] p-8 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Refund</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="font-medium mr-3">1.</span>
                  <span>Once your return is received and inspected, we'll let you know if it's been approved.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-3">2.</span>
                  <span>Approved refunds are issued to your original payment method. Please allow 5-7 working days for your bank card provider to process the refund.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-3">3.</span>
                  <span>Sale items can't be refunded, but if an item is faulty or damaged, please contact us and we'll put things right.</span>
                </li>
              </ol>
            </div>

            {/* Exchanges & Faulty Items */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#f4f1eb] p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Exchanges</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We only replace items if they're defective or damaged. If you need an exchange for the same item, please contact us at support@houseofsnses.com before sending it back to confirm availability. This is subject to shipping costs incurred by the buyer.
                </p>
              </div>

              <div className="bg-[#f4f1eb] p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Faulty or Incorrect Items</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  If you've received a damaged, defective, or incorrect item, please contact us immediately with photos, and we'll arrange a replacement or full refund depending on the product.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 text-center"
          >
            <h2 className="text-3xl font-thin text-gray-900 mb-6">Need Help?</h2>
            <p className="text-sm text-gray-700 mb-8">Our customer support team is here to help.</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <a href="mailto:support@houseofsnses.com" className="hover:text-gray-900 transition-colors">
                  support@houseofsnses.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <span>Monday–Friday, 9am–5pm (GMT)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-20 bg-[#f4f1eb]"></div>
    </div>
  );
};

export default DeliveryReturns;