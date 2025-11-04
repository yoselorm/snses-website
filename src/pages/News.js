import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/BlogSlice";
import { Link } from "react-router-dom";

const News = () => {
  const heroRef = useRef(null);
  const newsRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const newsInView = useInView(newsRef, { once: true, amount: 0.1 });

  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // ✅ Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs?.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

          <div className="grid md:grid-cols-3 gap-[4rem]">
            {!loading &&
              currentBlogs?.map((article, index) => (
                <motion.article
                  key={article._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={newsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-2 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-[300px]">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={article.image || "https://via.placeholder.com/600"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={14} />
                      <span>
                        {new Date(article.createdAt).toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-lg font-medium text-gray-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs tracking-widest text-gray-600 uppercase">
                      {article.category || "SNSES NEWS"}
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                      {article.excerpt ||
                        article.content?.slice(0, 150) + "..."}
                    </p>

                    <Link
                      to={`/blog/${article._id}`}
                      className="text-gray-900 text-sm tracking-wide hover:text-amber-700 transition-colors font-medium flex items-center gap-2 group"
                    >
                      READ MORE
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        →
                      </motion.span>
                    </Link>
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:flex-1 bg-[#f4f1eb] border-b-2 border-gray-300 py-3 px-4 text-gray-900 focus:outline-none focus:border-amber-700 transition"
              />
              <button className="bg-gray-900 text-white px-8 py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors whitespace-nowrap">
                SUBSCRIBE
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default News;
