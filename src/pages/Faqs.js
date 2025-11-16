import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = [
    {
      category: "Orders & Payments",
      questions: [
        {
          question: "How do I place an order?",
          answer: "You can shop directly through our website at www.houseofsnses.com. Simply add your favourite items to your cart, proceed to checkout, and complete your order using one of our secure payment options."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept major debit and credit cards (Visa, Mastercard, American Express) as well as PayPal and other secure online payment gateways."
        },
        {
          question: "Can I change or cancel my order after placing it?",
          answer: "If your order hasn't been dispatched yet, we may be able to amend or cancel it. Please contact us as soon as possible at snsessupport@gmail.com with your order number. Once an order has been shipped, we're unable to make changes."
        },
        {
          question: "Will I receive an order confirmation?",
          answer: "Yes, you will receive a confirmation email right after placing your order, and another email once your order has been dispatched."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "Do you ship internationally?",
          answer: "Yes. We offer worldwide shipping. Delivery times and costs vary depending on your location and will be calculated at checkout."
        },
        {
          question: "How long does delivery take?",
          answer: "Orders are typically processed within 1–2 business days. Estimated delivery times:\n• UK Standard: 2–4 business days\n• UK Express: 1–2 business days\n• Europe: 5–10 business days\n• International: 7–14 business days\n\nPlease note that customs delays or courier issues may affect these estimates."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order has been dispatched, you'll receive a tracking link via email so you can follow your parcel's progress."
        },
        {
          question: "What happens if my parcel is delayed or missing?",
          answer: "If your order hasn't arrived within the expected timeframe, please contact us at snsessupport@gmail.com, and we'll investigate with the courier."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your returns policy?",
          answer: "We accept returns within 14 days of delivery. Items must be unused and in original packaging with all tags attached. Please see our Delivery & Returns Policy for full details."
        },
        {
          question: "How do I return an item?",
          answer: "To start a return, email us at snsessupport@gmail.com with your order number and reason for return. We'll provide instructions and a return address. Return shipping costs are the customer's responsibility unless the item is faulty or incorrect."
        },
        {
          question: "When will I receive my refund?",
          answer: "Once we've received and inspected your return, your refund will be processed within 5–7 business days back to your original payment method."
        },
        {
          question: "Can I exchange an item?",
          answer: "We only replace items if they're defective or damaged. If you need an exchange for the same item, please contact us at snsessupport@gmail.com before sending it back to confirm availability. This is subject to shipping costs incurred by the buyer."
        }
      ]
    },
    {
      category: "Products & Stock",
      questions: [
        {
          question: "An item I want is out of stock, will it be restocked?",
          answer: "We restock popular items regularly. You can join our mailing list or follow us on social media to stay updated on restocks and new arrivals."
        },
        {
          question: "Are your products authentic?",
          answer: "Yes. All items sold on House of SNSES are 100% authentic and produced from verified manufacturers."
        },
        {
          question: "Where are SNSES products manufactured?",
          answer: "Our products are manufactured in the UK and Ghana."
        },
        {
          question: "How do I find my correct size?",
          answer: "You can find a Size Guide on each product page. If you're unsure, contact us at snsesgroup@gmail.com, and our team will be happy to help."
        }
      ]
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          question: "Do I need to create an account to order?",
          answer: "No. You can check out as a guest. However, creating an account allows you to track orders, save your details, and receive special offers."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. All transactions are processed using secure, encrypted payment systems. We never store or share your card details."
        },
        {
          question: "How do you protect my personal information?",
          answer: "We take data protection seriously. Your personal data is handled in line with our Privacy Policy, which complies with UK and EU GDPR standards."
        }
      ]
    },
    {
      category: "Contact Us",
      questions: [
        {
          question: "How can I contact SNSES?",
          answer: "You can reach our support team by email at snsessupport@gmail.com. We aim to respond to all enquiries within 24–48 hours (Monday–Friday)."
        }
      ]
    }
  ];

  // Flatten all questions for global indexing
  const allQuestions = faqCategories.flatMap((cat, catIndex) =>
    cat.questions.map((q, qIndex) => ({
      ...q,
      category: cat.category,
      globalIndex: `${catIndex}-${qIndex}`
    }))
  );

  return (
    <div className="bg-[#f4f1eb] min-h-screen font-serif">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-widest text-gray-600 mb-4">SUPPORT</p>
            <h1 className="text-5xl md:text-6xl font-thin tracking-wide text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Find answers to common questions about orders, shipping, returns, and more.
              Can't find what you're looking for? Contact our support team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="mb-12"
            >
              {/* Category Title */}
              <h2 className="text-2xl font-thin text-gray-900 mb-6 pb-3 border-b border-gray-300">
                {category.category}
              </h2>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={qIndex}
                      className="bg-white border border-gray-200 overflow-hidden transition-all duration-300"
                    >
                      {/* Question Button */}
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-900 pr-8">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-thin text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-sm text-gray-700 mb-6">
            Our support team is here to help you with any enquiries.
          </p>
          <a
            href="mailto:snsessupport@gmail.com"
            className="inline-block bg-gray-900 text-white px-8 py-3 text-xs tracking-widest hover:bg-gray-800 transition-colors"
          >
            CONTACT SUPPORT
          </a>
        </div>
      </section> */}

      {/* Footer Spacer */}
      <div className="h-20 bg-[#f4f1eb]"></div>
    </div>
  );
};

export default FAQs;