import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar } from 'lucide-react';

const News = () => {
  const heroRef = useRef(null);
  const newsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const newsInView = useInView(newsRef, { once: true, amount: 0.1 });

  const newsArticles = [
    {
      id: 1,
      date: 'SAT, 04 NOVEMBER, 2023',
      title: 'BEIRUT, A CELESTIAL ODYSSEY ALONG THE SILK ROUTE',
      category: 'MONTROI NEWS',
      excerpt: 'Beirut, nestled on the eastern shores of Mediterranean, stood as a gateway between the East and the West, an enchanted...',
      image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=600&fit=crop'
    },
    {
      id: 2,
      date: 'FRI, 26 MAY, 2023',
      title: 'TIMELESS TRAVEL ACCESSORIES FOR MODERN DAY NOMADS',
      category: 'MONTROI NEWS',
      excerpt: 'Personalization tells the story of the trips and nomad life leaving lasting memories with a stunning collection of over 100 elements...',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop'
    },
    {
      id: 3,
      date: 'THU, 13 APRIL, 2023',
      title: 'AN EXQUISITE CANDLE SCENT INSPIRED FROM THE OLDEST INHABITED CITY, SAMARKAND',
      category: 'MONTROI NEWS',
      excerpt: 'Known for Samarkand\'s pivotal role in shaping the ancient Silk Route, the fabled destination...',
      image: 'https://images.unsplash.com/photo-1602874801006-ec6c31e4e98e?w=600&h=600&fit=crop'
    },
    {
      id: 4,
      date: 'WED, 15 MARCH, 2023',
      title: 'CRAFTSMANSHIP MEETS INNOVATION IN MODERN LEATHER GOODS',
      category: 'SNSES NEWS',
      excerpt: 'Exploring the intersection of traditional craftsmanship and contemporary design in our latest collection of handcrafted leather accessories...',
      image: 'https://images.unsplash.com/photo-1565884563019-47e83d93c90e?w=600&h=600&fit=crop'
    },
    {
      id: 5,
      date: 'TUE, 21 FEBRUARY, 2023',
      title: 'SUPPORTING LOCAL ARTISANS IN NORTHERN GHANA',
      category: 'SNSES NEWS',
      excerpt: 'A journey into the heart of Ghana, where skilled artisans continue centuries-old traditions in leather crafting and design...',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=600&fit=crop'
    },
    {
      id: 6,
      date: 'MON, 09 JANUARY, 2023',
      title: 'THE ART OF SLOW FASHION: QUALITY OVER QUANTITY',
      category: 'SNSES NEWS',
      excerpt: 'In a world of fast fashion, we champion the philosophy of creating timeless pieces that tell a story and stand the test of time...',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop'
    }
  ];

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
            <h1 className="text-xl font-thin tracking-wider text-gray-900 mb-6">
              NEWS & STORIES
            </h1>
            <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
              Discover the latest updates, stories, and insights from SNSES. 
              From artisan spotlights to new collections and cultural journeys.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid Section */}
      <section ref={newsRef} className="py-20 px-4">
        <div className="max-w-8xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={newsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white p-2 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[500px]">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-medium text-gray-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  {/* Category */}
                  <p className="text-xs tracking-widest text-gray-600">
                    {article.category}
                  </p>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Read More Button */}
                  <button className="text-gray-900 text-sm tracking-wide hover:text-amber-700 transition-colors font-medium flex items-center gap-2 group">
                    READ MORE
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={newsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-16"
          >
            <button className="border-2 border-gray-900 text-gray-900 px-10 py-3 text-sm tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300">
              LOAD MORE ARTICLES
            </button>
          </motion.div>
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
              Subscribe to our newsletter to receive the latest news, stories, and exclusive updates directly to your inbox.
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