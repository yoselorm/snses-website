import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import News from './News';

const Community = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const craftsmanshipRef = useRef(null);
  const quoteRef = useRef(null);
  const galleryRef = useRef(null);
  const valuesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const craftsmanshipInView = useInView(craftsmanshipRef, { once: true, amount: 0.3 });
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.5 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <div className="bg-[#f4f1eb] min-h-screen font-garamond">
      {/* Hero Section - Three Column Layout */}
      <section ref={heroRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-widest text-gray-600 mb-8"
          >
            OUR ARTISANS
          </motion.h2> */}

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Left Column - Title and Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs tracking-widest text-gray-600 mb-4">CRAFTSMANSHIP</p>
                <h1 className="text-5xl font-thin tracking-wide text-gray-900 mb-6">
                  The Modern Silk Route
                </h1>
                <p className="text-sm text-gray-700 leading-relaxed">
                  SNSES works with more than 20 workshops and artisans in Jaipur, Marrakech, Jabal Akhdar, 
                  Ubrique, Bojaano, and Ghana.
                </p>
              </div>
              <button className="bg-white border border-gray-900 text-gray-900 px-6 py-2 text-xs tracking-widest hover:bg-gray-900 hover:text-white transition-colors">
                EXPLORE OUR PRODUCTS
              </button>
            </motion.div>

            {/* Center Column - Large Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-1"
            >
              <div className="bg-gray-300  overflow-hidden shadow-lg h-96">
                <img
                  src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=800&fit=crop"
                  alt="Artisan at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column - Two Text Sections */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xs tracking-widest text-gray-900 mb-3">EAST MEETS WEST</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  True to the SNSES ethos manufacturing takes place in remote locations using traditional 
                  methods, supporting families and local communities where expertise in craftsmanship is passed on 
                  from one generation to the next.
                </p>
              </div>
              <div>
                <h3 className="text-xs tracking-widest text-gray-900 mb-3">A NOMAD JOURNEY</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Our artisans manufacture with pride and care, and SNSES is proud to build a community of 
                  craftsmen who aim to preserve skills for the future.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-16 px-4 bg-[#e8e4dc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: '7', label: 'LOCATIONS' },
              { number: '240', label: 'SKILLED ARTISANS' },
              { number: '20', label: 'WORKSHOPS' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <h2 className="text-6xl font-thin text-gray-900 mb-3">{stat.number}</h2>
                <p className="text-xs tracking-widest text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section - Image Left, Text Right */}
      <section ref={craftsmanshipRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={craftsmanshipInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-gray-300  overflow-hidden shadow-lg h-[500px]"
            >
              <img
                src="https://images.unsplash.com/photo-1565884563019-47e83d93c90e?w=800&h=600&fit=crop"
                alt="Craftsmanship tools"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={craftsmanshipInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs tracking-widest text-gray-600 mb-4">OUR JOURNEY</p>
                <h2 className="text-4xl font-thin text-gray-900 mb-6">Craftsmanship</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  SNSES is committed to building a true nomad story, travelling across the modern Silk Route 
                  looking for craftsmanship and manufacturing beautiful objects where pride and care in work are 
                  still placed highly.
                </p>
              </div>
              <button className="bg-white border border-gray-900 text-gray-900 px-6 py-2 text-xs tracking-widest hover:bg-gray-900 hover:text-white transition-colors">
                EXPLORE OUR PRODUCTS
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section ref={quoteRef} className="py-16 px-4 bg-[#f4f1eb]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <p className="text-gray-700 italic leading-relaxed text-sm">
              "I've always wanted to get as far as possible from the place where I was born.
              <br />
              Far both geographically and spiritually. To leave it behind...
              <br />
              I feel that life is very short and the world is there to see and one should know as much about it as possible.
              <br />
              One belongs to the whole world, not just one part of it."
            </p>
            <p className="text-gray-900 italic text-sm">— Paul Bowles</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Three Images */}
      <section ref={galleryRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=500&fit=crop',
              'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&h=500&fit=crop',
              'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=500&fit=crop'
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-300  overflow-hidden shadow-lg h-80 group"
              >
                <img
                  src={image}
                  alt={`Artisan work ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 px-4 bg-[#e8e4dc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'OUR COMMITMENT',
                description: 'We are committed to being a responsible, honest, and modern company'
              },
              {
                title: 'RESPECTFUL WITH THE ENVIRONMENT',
                description: 'We manufacture long-lasting items, as opposed to mass quick consumption'
              },
              {
                title: 'WE SHARE VALUES WITH OUR PARTNERS',
                description: 'We are responsible for the resources that we use and the impact that we have'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center space-y-4"
              >
                <h3 className="text-xs tracking-widest text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <News/>
      </section>

      {/* Footer Spacer */}
      <div className="h-20 bg-[#f4f1eb]"></div>
    </div>
  );
};

export default Community;