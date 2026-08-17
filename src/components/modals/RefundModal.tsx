import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CircleDollarSign, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export default function RefundModal({ isOpen, onClose, darkMode }: RefundModalProps) {
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
                <CircleDollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className={`text-xs uppercase tracking-widest font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`}>
                  {isHindi ? 'पारदर्शी गारंटी' : 'Transparent Guarantee'}
                </span>
                <h2 className={`text-xl sm:text-2xl font-serif font-bold ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                  {isHindi ? 'वापसी नीति (Refund & Cancellation Policy)' : 'Refund & Cancellation Policy'}
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
            {/* Guarantee Highlight */}
            <div className={`p-5 rounded-2xl border flex items-start gap-4 ${
              darkMode ? 'bg-[#2B1030] border-[#D4AF37]/30 text-[#E8DCF0]' : 'bg-[#EFE7DA] border-[#D4AF37]/50 text-[#190820]'
            }`}>
              <ShieldCheck className={`w-6 h-6 shrink-0 mt-0.5 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
              <div>
                <h4 className={`font-bold text-sm sm:text-base mb-1 ${darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'}`}>
                  {isHindi ? '100% संतुष्टि और विश्वास गारंटी' : '100% Satisfaction & Milestone Protection'}
                </h4>
                <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${darkMode ? 'text-[#F5F0F8]' : 'text-[#190820]'}`}>
                  {isHindi
                    ? 'हम पारिवारिक विरासत और जीवन गाथाओं को पूरी संवेदनशीलता के साथ तैयार करते हैं। हमारी पारदर्शी माइलस्टोन-आधारित रिफंड नीति यह सुनिश्चित करती है कि आप हर कदम पर पूरी तरह संतुष्ट रहें।'
                    : 'We treat every life story with reverence and care. Our milestone-based cancellation policy ensures complete transparency and fairness at every stage of production.'}
                </p>
              </div>
            </div>

            {/* Stages of Refund */}
            <div className="space-y-4">
              <h3 className={`text-base sm:text-lg font-serif font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'}`}>
                {isHindi ? 'चरणबद्ध रिफंड संरचना:' : 'Milestone-Based Refund Schedule:'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stage 1 */}
                <div className={`p-4 rounded-2xl border ${
                  darkMode ? 'bg-[#251028] border-white/10' : 'bg-white border-[#E3D4C0] shadow-sm'
                }`}>
                  <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isHindi ? 'चरण 1: साक्षात्कार से पहले' : 'Stage 1: Pre-Interview'}</span>
                  </div>
                  <h4 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                    {isHindi ? '100% पूर्ण रिफंड' : '100% Full Refund'}
                  </h4>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-white/80' : 'text-[#1A0C22]'}`}>
                    {isHindi
                      ? 'यदि आप पहला औपचारिक साक्षात्कार शुरू होने से पहले किसी भी समय रद्द करते हैं, तो कोई प्रश्न पूछे बिना 100% शुल्क वापस।'
                      : 'Cancellations requested before the first scheduled recording/interview session receive a 100% refund.'}
                  </p>
                </div>

                {/* Stage 2 */}
                <div className={`p-4 rounded-2xl border ${
                  darkMode ? 'bg-[#251028] border-white/10' : 'bg-white border-[#E3D4C0] shadow-sm'
                }`}>
                  <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-2 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`}>
                    <Clock className="w-4 h-4" />
                    <span>{isHindi ? 'चरण 2: ड्राफ्टिंग के दौरान' : 'Stage 2: Manuscript Phase'}</span>
                  </div>
                  <h4 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                    {isHindi ? '70% आंशिक रिफंड' : '70% Pro-Rated Refund'}
                  </h4>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-white/80' : 'text-[#1A0C22]'}`}>
                    {isHindi
                      ? 'साक्षात्कार पूरा होने के बाद और पहले डिजिटल ड्राफ्ट की समीक्षा तक, लेखक व समय लागत घटाकर 70% रिफंड।'
                      : 'If canceled during chapter drafting, a 70% refund is issued (covering author interview time spent).'}
                  </p>
                </div>

                {/* Stage 3 */}
                <div className={`p-4 rounded-2xl border ${
                  darkMode ? 'bg-[#251028] border-white/10' : 'bg-white border-[#E3D4C0] shadow-sm'
                }`}>
                  <div className="flex items-center gap-2 text-purple-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{isHindi ? 'चरण 3: प्रिंट अनुमोदन के बाद' : 'Stage 3: Printing Phase'}</span>
                  </div>
                  <h4 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                    {isHindi ? 'निःशुल्क पुनर्मुद्रण गारंटी' : 'Free Reprint Guarantee'}
                  </h4>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-white/80' : 'text-[#1A0C22]'}`}>
                    {isHindi
                      ? 'अंतिम प्रिंट अनुमोदन के बाद मुद्रण शुरू होता है। यदि पुस्तक में कोई छपाई त्रुटि है, तो हम तुरंत निःशुल्क पुनः मुद्रित करते हैं।'
                      : 'Once the final draft is approved for print, physical production begins. Any manufacturing defects are reprinted free of charge.'}
                  </p>
                </div>
              </div>
            </div>

            {/* How to claim */}
            <section className="space-y-2">
              <h3 className={`text-base sm:text-lg font-serif font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'}`}>
                {isHindi ? 'रिफंड का दावा कैसे करें' : 'How to Request a Cancellation or Refund'}
              </h3>
              <p className={`font-normal ${darkMode ? 'text-white/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'रिफंड प्रक्रिया शुरू करने के लिए अपने बुकिंग टिकट नंबर के साथ care@memoirtale.com पर ईमेल करें या +91 9889011174 पर कॉल करें। पात्र रिफंड 5-7 कार्य दिवसों के भीतर आपके मूल भुगतान स्रोत पर क्रेडिट कर दिए जाते हैं।'
                  : 'Simply email your booking reference to care@memoirtale.com or call +91 9889011174. Approved refunds are credited back to your original payment method within 5–7 business days.'}
              </p>
            </section>
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
              {isHindi ? 'समझ गया / बंद करें' : 'Got It / Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
