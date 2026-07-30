/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WhyMemoirProps {
  darkMode: boolean;
}

export default function WhyMemoirSection({ darkMode }: WhyMemoirProps) {
  const { lang } = useLanguage();
  const isHindi = lang === 'HI';

  const leftPoints = [
    { text: 'Fade with time.' },
    { text: 'Exist only in memory.' },
    { text: 'Family stories become fragmented.' },
    { text: 'Photographs lose their context.' },
    { text: 'Future generations miss the journey behind the moments.' }
  ];

  const leftPointsHi = [
    { text: 'समय के साथ धुंधली हो जाती हैं।' },
    { text: 'केवल यादों में ही बनी रहती हैं।' },
    { text: 'पारिवारिक कहानियाँ बिखर जाती हैं।' },
    { text: 'तस्वीरें अपना संदर्भ खो देती हैं।' },
    { text: 'आने वाली पीढ़ियाँ लम्हों के पीछे की यात्रा से चूक जाती हैं।' }
  ];

  const rightPoints = [
    { text: 'Stories documented for generations.' },
    { text: 'Beautifully crafted into timeless books.' },
    { text: 'Shared across families and future generations.' },
    { text: 'Memories connected with photographs and history.' },
    { text: 'A legacy that continues to inspire long after we\'re gone.' }
  ];

  const rightPointsHi = [
    { text: 'पीढ़ियों के लिए सहेजी गई कहानियाँ।' },
    { text: 'कालजयी पुस्तकों में खूबसूरती से तैयार की गई।' },
    { text: 'परिवारों और आने वाली पीढ़ियों के साथ साझा।' },
    { text: 'तस्वीरों और इतिहास से जुड़ी यादें।' },
    { text: 'एक ऐसी विरासत जो हमारे जाने के लंबे समय बाद भी प्रेरित करती रहती है।' }
  ];

  return (
    <section
      id="difference-section"
      className={`py-20 md:py-28 transition-colors duration-500 overflow-hidden relative ${darkMode ? 'bg-[#1d0e24] text-[#F5F0F8]' : 'bg-[#FAF8F5] text-[#190F26]'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="font-sans text-[11px] font-bold tracking-[3px] uppercase text-[#2E1B5D] dark:text-[#E5C463] block mb-3">
            {isHindi ? 'द मेमोयर टेल अंतर' : 'THE MEMOIR TALE DIFFERENCE'}
          </span>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            {isHindi ? (
              <>यादें धुंधली हो सकती हैं। <br /><span className="font-serif italic text-[#2E1B5D] dark:text-[#E5C463]">विरासत कभी नहीं होनी चाहिए।</span></>
            ) : (
              <>Memories May Fade. <br /><span className="font-serif italic text-[#2E1B5D] dark:text-[#E5C463]">A Legacy Never Should.</span></>
            )}
          </h2>

          <p className={`font-sans text-xs md:text-sm leading-relaxed max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-[#554466]'
            }`}>
            {isHindi ? (
              'समय सब कुछ बदल देता है। चेहरे बूढ़े हो जाते हैं, आवाजें दूर हो जाती हैं और यादें धीरे-धीरे धुंधली हो जाती हैं। लेकिन एक जीवन को परिभाषित करने वाली कहानियाँ केवल स्मरण से अधिक की हकदार हैं — वे संरक्षण की हकदार हैं। मेमोयर टेल में, हम व्यक्तिगत यात्राओं को कालजयी यादों में बदलते हैं।'
            ) : (
              'Time changes everything. Faces grow older, voices become distant, and memories slowly fade. But the stories that define a life deserve more than remembrance—they deserve preservation. At Memoir Tale, we transform personal journeys into timeless keepsakes, ensuring that future generations inherit not just photographs, but the wisdom, values, and experiences behind them.'
            )}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Side: Comparison Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left Card: Memories Left Untold */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-2xl border transition-all duration-300 shadow-sm flex flex-col justify-between ${darkMode
                    ? 'bg-[#251829] border-white/10 hover:border-rose-500/30'
                    : 'bg-white border-[#E3DDE9]/60 hover:border-rose-500/30'
                  }`}
              >
                <div>
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-rose-500/10 text-rose-500">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-4 text-rose-600 dark:text-rose-400">
                    {isHindi ? 'अनकही रह गई यादें' : 'Memories Left Untold'}
                  </h3>
                  <ul className="space-y-3.5">
                    {(isHindi ? leftPointsHi : leftPoints).map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-left">
                        <div className="p-0.5 rounded-full bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5" />
                        </div>
                        <span className={`font-sans text-xs leading-relaxed ${darkMode ? 'text-white/70' : 'text-[#554466]'}`}>
                          {pt.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Right Card: Memoir Tale */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`p-6 rounded-2xl border transition-all duration-300 shadow-lg relative overflow-hidden flex flex-col justify-between ${darkMode
                    ? 'bg-[#2B1638] border-[#A78BFA]/40 hover:border-[#A78BFA]'
                    : 'bg-gradient-to-br from-white via-[#FAF6F0] to-[#FAF6F0] border-[#2E1B5D]/30 hover:border-[#2E1B5D]'
                  }`}
              >
                <div>
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-4 text-[#2E1B5D] dark:text-[#E5C463]">
                    {isHindi ? 'मेमोयर टेल' : 'Memoir Tale'}
                  </h3>
                  <ul className="space-y-3.5">
                    {(isHindi ? rightPointsHi : rightPoints).map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-left">
                        <div className="p-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={`font-sans text-xs font-medium leading-relaxed ${darkMode ? 'text-white/90' : 'text-[#190F26]'}`}>
                          {pt.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Side: Image with Quote Overlay (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden relative shadow-2xl group flex flex-col justify-end border border-white/10"
            >
              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
                alt="Memoir Tale heirloom book"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

              {/* Quote Overlay Container */}
              <div className="relative z-10 p-8 text-left space-y-3">
                <div className="w-10 h-0.5 bg-[#E5C463] mb-2" />
                <p className="font-serif italic text-lg sm:text-xl text-white font-light leading-relaxed">
                  "{isHindi
                    ? 'हम जो सबसे बड़ी विरासत छोड़ सकते हैं वह धन नहीं है — वह वे कहानियाँ हैं जिन्होंने हमें बनाया है।'
                    : 'The greatest inheritance we can leave isn\'t wealth—it\'s the stories that shaped who we are.'
                  }"
                </p>
                <span className="font-sans font-bold text-xs uppercase tracking-[2px] text-[#E5C463] block">
                  — Memoir Tale
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
