import React, { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { FAQS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";

type CategoryFilter = 'all' | 'process' | 'shipping' | 'privacy';

const FAQS_HI: Record<number, { question: string; answer: string }> = {
  1: {
    question: "साक्षात्कार और यादें एकत्र करने की प्रक्रिया कैसे काम करती है?",
    answer: "हमारी प्रक्रिया कोमल और पूरी तरह से तनाव मुक्त बनाई गई है। प्रारंभिक परामर्श के बाद, हमारे दयालु पेशेवर जीवनी लेखक वर्चुअल या व्यक्तिगत रूप से बातचीत के कई सत्र (आमतौर पर 3 से 6) आयोजित करेंगे।"
  },
  2: {
    question: "हम पुस्तक में कौन सी सामग्री शामिल कर सकते हैं?",
    answer: "आप लगभग कोई भी भौतिक या डिजिटल वस्तु शामिल कर सकते हैं जो अर्थपूर्ण है। इसमें क्लासिक तस्वीरें, हस्तलिखित पत्रों की स्कैन, पारिवारिक व्यंजन, डिप्लोमा और समाचार पत्र की कतरनें शामिल हैं।"
  },
  3: {
    question: "पूरी प्रक्रिया में कितना समय लगता है?",
    answer: "आपके पहले साक्षात्कार कॉल से लेकर भौतिक पुस्तक की डिलीवरी तक आम तौर पर 8-12 सप्ताह लगते हैं।"
  },
  4: {
    question: "क्या आप मेरे शहर से बाहर भी डिलीवर करते हैं?",
    answer: "बिल्कुल! हम पूरे भारत में प्रीमियम, बीमित राष्ट्रव्यापी डिलीवरी प्रदान करते हैं। अनुरोध पर अंतर्राष्ट्रीय शिपिंग की भी व्यवस्था की जा सकती है।"
  },
  5: {
    question: "क्या मैं अपनी पुस्तक की अतिरिक्त प्रतियां ऑर्डर कर सकता हूं?",
    answer: "हां, आप किसी भी समय अपनी संस्मरण पुस्तक की अतिरिक्त प्रतियां ऑर्डर कर सकते हैं, केवल ₹2,999 प्रति प्रति पर।"
  },
  6: {
    question: "क्या मेरी व्यक्तिगत जानकारी गोपनीय रखी जाती है?",
    answer: "बिल्कुल। हम आपकी पारिवारिक यादों को उच्चतम स्तर की गोपनीयता के साथ संभालते हैं। सभी साक्षात्कार एन्क्रिप्शन के साथ सुरक्षित रूप से संग्रहीत किए जाते हैं।"
  }
};

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

  // Map each FAQ depending on selected language
  const localizedFaqs = filteredFaqs.map(faq => {
    if (isHindi && FAQS_HI[faq.id]) {
      return {
        ...faq,
        question: FAQS_HI[faq.id].question,
        answer: FAQS_HI[faq.id].answer
      };
    }
    return faq;
  });

  return (
    <section
      id="faq"
      className="bg-[#faf7f0] py-16 lg:py-24 text-[#190F26] relative overflow-hidden"
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
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-accent-purple-light block mb-3">
            {isHindi ? "आपकी शंकाओं का समाधान" : "YOUR DOUBTS SOLVED"}
          </span>
          
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-primary leading-tight mb-4">
            {isHindi ? "सामान्य विरासत प्रश्न" : "Common Heirloom "}
            <br />
            <span className="font-serif italic text-accent-purple">
              {isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "Questions"}
            </span>
          </h2>
          
          <p className="font-sans text-sm text-text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
            {isHindi 
              ? "लेखन समयसीमा, साक्षात्कार चरणों, गोपनीयता संरक्षण और पुस्तक वितरण के बारे में अक्सर पूछे जाने वाले प्रश्न।"
              : "Frequently asked questions about writing timelines, interview steps, privacy protection, and book deliveries."}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[
            { key: 'all' as CategoryFilter, label: isHindi ? 'सभी' : 'ALL' },
            { key: 'process' as CategoryFilter, label: isHindi ? 'प्रक्रिया' : 'PROCESS' },
            { key: 'shipping' as CategoryFilter, label: isHindi ? 'शिपिंग' : 'SHIPPING' },
            { key: 'privacy' as CategoryFilter, label: isHindi ? 'गोपनीयता' : 'PRIVACY' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setOpenId(null);
              }}
              className={`px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-accent-purple to-accent-purple-dark text-white shadow-lg'
                  : 'bg-white text-primary border border-accent-purple/30 hover:border-accent-purple hover:bg-accent-purple/5'
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
          {localizedFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => toggleFaq(faq.id)}
                className="bg-[#fffcf5] rounded-lg border border-accent-purple/20 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-accent-purple/40"
              >
                <div className="p-5 flex items-start justify-between text-left gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-accent-purple/10 rounded-lg shrink-0">
                      <BookOpen className="h-4 w-4 text-accent-purple" />
                    </div>
                    <span className="font-sans font-semibold text-base text-primary">
                      {faq.question}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`p-1.5 rounded-full bg-accent-purple/10 text-accent-purple transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Collapsible Answer */}
                <div
                  className={`transition-all duration-300 ease-in-out text-left overflow-hidden ${
                    isOpen ? "max-h-96 border-t border-accent-purple/10" : "max-h-0"
                  }`}
                >
                  <div className="p-5 pt-4 text-sm text-[#554466] leading-relaxed font-sans bg-cream/30">
                    <span className="inline-block px-2 py-0.5 bg-accent-purple/10 text-accent-purple-dark text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                      {faq.category === 'process' ? (isHindi ? 'प्रक्रिया' : 'Process') : 
                       faq.category === 'shipping' ? (isHindi ? 'शिपिंग' : 'Shipping') : 
                       faq.category === 'privacy' ? (isHindi ? 'गोपनीयता' : 'Privacy') : 
                       (isHindi ? 'सामान्य' : 'General')}
                    </span>
                    <p className="text-primary">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
