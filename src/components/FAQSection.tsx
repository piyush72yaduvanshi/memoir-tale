import React, { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { FAQS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";

type CategoryFilter = 'all' | 'process' | 'pricing' | 'privacy' | 'shipping' | 'ownership' | 'support';

export default function FAQSection() {
  const { lang } = useLanguage();
  const isHindi = lang === "HI";
  const [openId, setOpenId] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  // Filter FAQs based on category
  const filteredFaqs = activeCategory === 'all' 
    ? FAQS 
    : FAQS.filter(faq => faq.category === activeCategory);

  const categoriesList: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: isHindi ? 'सभी' : 'All' },
    { key: 'process', label: isHindi ? 'हमारी प्रक्रिया' : 'Our Process' },
    { key: 'pricing', label: isHindi ? 'मूल्य निर्धारण' : 'Pricing' },
    { key: 'privacy', label: isHindi ? 'गोपनीयता' : 'Privacy' },
    { key: 'shipping', label: isHindi ? 'मुद्रण और डिलीवरी' : 'Printing & Delivery' },
    { key: 'ownership', label: isHindi ? 'स्वामित्व' : 'Ownership' },
    { key: 'support', label: isHindi ? 'सहायता' : 'Support' },
  ];

  return (
    <section
      id="faq"
      className="bg-[#faf7f0] py-16 lg:py-24 text-[#190F26] relative overflow-hidden border-b border-[#E3DDE9]/40"
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none paper-grain" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[rgb(46,27,93)] block mb-3">
            {isHindi ? "आपके सवालों के जवाब ⭐" : "YOUR QUESTIONS, ANSWERED ⭐"}
          </span>
          
          <h2 className="font-serif font-bold text-3xl sm:text-4.5xl lg:text-[48px] text-[#190F26] tracking-tight leading-tight">
            {isHindi ? "अपनी कहानी शुरू करने से पहले प्रश्न?" : "Questions Before You Begin Your Story?"}
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#554466] mt-4 max-w-3xl mx-auto leading-relaxed">
            {isHindi 
              ? "हमने अपनी प्रक्रिया, समय सीमा, गोपनीयता, मूल्य निर्धारण और अपना संस्मरण बनाते समय क्या उम्मीद करनी चाहिए, इस बारे में अक्सर पूछे जाने वाले प्रश्नों के उत्तर दिए हैं।"
              : "We've answered the questions we hear most often about our process, timelines, privacy, pricing, and what to expect when creating your memoir."}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
        >
          {categoriesList.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setOpenId(null);
              }}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#2E1B5D] text-white shadow-[0_4px_20px_rgba(139,92,246,0.25)] scale-105'
                  : 'bg-white text-[#190F26] border border-[#E3DDE9]/60 hover:bg-[#FAF6F0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => toggleFaq(faq.id)}
                className="bg-white rounded-2xl border border-[#E3DDE9]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-[#2E1B5D]/40 text-left"
              >
                <div className="p-5 flex items-start justify-between text-left gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-[#2E1B5D]/10 rounded-lg shrink-0 mt-0.5">
                      <BookOpen className="h-4 w-4 text-[#2E1B5D]" />
                    </div>
                    <span className="font-serif font-bold text-base sm:text-lg text-[#190F26]">
                      {isHindi && faq.questionHi ? faq.questionHi : faq.question}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`p-1.5 rounded-full bg-[#2E1B5D]/10 text-[#2E1B5D] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Collapsible Answer */}
                <div
                  className={`transition-all duration-300 ease-in-out text-left overflow-hidden ${
                    isOpen ? "max-h-96 border-t border-[#E3DDE9]/60" : "max-h-0"
                  }`}
                >
                  <div className="p-5 pt-4 text-sm sm:text-base text-[#554466] leading-relaxed font-sans bg-[#FAF6F0]/50">
                    <p className="text-[#190F26]">{isHindi && faq.answerHi ? faq.answerHi : faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#E3DDE9]">
            <p className="text-[#554466] font-sans text-sm">No questions in this category yet.</p>
          </div>
        )}

      </div>
    </section>
  );
}


