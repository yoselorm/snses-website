import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const containerRef = useRef(null);
  const collectionRef = useRef(null);
  const blogRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const collectionInView = useInView(collectionRef, { once: true, amount: 0.3 });
  const blogInView = useInView(blogRef, { once: true, amount: 0.2 });

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const carouselRef = useRef(null);

  // Auto-scroll carousel
  useEffect(() => {
    if (!collectionInView || isManualScroll) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        const currentScroll = carouselRef.current.scrollLeft;

        if (currentScroll >= maxScroll) {
          // Reset to beginning for infinite loop
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          setScrollPosition(0);
        } else {
          // Scroll to next item (352px = 320px width + 32px gap)
          const nextScroll = currentScroll + 352;
          carouselRef.current.scrollTo({ left: nextScroll, behavior: 'smooth' });
          setScrollPosition(nextScroll);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [collectionInView, isManualScroll, scrollPosition]);

  // Handle manual scroll
  const handleManualScroll = (direction) => {
    setIsManualScroll(true);
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      const scrollAmount = direction === 'left' ? -352 : 352;
      carouselRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
    // Resume auto-scroll after 5 seconds of manual interaction
    setTimeout(() => setIsManualScroll(false), 5000);
  };

  // Sample products data
  const products = [
    {
      id: 1,
      name: "BAGS",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop"
    },
    {
      id: 2,
      name: "PERFUMES",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop"
    },
    {
      id: 3,
      name: "TRAVEL ACCESSORIES",
      image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&h=600&fit=crop"
    },
    {
      id: 4,
      name: "LEATHER GOODS",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop"
    },
    {
      id: 5,
      name: "CANDLES",
      image: "https://images.unsplash.com/photo-1602874801006-ec6c31e4e98e?w=600&h=600&fit=crop"
    },
    {
      id: 6,
      name: "HOME DECOR",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&h=600&fit=crop"
    }
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Candle Making",
      excerpt: "Discover the ancient craft of candle making and how we blend tradition with modern techniques to create our unique scents.",
      image: "https://images.unsplash.com/photo-1602874801006-ec6c31e4e98e?w=600&h=400&fit=crop",
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
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 text-[9px] px-8 py-4 rounded-full font-medium tracking-wider hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
          >
            EXPLORE COLLECTION
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </motion.section>

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
            <div className="flex gap- overflow-x-auto pb-8 scrollbar-hide">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={collectionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.9 + (index * 0.15),
                    ease: "easeOut"
                  }}
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
                </motion.div>
              ))}
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


    </div>
  );
};

export default Home;