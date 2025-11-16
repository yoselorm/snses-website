import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Mail, MapPin, Globe } from 'lucide-react';

const TermsConditions = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });
  const contactInView = useInView(contactRef, { once: true, amount: 0.5 });

  const sections = [
    {
      number: "1",
      title: "About Us",
      content: [
        "Company name: SNSES GROUP Ltd",
        "Company number: 16341586",
        "Registered address: Longshoreman House, E16, United Kingdom",
        "Email: snsesgroup@gmail.com",
        "Website: www.houseofsnses.com",
        "",
        "SNSES Group Ltd is a company registered in England and Wales."
      ]
    },
    {
      number: "2",
      title: "Use of the Website",
      bullets: [
        "You must be at least 16 years old to use or purchase from our website.",
        "You agree not to use the Site for unlawful purposes or to disrupt its operation.",
        "We reserve the right to suspend or terminate your access if we reasonably believe you have breached these Terms."
      ]
    },
    {
      number: "3",
      title: "Product Information",
      intro: "We make every effort to ensure product descriptions, images, and prices are accurate. However:",
      bullets: [
        "Colours may vary slightly due to screen differences.",
        "Prices and stock availability are subject to change.",
        "We reserve the right to correct any errors or inaccuracies without prior notice."
      ]
    },
    {
      number: "4",
      title: "Orders and Payments",
      bullets: [
        "All orders are subject to acceptance and product availability.",
        "After placing an order, you'll receive a confirmation email. This does not mean your order has been accepted — acceptance occurs when we dispatch the goods.",
        "We reserve the right to cancel or refuse orders, for example due to stock errors or suspected fraudulent activity.",
        "Payment must be made at checkout using one of our secure payment providers (e.g., Stripe, PayPal).",
        "All payments are processed safely and securely."
      ]
    },
    {
      number: "5",
      title: "Pricing",
      bullets: [
        "All prices on our Site are shown in GBP (£) and include all applicable charges.",
        "Delivery costs are shown separately at checkout before you confirm your order.",
        "For international orders, customers are responsible for any import duties, taxes, or customs charges imposed by their country."
      ]
    },
    {
      number: "6",
      title: "Shipping and Delivery",
      content: [
        "We aim to dispatch all orders within 1–2 business days.",
        "Delivery times vary depending on your location and shipping method.",
        "We are not responsible for courier delays or circumstances beyond our control (e.g., customs delays, weather events, strikes).",
        "",
        "For full details, please see our Delivery & Returns policy."
      ]
    },
    {
      number: "7",
      title: "Returns and Refunds",
      intro: "We want you to love your purchase. If for any reason you're not satisfied, you may return items within 14 days of receiving your order.",
      subheading: "To qualify:",
      bullets: [
        "Items must be unused, unworn, and in original packaging with tags attached.",
        "For hygiene reasons, certain items (e.g., underwear, swimwear, earrings) cannot be returned unless faulty.",
        "Return postage costs are the customer's responsibility unless the item is faulty or incorrect."
      ],
      additional: "Refunds are processed within 5–7 business days after we receive and inspect your returned goods.",
      footer: "For detailed instructions, please review our Delivery & Returns page."
    },
    {
      number: "8",
      title: "Right to Cancel (UK/EU Consumers)",
      intro: "Under the Consumer Contracts Regulations 2013, UK and EU consumers have the right to cancel their order within 14 days of receiving it for any reason.",
      subheading: "To exercise this right:",
      orderedList: [
        "Contact us by email at snsesgroup@gmail.com within 14 days of delivery.",
        "Return the goods to us within 14 days of notifying us.",
        "We'll issue a refund within 14 days of receiving the returned goods."
      ],
      subheading2: "This right does not apply to:",
      bullets: [
        "Custom-made or personalized items",
        "Sealed goods that have been opened (for example, beauty or hygiene products)"
      ]
    },
    {
      number: "9",
      title: "Intellectual Property",
      content: [
        "All content on this Site, including text, logos, graphics, and images, is owned by SNSES Ltd or its licensors and is protected under copyright and trademark laws.",
        "",
        "You may not reproduce, distribute, or use any content from this Site without prior written consent from SNSES Ltd."
      ]
    },
    {
      number: "10",
      title: "Limitation of Liability",
      intro: "To the maximum extent permitted by law:",
      bullets: [
        "We are not liable for any indirect, incidental, or consequential losses arising from your use of our Site or products.",
        "Our total liability for any claim shall not exceed the amount paid for the product in question."
      ],
      footer: "Nothing in these Terms excludes or limits our liability for fraud, negligence, or death/personal injury caused by our negligence, or affects your statutory rights."
    },
    {
      number: "11",
      title: "Privacy and Data Protection",
      content: [
        "Your personal data is processed in accordance with our Privacy Policy, which complies with the UK GDPR and EU GDPR.",
        "",
        "Please read it to understand how we collect, use, and protect your personal information."
      ]
    },
    {
      number: "12",
      title: "Events Beyond Our Control",
      content: [
        "We are not liable for delays or failures caused by events beyond our reasonable control (for example, postal strikes, natural disasters, or courier delays)."
      ]
    },
    {
      number: "13",
      title: "Changes to These Terms",
      content: [
        "We may update these Terms occasionally to reflect business changes or legal updates.",
        "",
        "The latest version will always be available on this page with the revised 'Last updated' date."
      ]
    },
    {
      number: "14",
      title: "Governing Law",
      content: [
        "These Terms are governed by and construed in accordance with the laws of England and Wales.",
        "",
        "You agree that any disputes will be handled exclusively by the courts of England and Wales."
      ]
    }
  ];

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
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-gray-600" />
              <p className="text-xs tracking-widest text-gray-600">LEGAL</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-thin tracking-wide text-gray-900 mb-6">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-600">Last updated: 13/11/2025</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4 bg-[#e8e4dc]">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-700 leading-relaxed">
            Welcome to SNSES GROUP Ltd ("we," "us," or "our"). These Terms and Conditions ("Terms") govern your use of our website <a href="http://www.houseofsnses.com" className="underline hover:text-gray-900">www.houseofsnses.com</a> (the "Site") and any purchases made through it.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mt-4">
            By accessing or using our Site, you agree to be bound by these Terms. If you do not agree, please do not use our Site.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white p-8"
            >
              <h2 className="text-2xl font-thin text-gray-900 mb-4">
                {section.number}. {section.title}
              </h2>

              {section.intro && (
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {section.intro}
                </p>
              )}

              {section.content && (
                <div className="space-y-2">
                  {section.content.map((line, i) => (
                    <p key={i} className="text-sm text-gray-700 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {section.subheading && (
                <p className="text-sm font-medium text-gray-900 mt-4 mb-3">
                  {section.subheading}
                </p>
              )}

              {section.bullets && (
                <ul className="space-y-2 mb-4">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="mr-3 mt-1">•</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.orderedList && (
                <ol className="space-y-2 mb-4">
                  {section.orderedList.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="font-medium mr-3">{i + 1}.</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              )}

              {section.subheading2 && (
                <p className="text-sm font-medium text-gray-900 mt-4 mb-3">
                  {section.subheading2}
                </p>
              )}

              {section.additional && (
                <p className="text-sm text-gray-700 leading-relaxed mt-4">
                  {section.additional}
                </p>
              )}

              {section.footer && (
                <p className="text-sm text-gray-700 leading-relaxed mt-4 italic">
                  {section.footer}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-[#f4f1eb] p-12"
          >
            <h2 className="text-3xl font-thin text-gray-900 mb-8 text-center">Contact Us</h2>
            <p className="text-sm text-gray-700 mb-8 text-center">
              If you have any questions about these Terms, please contact us:
            </p>
            
            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-900 text-center mb-6">
                SNSES GROUP Ltd
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-12 gap-4 text-sm text-gray-700">
                <div className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <a href="mailto:snsesgroup@gmail.com" className="hover:text-gray-900 transition-colors">
                    snsesgroup@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span>Longshoreman House, E16, United Kingdom</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 text-sm text-gray-700 pt-4">
                <Globe className="w-5 h-5 text-gray-600" />
                <a href="http://www.houseofsnses.com" className="hover:text-gray-900 transition-colors">
                  www.houseofsnses.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-20 bg-[#f4f1eb]"></div>
    </div>
  );
};

export default TermsConditions;