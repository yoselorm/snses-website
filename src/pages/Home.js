// src/pages/Home.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/CategorySlice';
import { fetchBlogs } from '../redux/BlogSlice';
import { Link } from 'react-router-dom';
import NewsletterModal from '../components/NewsletterModal';

const Home = () => {
  const containerRef = useRef(null);
  const collectionRef = useRef(null);
  const blogRef = useRef(null);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { blogs } = useSelector((state) => state.blogs);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const collectionInView = useInView(collectionRef, { once: true, amount: 0.3 });
  const blogInView = useInView(blogRef, { once: true, amount: 0.2 });

  // Fetch data
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Newsletter popup (session storage)
  useEffect(() => {
    const hasSeenNewsletter = sessionStorage.getItem('hasSnsesSeenNewsletter');
    if (!hasSeenNewsletter) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
        sessionStorage.setItem('hasSnsesSeenNewsletter', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const displayedBlogs = blogs?.slice(0, 3) || [];

  return (
    <div ref={containerRef} className="bg-[#000000] overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen sm:h-[80vh] w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.pixabay.com/video/2022/12/18/143419-782363231_tiny.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center text-white px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-6xl md:text-8xl font-thin tracking-wider mb-6"
          >
            ILLUMINATE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-[x-small] md:text-sm font-metro-nova font-thin tracking-wide mb-44 max-w-2xl mx-auto"
          >
            Hand-poured candles crafted with love and intention
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-amber-400 text-[9px] px-8 py-4 border border-amber-500 font-medium tracking-wider hover:bg-white transition-colors flex items-center gap-2 mx-auto"
          >
            SHOP NEW ARRIVALS
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Category Carousel */}
      <section ref={collectionRef} className="py-20 px-4 sm:px-20 bg-white overflow-hidden">
        <div className="max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={collectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-thin tracking-wider text-gray-900 mb-2">
              EXPLORE OUR PRODUCTS
            </h2>
            <p className="text-gray-600 text-[12px] font-metro-nova mb-4 tracking-[2px]">
              Made with pride by our craftsmen
            </p>
            <div className="h-0.5 bg-amber-600 mx-auto w-20"></div>
          </motion.div>

          {/* Moving Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={collectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden w-full">
              <motion.div
                className="flex gap-6"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 25,
                  ease: 'linear',
                }}
              >
                {[...categories, ...categories].map((category, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[480px] group cursor-pointer"
                  >
                    <div className="relative overflow-hidden shadow-lg h-[550px] w-[470px]">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={category.image || 'https://via.placeholder.com/400'}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center"
                      >
                        <motion.h3
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-white font-garamond text-2xl font-light tracking-widest"
                        >
                          {category.name}
                        </motion.h3>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} className="py-20 px-4 sm:px-16 bg-[#f4f1eb]">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-thin tracking-wider text-gray-900 mb-2">
              FROM OUR COMMUNITY
            </h2>
            <div className="h-0.5 bg-amber-600 mx-auto w-20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedBlogs.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={blogInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white p-2 overflow-hidden shadow-md cursor-pointer group"
              >
                <div className="relative overflow-hidden h-[550px]">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={post.image || 'https://via.placeholder.com/400'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] tracking-[1px] text-amber-600 font-medium mb-2">
                    {new Date(post.created_at).toDateString()}
                  </p>
                  <h3 className="text-lg tracking-[1px] font-garamond font-thin text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-[12px] font-metro-nova">
                    {post.excerpt?.slice(0, 120)}...
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-gray-900 text-sm font-medium hover:text-amber-700 transition-colors group"
                  >
                    Continue Reading
                    <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                      <ArrowRight size={18} />
                    </motion.span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Show More Button */}
          {blogs.length > 3 && (
            <div className="text-center mt-12">
              <Link
                to="/community"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 text-xs tracking-wider transition "
              >
                MORE
              </Link>
            </div>
          )}
        </div>
      </section>

      <NewsletterModal
        isOpen={showNewsletter}
        onClose={() => setShowNewsletter(false)}
      />
    </div>
  );
};

export default Home;
