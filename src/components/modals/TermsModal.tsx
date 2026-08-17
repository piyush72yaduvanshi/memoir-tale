import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, FileCheck, RefreshCw, Truck, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export default function TermsModal({ isOpen, onClose, darkMode }: TermsModalProps) {
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
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className={`text-xs uppercase tracking-widest font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`}>
                  {isHindi ? 'सेवा की शर्तें' : 'Terms & Conditions'}
                </span>
                <h2 className={`text-xl sm:text-2xl font-serif font-bold ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                  {isHindi ? 'सेवा अनुबंध एवं शर्तें' : 'Terms of Service'}
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
            {/* Section 1: Engagement Scope */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <FileCheck className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? '1. परियोजना का दायरा और प्रक्रिया' : '1. Scope of Legacy Services'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'मेमोयर टेल ग्राहक के साथ साक्षात्कार आयोजित करने, पांडुलिपि का मसौदा तैयार करने, तस्वीरों का जीर्णोद्धार करने और कस्टम हार्डकवर पुस्तकों का मुद्रण करने की एंड-टू-एंड सेवा प्रदान करता है। प्रत्येक चरण में ग्राहक की लिखित/डिजिटल मंजूरी ली जाती है।'
                  : 'Memoir Tale provides end-to-end biographical preservation services, including discovery consultations, oral history interview sessions, manuscript writing, photo curation & restoration, custom typesetting, and heirloom book binding & delivery.'}
              </p>
            </section>

            {/* Section 2: Revisions & Approval */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <RefreshCw className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? '2. संशोधन और अनुमोदन चक्र' : '2. Editorial Revisions & Sign-Off'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'ग्राहकों को पांडुलिपि और लेआउट के विस्तृत पुनरीक्षण के लिए 2 पूर्ण समीक्षा चक्र प्रदान किए जाते हैं। आपकी 100% संतुष्टि और अंतिम डिजिटल अनुमोदन के बाद ही पुस्तक प्रिंटिंग के लिए भेजी जाती है।'
                  : 'Clients receive two comprehensive revision rounds for manuscript text and photobook layout spreads. Physical printing commences only after the client provides final digital sign-off and approval on the full draft.'}
              </p>
            </section>

            {/* Section 3: Intellectual Property */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <Award className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? '3. 100% स्वामित्व एवं कॉपीराइट' : '3. 100% Client Ownership'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'तैयार की गई पुस्तक, पांडुलिपि, व्यक्तिगत कहानियों और पारिवारिक तस्वीरों का पूर्ण बौद्धिक संपदा अधिकार और कॉपीराइट ग्राहक के पास रहता है। मेमोयर टेल ग्राहक की अनुमति के बिना किसी भी सामग्री का विपणन या पुनर्प्रकाशन नहीं करता।'
                  : 'You retain unconditional ownership and copyright over your family narratives, oral history transcripts, and finished books. Memoir Tale operates solely as a commissioned preservation agency.'}
              </p>
            </section>

            {/* Section 4: Production & Delivery */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <Truck className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? '4. निर्माण और सुरक्षित डिलीवरी' : '4. Archival Production & Delivery'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'हमारी सभी पुस्तकें एसिड-फ्री 170+ जीएसएम पेपर और प्रीमियम बाइंडिंग के साथ निर्मित की जाती हैं। डिलीवरी भारत भर में और अंतरराष्ट्रीय स्तर पर ट्रैक किए गए सुरक्षित कूरियर के माध्यम से की जाती है।'
                  : 'All physical volumes are crafted using museum-grade acid-free paper (170+ GSM) with gold foil stamping and durable library bindings. Deliveries are fulfilled worldwide via insured, tracked courier partners.'}
              </p>
            </section>

            {/* Terms Footnote */}
            <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
              darkMode ? 'border-white/10 text-[#C8B8D4]' : 'border-[#E0D0BB] text-[#4A3052] font-semibold'
            }`}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                {isHindi ? 'झाँसी / उत्तर प्रदेश क्षेत्राधिकार के तहत शासित' : 'Governed under laws of Uttar Pradesh & India'}
              </span>
              <span>Effective Date: 2026</span>
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
              {isHindi ? 'स्वीकार करें / बंद करें' : 'Accept / Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
