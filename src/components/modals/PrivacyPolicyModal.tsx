import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, Eye, FileText, Database, Trash2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export default function PrivacyPolicyModal({ isOpen, onClose, darkMode }: PrivacyPolicyModalProps) {
  const { lang } = useLanguage();
  const isHindi = lang === 'HI';

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0E0514]/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden z-10 ${
            darkMode 
              ? 'bg-[#1E0C22] text-[#F5F0F8] border-[#D4AF37]/30' 
              : 'bg-[#FCFBF9] text-[#190F26] border-[#D4AF37]/40'
          }`}
        >
          {/* Header */}
          <div className={`px-6 sm:px-8 py-6 border-b flex items-center justify-between shrink-0 ${
            darkMode ? 'border-white/10 bg-[#16081A]' : 'border-[#E3D4C0] bg-[#F5EFE6]'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-[#D4AF37]/15 text-[#D4AF37]' : 'bg-[#2A0E30]/10 text-[#2A0E30]'}`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className={`text-xs uppercase tracking-widest font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`}>
                  {isHindi ? 'कानूनी एवं सुरक्षा' : 'Legal & Confidentiality'}
                </span>
                <h2 className={`text-xl sm:text-2xl font-serif font-bold ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                  {isHindi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/10 text-[#190820]'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm sm:text-base leading-relaxed">
            {/* Intro Notice */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              darkMode ? 'bg-[#2B1030] border-[#D4AF37]/20 text-[#E8DCF0]' : 'bg-[#EFE7DA] border-[#D4AF37]/40 text-[#190820]'
            }`}>
              <Lock className={`w-5 h-5 shrink-0 mt-0.5 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
              <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${darkMode ? 'text-[#F5F0F8]' : 'text-[#190820]'}`}>
                {isHindi
                  ? 'मेमोयर टेल में आपकी पारिवारिक यादें, कहानियाँ, चित्र और ऑडियो रिकॉर्डिंग 100% गोपनीय और सुरक्षित हैं। हम कभी भी आपकी अनुमति के बिना आपकी सामग्री को किसी तीसरे पक्ष को नहीं बेचते या साझा नहीं करते।'
                  : 'At Memoir Tale, your family memories, written stories, photos, and voice recordings are strictly confidential. We never monetize, share, or disclose your private archival assets without your explicit written consent.'}
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <Database className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? '1. हम कौन सी जानकारी एकत्र करते हैं' : '1. Information We Collect'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'हम केवल वही जानकारी एकत्र करते हैं जो आपकी व्यक्तिगत संस्मरण पुस्तक और विरासत संग्रह के निर्माण के लिए आवश्यक है, जिसमें शामिल हैं: संपर्क विवरण (नाम, फ़ोन, ईमेल, पता), ऑडियो/वीडियो साक्षात्कार रिकॉर्डिंग, पारिवारिक तस्वीरें, और ऐतिहासिक दस्तावेज़।'
                  : 'We collect only the information necessary to craft and deliver your bespoke legacy books and digital archives. This includes: contact information (full name, phone, email, delivery address), interview recordings, family photographs, letters, and biographical manuscripts.'}
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <Eye className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? '2. आपकी जानकारी का उपयोग कैसे किया जाता है' : '2. How Your Story is Handled'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'आपकी जानकारी केवल आपकी पुस्तक लिखने, संपादित करने, डिजाइन करने, प्रूफरीडिंग और प्रिंटिंग के लिए अधिकृत समर्पित लेखकों और संपादकों द्वारा संसाधित की जाती है। आपकी स्पष्ट सहमति के बिना कोई भी अंश सार्वजनिक नहीं किया जाता।'
                  : 'Your biographical assets are accessible only to your designated author, editor, and book design coordinator. They are used exclusively for conducting interviews, transcribing, writing chapters, formatting print spreads, and physical book delivery.'}
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <FileText className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? '3. एनडीए और पूर्ण बौद्धिक संपदा अधिकार' : '3. Non-Disclosure Agreements & Copyright'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'आपकी पुस्तक और जीवन की कहानी पर 100% कॉपीराइट और स्वामित्व आपका और आपके परिवार का रहता है। हम अनुरोध पर परियोजना की शुरुआत में कानूनी गैर-प्रकटीकरण अनुबंध (NDA) पर हस्ताक्षर करते हैं।'
                  : 'You retain 100% intellectual property, moral rights, and copyright ownership over your life story, manuscript, and photographs. Memoir Tale signs legally binding Non-Disclosure Agreements (NDAs) upon request before any interviews commence.'}
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <Trash2 className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? '4. डेटा सुरक्षा और स्थायी हटाने का अधिकार' : '4. Data Erasure & Storage Security'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'सभी डिजिटल फाइलें 256-बिट एन्क्रिप्शन वाले सुरक्षित सर्वर पर संग्रहीत की जाती हैं। आपकी भौतिक पुस्तकों की सुरक्षित डिलीवरी के बाद, आप अनुरोध कर सकते हैं कि हम अपने सर्वर से आपके सभी डिजिटल ड्राफ्ट स्थायी रूप से हटा दें।'
                  : 'All raw audio files and image scans are protected with 256-bit SSL encryption. Once your heirloom hardcovers are delivered, you may request permanent deletion of all draft assets from our secure vault at any time.'}
              </p>
            </section>

            {/* Compliance Badge */}
            <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
              darkMode ? 'border-white/10 text-[#C8B8D4]' : 'border-[#E0D0BB] text-[#4A3052] font-semibold'
            }`}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                {isHindi ? 'भारतीय डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP) के अनुरूप' : 'Compliant with Indian DPDP Act & Global Privacy Standards'}
              </span>
              <span>Last updated: February 2026</span>
            </div>
          </div>

          {/* Footer Close */}
          <div className={`px-6 py-4 border-t flex justify-end shrink-0 ${
            darkMode ? 'border-white/10 bg-[#16081A]' : 'border-[#E3D4C0] bg-[#F5EFE6]'
          }`}>
            <button
              onClick={onClose}
              className={`px-7 py-2.5 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer ${
                darkMode 
                  ? 'bg-[#D4AF37] hover:bg-[#C29D29] text-[#1B101E]' 
                  : 'bg-[#2A0E30] hover:bg-[#1E0822] text-white'
              }`}
            >
              {isHindi ? 'समझ गया / बंद करें' : 'I Understand / Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
