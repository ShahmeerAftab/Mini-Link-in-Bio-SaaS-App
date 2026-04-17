"use client";

import { useState } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "What is Lynkify?",
    answer:
      "Lynkify is a link-in-bio tool that lets you share all your important links from a single, beautiful page. Instead of changing the link in your bio every time you post something new, you update your Lynkify page once — and it's instantly live everywhere.",
  },
  {
    question: "Is Lynkify free to use?",
    answer:
      "Yes! Lynkify has a free plan that includes unlimited links, basic analytics, and a mobile-responsive profile page. You can upgrade to Pro or Business for advanced features like custom domains, remove branding, and team access.",
  },
  {
    question: "Can I sell products or collect payments through Lynkify?",
    answer:
      "With Pro and Business plans, you can add payment links, affiliate links, and product links directly to your Lynkify page. This makes it easy for your audience to buy from you without extra steps.",
  },
  {
    question: "Do I need a website to use Lynkify?",
    answer:
      "No — your Lynkify profile can act as your mini-website. You can share your links, showcase your work, and connect with your audience all from one page. If you already have a website, just add it as one of your links.",
  },
  {
    question: "Where can I use my Lynkify link?",
    answer:
      "Anywhere! Add it to your Instagram, TikTok, Twitter/X, YouTube, email signature, business cards, or anywhere else your audience finds you. You can also share your Lynkify QR code for offline traffic.",
  },
  {
    question: "How do I track how many people click my links?",
    answer:
      "Every link on your Lynkify profile automatically tracks click counts. The dashboard shows you total clicks per link so you can see what your audience engages with most.",
  },
  {
    question: "Is my Lynkify profile secure?",
    answer:
      "Yes. All profiles are served over HTTPS. Your account is protected with hashed passwords and JWT-based authentication. We never share your data with third parties.",
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#800000] py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] text-center mb-10">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#5c0000] rounded-xl px-6 py-7 cursor-pointer transition-all duration-300"
              onClick={() => toggleFAQ(index)}
            >
              {/* Question row */}
              <div className="flex justify-between items-center">
                <h3 className="text-[#ffb6c1] font-medium text-lg">
                  {faq.question}
                </h3>
                <span className="text-[#ffb6c1] text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {/* Answer — only shown when open */}
              {openIndex === index && (
                <p className="text-[#ffd1dc] mt-3 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
