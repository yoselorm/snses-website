import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import News from './News';
import { Link } from 'react-router-dom';
import comm01 from '../assets/comm01.jpeg'
import comm02 from '../assets/comm02.jpeg'
import comm03 from '../assets/comm03.jpeg'

const Community = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const galleryRef = useRef(null);
  const valuesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const images = [comm01,comm03,comm02]

  // Stats with count-up animation
  const stats = [
    { number: 100, label: 'KIDS EMPOWERED' },
    { number: 50, label: 'YOUNG ARTISANS TRAINED' },
    { number: 12, label: 'COMMUNITIES IMPACTED' },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (statsInView) {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.number;
        const duration = 3000;
        const increment = end / (duration / 30);

        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(counter);
          }
          setCounts(prev => {
            const updated = [...prev];
            updated[index] = Math.floor(start);
            return updated;
          });
        }, 30);
      });
    }
  }, [statsInView]);


  

  return (
    <div className="bg-[#f4f1eb] min-h-screen font-garamond">
      {/* HERO SECTION - Full width with overlay */}
      <section
        ref={heroRef}
        className="relative w-full h-[50vh] flex items-center justify-center text-center"
      >
        <img
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop"
          alt="Community"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* dark overlay */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white px-6"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-6">Our Global Community</h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg mb-8">
            Celebrating craftsmanship, culture, and collaboration — where creativity connects
            hearts across continents.
          </p>
        
        </motion.div>
      </section>

      {/* STATISTICS SECTION */}
      <section ref={statsRef} className="py-16 px-4 bg-[#e8e4dc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <h2 className="text-6xl font-thin text-gray-900 mb-3">
                  {counts[index]}
                </h2>
                <p className="text-xs tracking-widest text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section ref={galleryRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-300 overflow-hidden shadow-lg h-100 group"
              >
                <img
                  src={image}
                  alt={`Community work ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section ref={valuesRef} className="py-20 px-4 bg-[#e8e4dc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'WE EMPOWER COMMUNITIES',
                description:
                  'Through collaboration, education, and social impact initiatives, we support artisans and future generations.',
              },
              {
                title: 'WE CRAFT WITH CARE',
                description:
                  'From artisans to materials, each step is guided by intention and precision, creating products that embody quality and meaning.',
              },
              {
                title: 'WE CELEBRATE STORIES',
                description:
                  'Every creation carries a narrative — honoring heritage, tradition, and the artistry that inspires it.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center space-y-4"
              >
                <h3 className="text-xs tracking-widest text-gray-900">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section>
        <News />
      </section>

      {/* FOOTER SPACER */}
      <div className="h-20 bg-[#f4f1eb]"></div>
    </div>
  );
};

export default Community;
