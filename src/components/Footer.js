import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import logo from '../assets/logozzz.png';
import { Link } from 'react-router-dom';
import { FaPinterest, FaTiktok } from "react-icons/fa";


const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log('Subscribed:', email);
        setEmail('');
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
                                <a href="mailto:info@snses.com" className="underline hover:text-amber-700 transition">
                                    snsesgroup@gmail.com
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
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b-2 border-gray-400 py-2 px-0 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-700 transition"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] px-6 py-2 text-sm tracking-wider transition-colors"
                            >
                                SUBSCRIBE
                            </button>
                        </form>

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