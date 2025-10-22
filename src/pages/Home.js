import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import cat1 from '../assets/cat1.jpg'
import cat2 from '../assets/cat2.jpg'
import cat3 from '../assets/cat3.jpg'
import cat4 from '../assets/cat4.jpg'
import cat5 from '../assets/cat5.jpg'
import NewsletterModal from '../components/NewsletterModal';

const Home = () => {
  const containerRef = useRef(null);
  const collectionRef = useRef(null);
  const blogRef = useRef(null);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const collectionInView = useInView(collectionRef, { once: true, amount: 0.3 });
  const blogInView = useInView(blogRef, { once: true, amount: 0.2 });


//newletter 
useEffect(() => {
  const hasSeenNewsletter = sessionStorage.getItem("hasSeenNewsletter");

  if (!hasSeenNewsletter) {
    const timer = setTimeout(() => {
      setShowNewsletter(true);
      sessionStorage.setItem("hasSeenNewsletter", "true");
    }, 2000); 
    return () => clearTimeout(timer);
  }
}, []);

  // Sample products data
  const products = [
    {
      id: 1,
      name: "MAKOLA",
      image: cat1
    },
    {
      id: 2,
      name: "LABADI",
      image: cat2
    },
    {
      id: 3,
      name: "SOBOLO",
      image: cat3
    },
    {
      id: 4,
      name: "The NORTH",
      image: cat4
    },

    {
      id: 5,
      name: "ABURI",
      image: cat5
    }
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Candle Making",
      excerpt: "Discover the ancient craft of candle making and how we blend tradition with modern techniques to create our unique scents.",
      image: cat2,
      date: "Oct 10, 2025"
    },
    {
      id: 2,
      title: "Choosing the Perfect Scent",
      excerpt: "Learn how different fragrances can transform your space and mood, from calming lavender to invigorating citrus.",
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=400&fit=crop",
      date: "Oct 5, 2025"
    },
    {
      id: 3,
      title: "Sustainable Candle Practices",
      excerpt: "Our commitment to the environment through eco-friendly materials and sustainable production methods.",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop",
      date: "Sep 28, 2025"
    }
  ];



  return (
    <div ref={containerRef} className="bg-[#000000] overflow-x-hidden ">
      {/* Hero Section with Video Background */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen sm:h-[80vh] w-full flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
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

        {/* Hero Content */}
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
            className="text-[x-small] md:text-sm font-metro-nova font-thin tracking-wide mb-8 max-w-2xl mx-auto"
          >
            Hand-poured candles crafted with love and intention
          </motion.p>
          {/* <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 text-[9px] px-8 py-4 rounded-full font-medium tracking-wider hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
          >
            EXPLORE COLLECTION
            <ArrowRight size={20} />
          </motion.button> */}
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

      <section className="bg-[#faf8f6] py-20 px-4 sm:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-900"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[11px] tracking-[2px] uppercase text-gray-600 mb-3"
          >
            Discover the essence of <strong>SNSES</strong> candles
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-light leading-tight mb-6 font-metro-nova"
          >
            Journey of Light & Luxury
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-600 text-[14px] leading-relaxed mb-8 max-w-md font-garamond"
          >
            Designed with unwavering attention to detail, Montroi’s marble includes oil
            burners, candle holders, incense burners, and reed diffusers — all thoughtfully
            crafted to complement Montroi’s signature scents, creating a harmonious and
            refined ambiance in any space.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-300 text-gray-900 px-8 py-3 text-xs tracking-widest hover:bg-gray-400 transition-colors"
          >
            EXPLORE THE COLLECTION
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            src={cat4}
            alt="Timeless stone of the Silk Route"
            className="rounded-sm shadow-md w-full h-auto object-cover"
          />
          <div className="absolute -bottom-6 -right-6 w-[90%] h-[90%] bg-[#f0edea] -z-10"></div>
        </motion.div>
      </div>
    </section>


      {/* Our Collection Carousel Section */}
      <section ref={collectionRef} className="py-20 px-4 sm:px-20 bg-white overflow-hidden">
        <div className="max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={collectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={collectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-thin tracking-wider text-gray-900 mb-2"
            >
              EXPLORE OUR PRODUCTS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={collectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-[12px] font-metro-nova mb-4 tracking-[2px]"
            >
              Made with pride by our craftsmen
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={collectionInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-0.5 bg-amber-600 mx-auto"
            ></motion.div>
          </motion.div>

          {/* Horizontal Scrolling Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={collectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden w-full">
              <motion.div
                className="flex gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25, // Adjust speed (lower = faster)
                  ease: "linear"
                }}
              >
                {[...products, ...products].map((product, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[480px] group cursor-pointer"
                  >
                    <div className="relative overflow-hidden shadow-lg h-[550px] w-[470px]">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay with name on hover */}
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
                          {product.name}
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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={blogInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={blogInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-thin tracking-wider text-gray-900 mb-2"
            >
              FROM OUR COMMUNITY
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={blogInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 bg-amber-600 mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={blogInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + (index * 0.2),
                  ease: "easeOut"
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white p-2 overflow-hidden shadow-md cursor-pointer group "
              >
                <div className="relative overflow-hidden h-[550px]">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={blogInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + (index * 0.2) }}
                    className="text-[10px] tracking-[1px] text-amber-600 font-medium mb-2"
                  >
                    {post.date}
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={blogInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + (index * 0.2) }}
                    className="text-lg tracking-[1px] font-garamond font-thin text-gray-900 mb-3 group-hover:text-amber-700 transition-colors"
                  >
                    {post.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={blogInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + (index * 0.2) }}
                    className="text-gray-600 leading-relaxed mb-4 text-[12px] font-metro-nova"
                  >
                    {post.excerpt}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={blogInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.1 + (index * 0.2) }}
                    className="flex items-center gap-2 text-gray-900 text-sm font-medium hover:text-amber-700 transition-colors group"
                  >
                    Continue Reading
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
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