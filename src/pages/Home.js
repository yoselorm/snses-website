import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/CategorySlice';
import { fetchBlogs } from '../redux/BlogSlice';
import { Link } from 'react-router-dom';
import NewsletterModal from '../components/NewsletterModal';
import bestseller01 from '../assets/bestseller01.jpeg'
import bestseller02 from '../assets/bestseller02.jpeg'
import bestseller03 from '../assets/bestseller03.jpeg';
import wwa from '../assets/whoweare.jpeg'

const Home = () => {
  const containerRef = useRef(null);
  const bestSellersRef = useRef(null);
  const collectionRef = useRef(null);
  const whoWeAreRef = useRef(null);
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


  const bestSellersInView = useInView(bestSellersRef, { once: true, amount: 0.3 });
  const collectionInView = useInView(collectionRef, { once: true, amount: 0.3 });
  const whoWeAreInView = useInView(whoWeAreRef, { once: true, amount: 0.3 });
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

  // Best seller products (mock data - replace with your actual data)
  const bestSellers = [
    {
      id: 1,
      name: "The North",
      price: "£49",
      image: bestseller01
    },
    {
      id: 2,
      name: "Makola",
      price: "£49",
      image: bestseller02
    },
    {
      id: 3,
      name: "Sobolo",
      price: "£49",
      image: bestseller03
    }
  ];
  

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
          className="relative z-10 text-center top-[250px] text-white px-4"
        >
          <Link to='/shop'>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-amber-400 text-[9px] px-8 py-4 border border-amber-500 font-medium tracking-wider hover:bg-white transition-colors flex items-center gap-2 mx-auto"
            >
              EXPLORE
              <ArrowRight size={20} />
            </motion.button></Link>
        </motion.div>
      </motion.section>

      {/* Best Sellers Featured Section */}
      <section ref={bestSellersRef} className="py-20 px-4 sm:px-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={bestSellersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-thin tracking-wider text-gray-900 mb-2">
              BESTSELLERS
            </h2>
            <p className="text-gray-600 text-base font-garamond mb-4 ">
              Discover our best-selling creations, where culture and craftsmanship meet to tell stories that linger
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                animate={bestSellersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group cursor-pointer"
              >
                <Link to='shop'>
                  <div className="relative overflow-hidden bg-white shadow-lg mb-4">
                    <div className="aspect-square overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                      {/* <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="bg-white text-gray-900 px-6 py-2 text-xs tracking-wider hover:bg-[#DDC57A] hover:text-white transition-colors"
                    >
                      VIEW DETAILS
                    </motion.button> */}
                    </motion.div>
                  </div></Link>
                <div className="text-center">
                  <h3 className="text-lg font-garamond tracking-wide text-gray-900 mb-2 group-hover:text-amber-700 transition-colors uppercase">
                    {product.name}
                  </h3>
                  <h3 className="text-lg tracking-wide font-jost text-gray-900 mb-2 group-hover:text-amber-700 transition-colors uppercase ">
                    {product.price}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section ref={whoWeAreRef} className="py-20 px-4 sm:px-20 bg-[#f4f1eb]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={whoWeAreInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-thin tracking-wider text-gray-900 mb-4">
                  WHO WE ARE
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-base font-garamond">
                SNSES is a cultural archive crafted through scent and storytelling. We believe in the power of storytelling and the importance of preserving culture through modern mediums. Through meticulously designed fragrances and immersive experiences, SNSES brings Africa’s vibrant stories to life, weaving together tradition and turning each moment into a journey across the continent’s rich and layered cultural tapestry. Our creations celebrate culture, creativity, and the artistry of heritage, inviting you to explore a world where history and the senses converge.              </p>

              <p className="text-gray-700 leading-relaxed text-base font-garamond">
                Through every creation, SNSES honors Africa’s cultural legacy, transforming history, artistry, and tradition into fragrances and experiences that awaken the senses              </p>



              <Link to='/our-story'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] px-8 py-3 text-xs tracking-wider transition mt-4"
                >
                  LEARN MORE ABOUT US
                </motion.button></Link>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={whoWeAreInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src={wwa}
                  alt="Our Craftsmanship"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Carousel - Smaller Squares */}
      <section ref={collectionRef} className="py-20  bg-white overflow-hidden">
        <div className="max-w-screen mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={collectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-thin tracking-wider text-gray-900 mb-2">
              EXPLORE OUR PRODUCTS
            </h2>

          </motion.div>

          {/* Moving Carousel - Smaller Squares */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={collectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative"
          >
           {categories?.length > 0 && <div className="relative overflow-hidden w-full">
              <motion.div
                className="flex gap-6"
                animate={{ x: [0, -((categories.length * (280 + 24)))] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: categories.length * 3,
                  ease: 'linear',
                }}
              >
                {[...categories,...categories, ...categories]?.map((category, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[280px] group cursor-pointer"
                  >
                    <Link to="shop">
                      <div className="relative overflow-hidden shadow-lg aspect-square">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          src={category.image || 'https://via.placeholder.com/300'}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Dark hover overlay */}
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
                            className="text-white font-garamond text-xl font-light tracking-widest"
                          >
                            {category.category}
                          </motion.h3>
                        </motion.div>
                      </div>

                      {/* Category name below image */}
                      <h3 className="mt-3 text-center font-garamond text-lg text-gray-800 tracking-wide">
                        {category.category}
                      </h3>
                    </Link>

                  </div>
                ))}
              </motion.div>
            </div>}
          </motion.div>

          {/* Customer Review */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={collectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-20 max-w-7xl mx-auto"
          >
            {/* <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-amber-500 text-amber-500" />
              ))}
            </div> */}
            <p className="text-gray-700 text-[20px] sm:text-[40px] font-garamond leading-relaxed mb-4">
              “From the packaging to the fragrance, everything feels luxurious. The aromas are rich, complex, and the candle burns beautifully.”            </p>
            {/* <p className="text-[#DDC57A] font-medium text-sm tracking-wider">
              — SARAH M., VERIFIED CUSTOMER
            </p> */}
          </motion.div>
        </div>
      </section>



      {/* Blog Section */}
      <section ref={blogRef} className="py-20 px-4 sm:px-16 bg-[#f4f1eb]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-thin tracking-wider text-gray-900 mb-2">
              FROM OUR COMMUNITY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem]">
            {displayedBlogs.map((post, index) => (
              <motion.post
                key={post._id}
                initial={{ opacity: 0, y: 50 }}
                animate={blogInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#ffffff] border-[12px] border-[#ffffff] shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="overflow-hidden h-[400px]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={post.image || "https://via.placeholder.com/600"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 px-8 py-10 text-center">
                  <div className="space-y-3">
                    <h3 className="text-[11px] text-gray-500 uppercase font-garamond">
                      {new Date(post.created_at).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>

                    <h2 className="text-[15px] leading-snug font-extrabold uppercase font-metro-nova">
                      {post.title}
                    </h2>

                    {/* <p className="text-[11px] tracking-widest text-gray-700 uppercase">
                  {post.category || "SNSES NEWS"}
                </p> */}

                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                      {post.excerpt || post.content?.slice(0, 150) + "..."}
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-block border border-gray-900 text-gray-900 text-[12px] tracking-widest px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors"
                    >
                      READ MORE
                    </Link>
                  </div>
                </div>
              </motion.post>

            ))}
          </div>

          {/* Show More Button */}
          {blogs?.length > 3 && (
            <div className="text-center mt-12">
              <Link
                to="/community"
                className="inline-block bg-[#4b0c0c] text-[#f1e7c7] hover:bg-[#4b0c0cd8] px-6 py-2 text-xs tracking-wider transition"
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