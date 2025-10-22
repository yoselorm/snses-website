import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import founder from '../assets/owner.jpeg'

const OurStory = () => {
  const topRef = useRef(null);
  const founderRef = useRef(null);
  const quoteRef = useRef(null);
  const valuesRef = useRef(null);
  const communityRef = useRef(null);
  const craftRef = useRef(null);

  const topInView = useInView(topRef, { once: true, amount: 0.3 });
  const founderInView = useInView(founderRef, { once: true, amount: 0.3 });
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.5 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const communityInView = useInView(communityRef, { once: true, amount: 0.3 });
  const craftInView = useInView(craftRef, { once: true, amount: 0.3 });

  return (
    <div className="bg-[#ffffff] min-h-screen">
      {/* Top Section - Side by Side */}
      <section ref={topRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-xl font-thin tracking-wider mb-16 text-left font-metro-nova"
          >
            OUR STORY
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Video/Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={topInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-[#1a1f3a] text-white p-8 mb-8">
                <p className="leading-relaxed text-sm">
                  A video to showcase the beautiful story of Ghana. Like storytelling through moments, laughters, 
                  food, history, the women in the north doing shea butter, Ghana's coastal shores, makola's business 
                  and vibrance etc and at the end SNSES candle will be presented at the end.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Essence */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={topInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-[5] font-metro-nova tracking-wider mb-6 text-gray-700">The essence of SNSES</h2>
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed font-garamond">
                <p>
                  Inspired by the rich culture, history, and flavors of Ghana, West Africa, SNSES curates a luxurious 
                  collection of creations that transport you through sensory experience. Each piece is a tribute to the 
                  country's vibrant traditions, evoking cherished memories and untold stories. From the warmth of traditional 
                  spices to the rhythm of local festivities, every SNSES design offers a journey - an immersive experience 
                  that captures the essence of Ghana and Africa at large. With unparalleled craftsmanship and evocative 
                  storytelling, SNSES redefines modern luxury by celebrating culture, tradition, and artistry.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section ref={quoteRef} className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-gray-600 italic leading-relaxed text-base font-garamond">
              "SNSES is for those who cherish authenticity, beauty, and depth. With a commitment to quality over quantity, 
              each creation is made to endure — not only in form, but in meaning. Created for the bold and curious, SNSES is more 
              than a brand. It is a journey into artistry, authenticity, and refined luxury."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section ref={founderRef} className="py-20 px-4 bg-[#f4f1eb]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={founderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl font-thin tracking-wider text-gray-900 mb-12 text-center font-garamond"
          >
            Meet the founder
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center font-garamond">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 text-gray-700"
            >
              <p className="leading-relaxed text-sm ">
              When I created SNSES, I didn’t set out to build just another brand. From a young age, I’ve always had a creative mind and a deep love for storytelling. Being born and raised in Ghana, I grew up surrounded by the richness of culture, history, and artistry that shaped the way I see the world. I knew that whatever I created had to reflect that depth — not just products, but stories brought to life.

              </p>
              <p className="leading-relaxed text-sm">
                I  wanted SNSES to be more than something you buy. I wanted it to be something you experience. Each carefully crafted piece carries with it a connection to Ghana and to Africa’s wider narrative. It’s about celebrating heritage reimagined through design, wellness and artistry.
              </p>
              <p className="leading-relaxed text-sm">
                I set out on a mission to work with the expertise of local artisans to masterfully craft products that blend indigenous natural ingredients with evocative scent stories. Each creation is designed to transform everyday routines into moments of luxury and meaning. It’s about creating experiences that tell a story of culture and craftsmanship. SNSES is not simply about what you hold in your hands; it is about the story it carries. Each piece is rooted in Ghana, yet shared with the world.

              </p>
              <p className="leading-relaxed text-sm">
              I hope each SNSES product fills your home with a sense of timeless luxury and meaning, creating moments you will carry with you always.
              </p>
              <div className="pt-6">
                <p className="text-sm font-thin italic text-gray-800">With gratitude and love..</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="bg-gray-300 overflow-hidden shadow-xl h-[600px]">
                <img
                  src={founder}
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-sm font-garamond">
              We craft more than products — we create experiences. Each piece is designed to resonate deeply, emotion, and satisfaction, 
              carrying with it the echoes of Ghanaian heritage and contemporary values. Every SNSES product tells beauty, our fine lingane 
              kings offers the moment's supposed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-sm font-garamond">
              Collaborating with women and young people in local communities has been essential to our mission in empowering them. I have 
              found glowing market a vibrant craft unique events to sustained interior objects, every SNSES product is a bridge between our 
              culture, and luxury.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                className="bg-gray-200 overflow-hidden shadow-lg h-64 flex items-center justify-center"
              >
                <p className="text-gray-600 text-center px-6">Picture of products<br />(refer to Montroi)</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SNSES Supports Communities Section */}
      <section ref={communityRef} className="py-20 px-4 bg-[#f4f1eb]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={communityInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-gray-200 overflow-hidden shadow-lg h-96 flex items-center justify-center"
            >
              <p className="text-gray-600 text-center px-6">Picture of products<br />(refer to Montroi)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={communityInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-[5] font-metro-nova tracking-wider text-gray-900 mb-6">
                SNSES supports communities
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm font-garamond">
                Of SNSES beauty is not only about what our values say about the hopes we stem behind our collections. We believe we can 
                make positive, impactful a now. Children, around and providing all we need to understand how. That's why we launched the 
                SNSES Community Fund – an initiative that both mobilizes section only nearly of heritage but cause the people and hearts 
                of those who create it.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={communityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-4 text-sm font-garamond"
          >
            <p>
              Through SNSES, we work with local artisan groups and makers in Northern Ghana. They are important voices because we supporting 
              and empowering young individuals with designed underdeveloped and sustainable opportunities. This, each time you see there is a 
              reflection of resilience, giving them time back to these makers.
            </p>
            <p>
              For we SNSES is a community. That's a privilege. Our this, brings shared beauty that over SNEEZE values and its partnership to 
              presenting traditions, empowering opinions, cities. minding fashion boundaries.
            </p>
            <div className="text-center pt-8">
              <button className="bg-gray-300 text-gray-900 px-8 py-3 hover:bg-gray-400 transition-colors text-sm tracking-wider">
                Learn more
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Behind the Craft Section */}
      <section ref={craftRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={craftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl font-thin tracking-wider text-gray-900 mb-12 text-center font-metro-nova"
          >
            Behind the craft
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {['Picture of artisans', 'Picture of products\n(refer to Montroi)', 'Picture of products\n(refer to Montroi)'].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={craftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="bg-[#1a1f3a] overflow-hidden shadow-lg h-80 flex items-center justify-center group hover:scale-105 transition-transform duration-300"
              >
                <p className="text-white text-center px-6 whitespace-pre-line">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={craftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-6xl mx-auto space-y-6 text-center mb-8 font-garamond"
          >
            <p className="text-gray-700 leading-relaxed text-sm">
              Every SNSES creation begins with care. We work closely with skilled artisans, drawing on generations of knowledge and 
              craftsmanship to ensure that each piece is made with precision and meaning. From the sourcing of indigenous natural 
              ingredients to the thoughtful design of our products, every step is guided by intention. Nothing is rushed, and 
              nothing is without purpose because we believe luxury is found not only in the finished product, but in the process itself.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              What you hold in your hands is the result of many hands - artisans, makers, and creators who pour their expertise into 
              every stage. This is how we ensure that each product carries not just beauty, but also a story of dedication, responsibility, 
              and care.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={craftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center"
          >
            <button className="bg-gray-300 text-gray-900 px-8 py-3 text-xs tracking-widest hover:bg-gray-400 transition-colors">
              DISCOVER OUR PRODUCTS
            </button>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default OurStory;