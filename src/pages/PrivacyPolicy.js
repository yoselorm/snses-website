import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Mail, MapPin, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });
  const contactInView = useInView(contactRef, { once: true, amount: 0.5 });

  const dataUsageTable = [
    {
      purpose: "To process and deliver your orders",
      legalBasis: "Performance of a contract"
    },
    {
      purpose: "To communicate with you about your order or account",
      legalBasis: "Performance of a contract / Legitimate interest"
    },
    {
      purpose: "To provide customer support",
      legalBasis: "Performance of a contract"
    },
    {
      purpose: "To send marketing communications (if you opt in)",
      legalBasis: "Consent"
    },
    {
      purpose: "To improve and personalize your shopping experience",
      legalBasis: "Legitimate interest"
    },
    {
      purpose: "To prevent fraud and maintain website security",
      legalBasis: "Legitimate interest"
    },
    {
      purpose: "To comply with legal and regulatory obligations",
      legalBasis: "Legal obligation"
    }
  ];

  const sections = [
    {
      number: "1",
      title: "Who We Are",
      content: [
        "Company name: SNSES GROUP Ltd",
        "Company number: 16341586",
        "Registered address: Longshoreman House, E16, United Kingdom",
        "Email: snsesgroup@gmail.com",
        "Website: www.houseofsnses.com",
        "",
        "For the purposes of data protection law, SNSES Ltd is the data controller of your personal data."
      ]
    },
    {
      number: "2",
      title: "The Information We Collect",
      intro: "We collect personal information in the following ways:",
      subsections: [
        {
          title: "a. Information You Provide Directly",
          intro: "When you use our Site, contact us, or make a purchase, we may collect:",
          bullets: [
            "Name",
            "Billing and shipping address",
            "Email address",
            "Phone number",
            "Payment details (processed securely via third-party payment providers such as Stripe or PayPal)",
            "Account details (if you create one)",
            "Any messages or correspondence you send to us"
          ]
        },
        {
          title: "b. Information Collected Automatically",
          intro: "When you visit our Site, we may automatically collect:",
          bullets: [
            "IP address and approximate location",
            "Browser type, version, and device information",
            "Pages viewed and time spent on our Site",
            "Referring website or advertising source",
            "Cookies and similar tracking technologies (see 'Cookies' below)"
          ]
        }
      ]
    },
    {
      number: "3",
      title: "How We Use Your Information",
      intro: "We process your personal data for the following purposes and under the legal bases defined by the GDPR:",
      hasTable: true
    },
    {
      number: "4",
      title: "Cookies",
      intro: "We use cookies and similar technologies to:",
      bullets: [
        "Enable site functionality (e.g., shopping cart, login)",
        "Analyse website traffic and performance",
        "Personalise content and ads"
      ],
      footer: "You can manage your cookie preferences or disable them at any time through your browser settings. For more information, please review our Cookie Policy (coming soon)."
    },
    {
      number: "5",
      title: "Sharing Your Data",
      intro: "We only share your information with trusted third parties who assist us in running our business. These may include:",
      bullets: [
        "Payment processors (e.g., Stripe, PayPal)",
        "Shipping and logistics partners",
        "IT and website hosting providers",
        "Marketing and analytics services (e.g., Google Analytics, Meta Ads)"
      ],
      additional: [
        "Each of these providers is required to handle your data securely and only for the purpose of providing their service to us.",
        "",
        "We will never sell or rent your personal data to any third party."
      ]
    },
    {
      number: "6",
      title: "International Data Transfers",
      content: [
        "Some of our service providers may operate outside the United Kingdom (UK) or European Economic Area (EEA).",
        "",
        "When we transfer your personal data internationally, we ensure that it is protected by one of the following safeguards:"
      ],
      bullets: [
        "The country has an adequacy decision from the UK or European Commission; or",
        "We have implemented Standard Contractual Clauses (SCCs) approved by the UK ICO or EU Commission."
      ]
    },
    {
      number: "7",
      title: "Data Retention",
      intro: "We retain your personal information only for as long as necessary to:",
      bullets: [
        "Provide the services you've requested",
        "Fulfil our legal, tax, and accounting obligations",
        "Resolve disputes and enforce agreements"
      ],
      footer: "When your information is no longer needed, we securely delete or anonymise it."
    },
    {
      number: "8",
      title: "Your Rights",
      intro: "Under the UK GDPR and EU GDPR, you have the right to:",
      bullets: [
        "Access the personal data we hold about you",
        "Request correction of inaccurate or incomplete data",
        "Request deletion ('right to be forgotten')",
        "Restrict processing or object to certain uses of your data",
        "Withdraw consent (where processing is based on consent)",
        "Request data portability in a structured, machine-readable format"
      ],
      contactInfo: "To exercise any of these rights, please contact us at snsesgroup@gmail.com",
      additional: [
        "We will respond to your request within one month as required by law.",
        "",
        "If you are not satisfied with our response, you have the right to file a complaint with your local data protection authority:"
      ],
      complaints: [
        "UK: Information Commissioner's Office (ICO)",
        "EU: Contact your national data protection authority via the EDPB website"
      ]
    },
    {
      number: "9",
      title: "Data Security",
      intro: "We take your privacy seriously and use appropriate technical and organisational measures to safeguard your information, including:",
      bullets: [
        "Secure data storage",
        "SSL encryption on our website",
        "Restricted access to authorised staff only"
      ],
      footer: "While we take every reasonable precaution, no online transmission or storage method is completely secure, and we cannot guarantee absolute protection."
    },
    {
      number: "10",
      title: "Children's Privacy",
      content: [
        "Our website is not directed at or intended for individuals under 16 years of age.",
        "",
        "We do not knowingly collect personal data from children. If we learn that we have done so, we will delete the information promptly."
      ]
    },
    {
      number: "11",
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our business practices, technology, or legal requirements.",
        "",
        "The updated version will always be posted on this page with the revised 'Last updated' date."
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
              <Shield className="w-6 h-6 text-gray-600" />
              <p className="text-xs tracking-widest text-gray-600">LEGAL</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-thin tracking-wide text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-600">Last updated: 13/11/2025</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4 bg-[#e8e4dc]">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-700 leading-relaxed">
            This Privacy Policy explains how SNSES GROUP Ltd ("we," "us," or "our") collects, uses, and protects your personal information when you visit our website <a href="http://www.houseofsnses.com" className="underline hover:text-gray-900">www.houseofsnses.com</a> (the "Site") or interact with us through other channels such as email or social media.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mt-4">
            We are committed to protecting your privacy and complying with all applicable data protection laws, including the UK General Data Protection Regulation (UK GDPR), the EU General Data Protection Regulation (EU GDPR), and the Data Protection Act 2018.
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

              {/* Subsections for Section 2 */}
              {section.subsections && (
                <div className="space-y-6">
                  {section.subsections.map((subsection, i) => (
                    <div key={i} className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        {subsection.title}
                      </h3>
                      {subsection.intro && (
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                          {subsection.intro}
                        </p>
                      )}
                      {subsection.bullets && (
                        <ul className="space-y-2">
                          {subsection.bullets.map((bullet, j) => (
                            <li key={j} className="flex items-start text-sm text-gray-700">
                              <span className="mr-3 mt-1">•</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Table for Section 3 */}
              {section.hasTable && (
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border border-gray-200">
                    <thead className="bg-[#e8e4dc]">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 tracking-wider text-xs border-b border-gray-200">
                          PURPOSE
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 tracking-wider text-xs border-b border-gray-200">
                          LEGAL BASIS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataUsageTable.map((row, i) => (
                        <tr key={i} className="border-b border-gray-200">
                          <td className="py-3 px-4 text-gray-700">{row.purpose}</td>
                          <td className="py-3 px-4 text-gray-700">{row.legalBasis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

              {section.additional && (
                <div className="space-y-2 mt-4">
                  {section.additional.map((line, i) => (
                    <p key={i} className="text-sm text-gray-700 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {section.contactInfo && (
                <p className="text-sm text-gray-700 leading-relaxed mt-4">
                  {section.contactInfo.split('snsesgroup@gmail.com')[0]}
                  <a href="mailto:snsesgroup@gmail.com" className="underline hover:text-gray-900">
                    snsesgroup@gmail.com
                  </a>
                </p>
              )}

              {section.complaints && (
                <ul className="space-y-2 mt-4">
                  {section.complaints.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="mr-3 mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="text-sm text-gray-700 leading-relaxed mt-4">
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
              If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us:
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

export default PrivacyPolicy;