import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, Sparkles, MapPin, Send, CheckCircle2, Heart, Award, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export default function CareersModal({ isOpen, onClose, darkMode }: CareersModalProps) {
  const { lang } = useLanguage();
  const isHindi = lang === 'HI';

  const [selectedRole, setSelectedRole] = useState<string>('Senior Biographer / Story Interviewer');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const openPositions = [
    {
      id: 'biographer',
      title: isHindi ? 'वरिष्ठ जीवनी लेखक / मौखिक इतिहासकार' : 'Senior Biographer / Oral Historian',
      type: isHindi ? 'पूर्णकालिक / अनुबंध (रिमोट + ऑन-साइट)' : 'Full-time / Contract (Remote + Field)',
      location: isHindi ? 'अखिल भारतीय (झाँसी, दिल्ली, मुंबई, लखनऊ, बैंगलोर)' : 'All India (Jhansi, Delhi, Mumbai, Lucknow, Bengaluru)',
      desc: isHindi
        ? 'वरिष्ठ नागरिकों और प्रतिष्ठित परिवारों के साथ सहानुभूतिपूर्ण साक्षात्कार आयोजित करना और उनके जीवन के अनुभवों को सुंदर अध्यायों में बदलना।'
        : 'Conduct empathetic in-person & video interviews with family elders, capturing life journeys, values, and turning them into heartfelt prose.'
    },
    {
      id: 'editor',
      title: isHindi ? 'द्विभाषी साहित्यिक संपादक (हिंदी और अंग्रेजी)' : 'Bilingual Literary Editor (Hindi & English)',
      type: isHindi ? 'पूर्णकालिक (रिमोट)' : 'Full-time (Remote)',
      location: isHindi ? 'रिमोट / झाँसी' : 'Remote / Jhansi HQ',
      desc: isHindi
        ? 'कहानियों की संरचना, व्याकरण, भावनात्मक गहराई और पारिवारिक संदर्भ को निखारना ताकि तैयार पुस्तक कालजयी बन सके।'
        : 'Refine storytelling flow, emotional nuance, fact-checking family timelines, and ensuring publication-grade polish in Hindi and English.'
    },
    {
      id: 'designer',
      title: isHindi ? 'बुक लेआउट एवं टाइपोग्राफी डिजाइनर' : 'Book Layout & Typographic Designer',
      type: isHindi ? 'पूर्णकालिक' : 'Full-time',
      location: isHindi ? 'रिमोट / हाइब्रिड' : 'Remote / Hybrid',
      desc: isHindi
        ? 'पुराने फोटो रेस्टोरेशन, हेरिटेज टाइपोग्राफी और प्रीमियम हार्डकवर कॉफी-टेबल बुक लेआउट तैयार करना।'
        : 'Craft archival coffee-table book spreads, historical photo restorations, typography pairing, and bespoke leatherette foil-stamped covers.'
    },
    {
      id: 'audio-producer',
      title: isHindi ? 'ध्वनि एवं ऑडियोबुक निर्माता' : 'Voice Archivist & Audiobook Producer',
      type: isHindi ? 'पार्ट-टाइम / अनुबंध' : 'Part-time / Contract',
      location: isHindi ? 'रिमोट' : 'Remote',
      desc: isHindi
        ? 'बुजुर्गों की रिकॉर्ड की गई आवाज़ों की ध्वनि गुणवत्ता सुधारना, बैकग्राउंड स्कोर जोड़ना और पारिवारिक ऑडियोबुक तैयार करना।'
        : 'Clean and master recorded elder voices, produce bespoke chaptered family audiobooks, and preserve timeless voice heritage.'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Reset form
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantPortfolio('');
      setApplicantNote('');
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0E0514]/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden z-10 ${
            darkMode 
              ? 'bg-[#1E0C22] text-[#F5F0F8] border-[#D4AF37]/30' 
              : 'bg-[#FCFBF9] text-[#190820] border-[#D4AF37]/40'
          }`}
        >
          {/* Header */}
          <div className={`px-6 sm:px-8 py-6 border-b flex items-center justify-between shrink-0 ${
            darkMode ? 'border-white/10 bg-[#16081A]' : 'border-[#E3D4C0] bg-[#F5EFE6]'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-[#D4AF37]/15 text-[#D4AF37]' : 'bg-[#2A0E30]/10 text-[#2A0E30]'}`}>
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs uppercase tracking-widest font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`}>
                    {isHindi ? 'हमारे साथ काम करें' : 'Join Our Mission'}
                  </span>
                  <span className="bg-[#D4AF37] text-[#190F26] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase shadow-sm">
                    {isHindi ? 'भर्ती जारी है' : "We're Hiring"}
                  </span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-serif font-bold ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                  {isHindi ? 'मेमोयर टेल में करियर' : 'Careers at Memoir Tale'}
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
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm sm:text-base leading-relaxed">
            {/* Why Work With Us */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className={`text-xl sm:text-2xl font-serif font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'}`}>
                {isHindi ? 'जीवनों को कालजयी विरासतों में बदलने का हिस्सा बनें' : 'Help Immortalize the Stories that Made Us'}
              </h3>
              <p className={`text-xs sm:text-sm font-medium leading-relaxed ${darkMode ? 'text-[#F5F0F8]/90' : 'text-[#1A0C22]'}`}>
                {isHindi
                  ? 'मेमोयर टेल में हम केवल किताबें नहीं लिखते; हम भारतीय परिवारों के प्यार, संघर्ष, ज्ञान और इतिहास को हमेशा के लिए संजोते हैं।'
                  : "We are India's first dedicated legacy platform. We craft heirloom volumes that preserve generational wisdom for centuries."}
              </p>
            </div>

            {/* Perks Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                darkMode ? 'bg-[#251028] border-white/10' : 'bg-white border-[#E3D4C0] shadow-sm'
              }`}>
                <Heart className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <h4 className={`font-bold text-xs sm:text-sm ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                    {isHindi ? 'अर्थपूर्ण कार्य' : 'Deeply Meaningful Work'}
                  </h4>
                  <p className={`text-[11px] font-medium ${darkMode ? 'text-white/70' : 'text-[#4A3052]'}`}>
                    {isHindi ? 'हजारों परिवारों के दिलों को छूने का अवसर' : 'Impact generations of families'}
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                darkMode ? 'bg-[#251028] border-white/10' : 'bg-white border-[#E3D4C0] shadow-sm'
              }`}>
                <Award className={`w-5 h-5 shrink-0 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                <div>
                  <h4 className={`font-bold text-xs sm:text-sm ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                    {isHindi ? 'प्रतिस्पर्धी वेतन' : 'Top Tier Honorariums'}
                  </h4>
                  <p className={`text-[11px] font-medium ${darkMode ? 'text-white/70' : 'text-[#4A3052]'}`}>
                    {isHindi ? 'सम्मानजनक पारिश्रमिक एवं लचीलापन' : 'Competitive pay & project bonuses'}
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                darkMode ? 'bg-[#251028] border-white/10' : 'bg-white border-[#E3D4C0] shadow-sm'
              }`}>
                <Users className="w-5 h-5 text-purple-600 shrink-0" />
                <div>
                  <h4 className={`font-bold text-xs sm:text-sm ${darkMode ? 'text-white' : 'text-[#190820]'}`}>
                    {isHindi ? 'लचीला और रिमोट' : 'Flexible & Remote'}
                  </h4>
                  <p className={`text-[11px] font-medium ${darkMode ? 'text-white/70' : 'text-[#4A3052]'}`}>
                    {isHindi ? 'अपने समय और गति से काम करें' : 'Work from anywhere in India'}
                  </p>
                </div>
              </div>
            </div>

            {/* Open Positions List */}
            <div className="space-y-4">
              <h3 className={`text-base sm:text-lg font-serif font-bold flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <BookOpen className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? 'वर्तमान में खुली भूमिकाएं (Open Positions):' : 'Explore Open Positions:'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {openPositions.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.title)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      selectedRole === role.title
                        ? darkMode
                          ? 'bg-[#2C1032] border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-lg'
                          : 'bg-[#EFE7DA] border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-md'
                        : darkMode
                        ? 'bg-[#220E24] border-white/10 hover:border-[#D4AF37]/50'
                        : 'bg-white border-[#E3D4C0] hover:border-[#D4AF37]/60 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-bold text-sm sm:text-base ${darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'}`}>
                        {role.title}
                      </h4>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        darkMode ? 'bg-[#D4AF37]/15 text-[#D4AF37]' : 'bg-[#2A0E30]/10 text-[#2A0E30]'
                      }`}>
                        {role.type}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold mb-2 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{role.location}</span>
                    </div>
                    <p className={`text-xs leading-relaxed font-normal ${darkMode ? 'text-white/80' : 'text-[#1A0C22]'}`}>
                      {role.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Application Form */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-[#18081A] border-[#D4AF37]/30' : 'bg-[#F5EFE6] border-[#D4AF37]/40'
            }`}>
              <h4 className={`text-base sm:text-lg font-serif font-bold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-[#D4AF37]' : 'text-[#230C28]'
              }`}>
                <Sparkles className={`w-4 h-4 ${darkMode ? 'text-[#D4AF37]' : 'text-[#8A5500]'}`} />
                {isHindi ? `आवेदन करें: ${selectedRole}` : `Apply for: ${selectedRole}`}
              </h4>

              {submitted ? (
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto animate-bounce" />
                  <h4 className="font-bold text-base text-green-700 dark:text-green-400">
                    {isHindi ? 'आवेदन सफलतापूर्वक प्राप्त हुआ!' : 'Application Successfully Received!'}
                  </h4>
                  <p className="text-xs font-medium opacity-90">
                    {isHindi
                      ? 'धन्यवाद! हमारी संपादकीय टीम आपके पोर्टफोलियो की समीक्षा करेगी और 3-4 कार्य दिवसों में आपसे संपर्क करेगी।'
                      : 'Thank you for reaching out. Our editorial hiring desk will review your profile and reach out within 3–4 business days.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-white/80' : 'text-[#190820]'}`}>
                        {isHindi ? 'पूरा नाम *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                          darkMode ? 'bg-[#220E24] border-white/20 text-white' : 'bg-white border-[#D4AF37]/50 text-[#190820] font-medium'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-white/80' : 'text-[#190820]'}`}>
                        {isHindi ? 'ईमेल पता *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="ananya@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                          darkMode ? 'bg-[#220E24] border-white/20 text-white' : 'bg-white border-[#D4AF37]/50 text-[#190820] font-medium'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-white/80' : 'text-[#190820]'}`}>
                        {isHindi ? 'फ़ोन नंबर (WhatsApp) *' : 'Phone / WhatsApp Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+91 98890 XXXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                          darkMode ? 'bg-[#220E24] border-white/20 text-white' : 'bg-white border-[#D4AF37]/50 text-[#190820] font-medium'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-white/80' : 'text-[#190820]'}`}>
                        {isHindi ? 'पोर्टफोलियो / लिंक्डइन / लेखन लिंक' : 'Portfolio / LinkedIn / Writing Link'}
                      </label>
                      <input
                        type="url"
                        value={applicantPortfolio}
                        onChange={(e) => setApplicantPortfolio(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                          darkMode ? 'bg-[#220E24] border-white/20 text-white' : 'bg-white border-[#D4AF37]/50 text-[#190820] font-medium'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-white/80' : 'text-[#190820]'}`}>
                      {isHindi ? 'अपने अनुभव और रुचि के बारे में संक्षेप में बताएं' : 'Briefly tell us why you wish to join Memoir Tale'}
                    </label>
                    <textarea
                      rows={3}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      placeholder={isHindi ? "अपने लेखन, संपादन या डिजाइन पृष्ठभूमि का संक्षेप में उल्लेख करें..." : "Tell us about your storytelling, journalism, or design background..."}
                      className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none ${
                        darkMode ? 'bg-[#220E24] border-white/20 text-white' : 'bg-white border-[#D4AF37]/50 text-[#190820] font-medium'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className={`text-xs font-medium ${darkMode ? 'text-white/70' : 'text-[#4A3052]'}`}>
                      Or email resume directly to <a href="mailto:careers@memoirtale.com" className="text-[#8A5500] dark:text-[#D4AF37] underline font-bold">careers@memoirtale.com</a>
                    </span>
                    <button
                      type="submit"
                      className={`w-full sm:w-auto px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer ${
                        darkMode 
                          ? 'bg-[#D4AF37] hover:bg-[#C29D29] text-[#1B101E]' 
                          : 'bg-[#2A0E30] hover:bg-[#1E0822] text-white'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'आवेदन जमा करें' : 'Submit Application'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Footer Close */}
          <div className={`px-6 py-4 border-t flex justify-end shrink-0 ${
            darkMode ? 'border-white/10 bg-[#16081A]' : 'border-[#E3D4C0] bg-[#F5EFE6]'
          }`}>
            <button
              onClick={onClose}
              className={`px-7 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                darkMode 
                  ? 'border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1B101E]' 
                  : 'bg-[#2A0E30] hover:bg-[#1E0822] text-white'
              }`}
            >
              {isHindi ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
