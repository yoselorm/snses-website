import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import logo from '../assets/logozzz.png';
import { Link } from 'react-router-dom';
import { FaPinterest, FaTiktok } from "react-icons/fa";
import { api_url_v1 } from '../utils/config';
import axios from 'axios';


const Footer = () => {
    const [email, setEmail] = useState("");
    const [loadingNewsletter, setLoadingNewsletter] = useState(false);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");


    const handleSubscribe = async () => {
        if (!email.trim()) {
            setStatus('error');
            setMessage('Please enter a valid email');
            return;
        }

        setLoadingNewsletter(true);
        setStatus(null);
        setMessage("");

        try {
            const response = await axios.post(
                `${api_url_v1}/addEmailToNewsletter`,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setStatus('success');
            setMessage(response.data?.message || 'Successfully subscribed!');

            // Reset after 3 seconds
            setTimeout(() => {
                setEmail("");
                setStatus(null);
                setMessage("");
            }, 3000);

        } catch (error) {
            setStatus('error');
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else if (error.response?.status === 409) {
                setMessage('This email is already subscribed');
            } else {
                setMessage(error.message || 'Failed to subscribe. Please try again.');
            }
        } finally {
            setLoadingNewsletter(false);
        }
    };

    return (
        <footer className="bg-[#f7f6f5] font-garamond">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 my-8">


                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex justify-center  items-center"
                    >
                        <div className="">
                            <Link to="/" className="">
                                <img src={logo} alt="SNSES Logo" className="h-20 w-auto" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-gray-900 font-medium tracking-wider mb-6 text-sm">QUICK LINKS</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/shop" className="text-gray-600 hover:text-amber-700 transition text-sm">
                                    Shop
                                </a>
                            </li>
                            <li>
                                <a href="/delivery-returns" className="text-gray-600 hover:text-amber-700 transition text-sm">
                                    Delivery & Returns
                                </a>
                            </li>
                            <li>
                                <a href="/faqs" className="text-gray-600 hover:text-amber-700 transition text-sm">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-gray-600 hover:text-amber-700 transition text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-gray-600 hover:text-amber-700 transition text-sm">
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-gray-900 font-medium tracking-wider mb-6 text-sm">CONNECT</h3>
                        <ul className="space-y-3 text-sm text-gray-600">

                            <li>
                                E-mail:{' '}
                                <a href="mailto:info@houseofsnses.com" className="underline hover:text-amber-700 transition">
                                    info@houseofsnses.com
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-gray-900 font-medium tracking-wider mb-6 text-sm">FOLLOW OUR JOURNEY</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Promotions, new products and sales. Directly to your inbox.
                        </p>
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loadingNewsletter}
                                    className="w-full bg-transparent border-b-2 border-gray-400 py-2 px-0 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-700 transition"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSubscribe}
                                disabled={loadingNewsletter}
                                className="bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] px-8 py-3 text-sm tracking-widest transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loadingNewsletter ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        SUBSCRIBING...
                                    </>
                                ) : (
                                    'SUBSCRIBE'
                                )}
                            </button>
                        </form>
                 <div className='mt-3'>
                           
                 {status === 'success' && (
                            <div className="max-w-lg mx-auto mb-4 p-3 bg-green-100 border border-green-400 rounded text-green-800 text-sm">
                                {message}
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="max-w-lg mx-auto mb-4 p-3 bg-red-100 border border-red-400 rounded text-red-800 text-sm">
                                {message}
                            </div>
                        )}
                 </div>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-6">
                            <a
                                href="https://www.instagram.com/houseofsnses?igsh=azVnZXdzbmZhM2li&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-amber-700 transition"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61582463126697&sk=about"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-amber-700 transition"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://pin.it/6TMx3l1MY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-amber-700 transition"
                            >
                                <FaPinterest size={20} />
                            </a>
                            <a
                                href="https://www.tiktok.com/@houseofsnses?_t=ZN-90Zl1DGNtys&_r=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-amber-700 transition"
                            >
                                <FaTiktok size={20} />
                            </a>
                        </div>
                    </motion.div>


                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-300">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                        <p>© 2025 SNSES. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="/privacy" className="hover:text-amber-700 transition">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="hover:text-amber-700 transition">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;