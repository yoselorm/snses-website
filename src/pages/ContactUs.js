import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const formInView = useInView(formRef, { once: true, amount: 0.3 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-[#f4f1eb] min-h-screen font-garamond">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-thin tracking-wider text-gray-900 mb-6">
              GET IN TOUCH
            </h1>
            <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about our products, 
              craftsmanship, or anything else, our team is ready to answer all your questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-thin tracking-wider text-gray-900 mb-8">
                Send us a message
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2 tracking-wide">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#f4f1eb] border-b-2 border-gray-300 py-3 px-4 text-gray-900 focus:outline-none focus:border-amber-700 transition"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 tracking-wide">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#f4f1eb] border-b-2 border-gray-300 py-3 px-4 text-gray-900 focus:outline-none focus:border-amber-700 transition"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 tracking-wide">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#f4f1eb] border-b-2 border-gray-300 py-3 px-4 text-gray-900 focus:outline-none focus:border-amber-700 transition"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 tracking-wide">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full bg-[#f4f1eb] border-b-2 border-gray-300 py-3 px-4 text-gray-900 focus:outline-none focus:border-amber-700 transition resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gray-900 text-white py-3 px-8 text-sm tracking-widest hover:bg-gray-800 transition-colors"
                >
                  SEND MESSAGE
                </button>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              ref={infoRef}
              initial={{ opacity: 0, x: 50 }}
              animate={infoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-thin tracking-wider text-gray-900 mb-8">
                  Contact Information
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-8">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-amber-700 p-3 rounded-lg">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm tracking-wide text-gray-900 mb-2">EMAIL</h3>
                    <a 
                      href="mailto:info@snses.com" 
                      className="text-gray-700 hover:text-amber-700 transition"
                    >
                      info@snses.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-amber-700 p-3 rounded-lg">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm tracking-wide text-gray-900 mb-2">PHONE</h3>
                    <a 
                      href="tel:+971559388481" 
                      className="text-gray-700 hover:text-amber-700 transition"
                    >
                      +971 559 388 481
                    </a>
                  </div>
                </motion.div>

                {/* Locations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-amber-700 p-3 rounded-lg">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm tracking-wide text-gray-900 mb-2">LOCATIONS</h3>
                    <div className="text-gray-700 space-y-3">
                      <p>Dubai Design District, Building 3<br />Dubai, UAE</p>
                      <p>39 Rue de Liège<br />75008, Paris, France</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={infoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-sm tracking-wide text-gray-900 mb-4">BUSINESS HOURS</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-700 text-sm">
              Find quick answers to common questions about SNSES
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'What are your shipping options?',
                answer: 'We offer worldwide shipping with tracking. Delivery times vary by location, typically 5-10 business days.'
              },
              {
                question: 'Do you offer custom orders?',
                answer: 'Yes! We welcome custom orders. Please contact us to discuss your specific requirements and we\'ll work with our artisans to create something special.'
              },
              {
                question: 'What is your return policy?',
                answer: 'We accept returns within 30 days of purchase. Items must be unused and in original condition.'
              },
              {
                question: 'How do I care for my leather products?',
                answer: 'Keep leather away from water and direct sunlight. Use leather conditioner regularly to maintain suppleness and prevent cracking.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#f4f1eb] p-6 rounded-lg"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-20 bg-[#f4f1eb]"></div>
    </div>
  );
};

export default ContactUs;