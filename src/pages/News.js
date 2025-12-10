import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/BlogSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url_v1 } from "../utils/config";

const News = () => {
  const heroRef = useRef(null);
  const newsRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const newsInView = useInView(newsRef, { once: true, amount: 0.1 });

  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [loadingNewsletter, setLoadingNewsletter] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs?.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Newsletter subscription handler
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
    <div className="bg-[#f4f1eb] min-h-screen font-garamond">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-thin tracking-wider text-gray-900 mb-6">
              NEWS
            </h1>
            <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
            Follow the world of SNSES - discover the latest stories of artisans, new creations, cultural journeys, and community impact
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section ref={newsRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <p className="text-center text-gray-600">Loading articles...</p>
          )}
          {error && (
            <p className="text-center text-red-600">Error: {error}</p>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {!loading &&
              currentBlogs?.map((article, index) => (
                <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 50 }}
                animate={newsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#ffffff] border-[12px] border-[#ffffff] shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="overflow-hidden h-[400px]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={article.image || "https://via.placeholder.com/600"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              
                {/* Content */}
                <div className="flex flex-col justify-between flex-1 px-8 py-10 text-center">
                  <div className="space-y-3">
                    <h3 className="text-[11px] text-gray-500 uppercase font-garamond">
                      {new Date(article.created_at).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
              
                    <h2 className="text-[15px] leading-snug font-medium text-gray-900 uppercase font-metro-nova">
                      {article.title}
                    </h2>
             
              
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                      {article.excerpt || article.content?.slice(0, 150) + "..."}
                    </p>
                  </div>
              
                  <div className="mt-8">
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-block border border-gray-900 text-gray-900 text-[12px] tracking-widest px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors"
                    >
                      READ MORE
                    </Link>
                  </div>
                </div>
              </motion.article>
              
              ))}
          </div>

          {/* Pagination */}
          {!loading && blogs?.length > 6 && (
            <div className="flex justify-center items-center gap-3 mt-12">
              {Array.from({ length: totalPages })?.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full border border-gray-800 text-sm font-medium transition-all ${
                    currentPage === i + 1
                      ? "bg-gray-900 text-white"
                      : "bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-thin tracking-wider text-gray-900 mb-6">
              Stay Updated
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-8">
              Subscribe to our newsletter to receive the latest news, stories, and
              exclusive updates directly to your inbox.
            </p>

            {/* Status Messages */}
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={loadingNewsletter}
                className="w-full sm:flex-1 bg-[#f4f1eb] border-b-2 border-gray-300 py-3 px-4 text-gray-900 focus:outline-none focus:border-amber-700 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default News;