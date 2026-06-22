import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, ShieldCheck, Lock, FileSignature, Trash2, UploadCloud, File, Image as ImageIcon, Video, Music } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType, isFirebaseReady } from "../lib/firebase";
import FadeIn from "./FadeIn";

interface ContactSectionProps {
  selectedService: string;
  matchedWriter?: string | null;
  onClearMatchedWriter?: () => void;
  darkMode: boolean;
}

export default function ContactSection({ selectedService, matchedWriter, onClearMatchedWriter, darkMode }: ContactSectionProps) {
  const { lang, t } = useLanguage();
  const isHindi = lang === "HI";
  
  // Form input states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cityState, setCityState] = useState("");
  const [service, setService] = useState(selectedService || "Life Story Book");
  const [aboutWhom, setAboutWhom] = useState("My Parent");
  const [briefStory, setBriefStory] = useState("");
  const [preferredTime, setPreferredTime] = useState("Anytime");

  // File attachments state managers
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; type: string; size: number; dataUrl: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Status handlers
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Sync selectedService if parent state changes
  React.useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  // Sync matched writer from quiz matcher tool
  React.useEffect(() => {
    if (matchedWriter) {
      const msg = isHindi
        ? `नमस्ते Memoir Tale टीम! मैंने आपके बायोग्राफर मैचमेकर क्विज़ में भाग लिया और मुझे ${matchedWriter} के साथ सबसे बेहतरीन मैच मिला है। मैं आदरणीय माता-पिता की जीवन कथा के लिए उनके साथ एक नि:शुल्क परामर्श सत्र शुरू करना चाहता हूँ।`
        : `Hello Memoir Tale Team! I took your Biographer Matchmaker Quiz and matched perfectly with ${matchedWriter}. I would love to explore starting our bespoke life story book project and have them assigned to interview and write our family chapters!`;
      setBriefStory(msg);
    }
  }, [matchedWriter, isHindi]);

  // Handle local file selections to Base64 with size validation
  const handleFileSelection = (files: FileList | null) => {
    if (!files) return;
    
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100MB total
    
    let totalCurrentSize = attachedFiles.reduce((acc, f) => acc + f.size, 0);
    
    Array.from(files).forEach((file) => {
      // Check individual file size
      if (file.size > MAX_FILE_SIZE) {
        setErrorMsg(`File "${file.name}" exceeds 50MB limit. Please choose a smaller file.`);
        return;
      }
      
      // Check total size
      if (totalCurrentSize + file.size > MAX_TOTAL_SIZE) {
        setErrorMsg('Total attachment size exceeds 100MB. Please remove some files before adding more.');
        return;
      }
      
      totalCurrentSize += file.size;
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            type: file.type,
            size: file.size,
            dataUrl: reader.result as string,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files);
    }
  };

  const removeAttachedFile = (idxToRemove: number) => {
    setAttachedFiles((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    // Check if Firebase is ready
    if (!isFirebaseReady()) {
      setErrorMsg(isHindi ? "Firebase सेवा उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।" : "Firebase service is not available. Please try again later.");
      return;
    }
    
    // Additional null check for db
    if (!db) {
      setErrorMsg(isHindi ? 'सेवा वर्तमान में उपलब्ध नहीं है। कृपया सीधे 9889011174 पर कॉल करें।' : 'Service is currently unavailable. Please call us directly at 9889011174.');
      return;
    }

    // Simple Form Validation
    if (!fullName.trim()) {
      setErrorMsg(isHindi ? "कृपया अपना पूरा नाम दर्ज करें" : "Please enter your full name (Aapka pura naam)");
      return;
    }
    
    // Improved Indian phone validation
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    const indianPhoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
    if (!phone.trim() || !indianPhoneRegex.test(cleanPhone)) {
      setErrorMsg(isHindi ? "कृपया एक मान्य भारतीय मोबाइल नंबर दर्ज करें (+91 XXXXX XXXXX)" : "Please enter a valid Indian mobile number (+91 XXXXX XXXXX)");
      return;
    }
    
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg(isHindi ? "कृपया एक मान्य ईमेल पता दर्ज करें" : "Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    const ticket = "MT-" + Math.floor(100000 + Math.random() * 900000);

    try {
      // 1. Store file metadata only (no backend upload API on Vercel static deployment)
      const uploadedAttachments = attachedFiles.map(f => ({
        name: f.name,
        type: f.type,
        size: f.size,
        note: 'File attached locally — team will request via WhatsApp'
      }));

      // 2. Transmit details and file references securely into Firestore inquires
      const now = new Date().toISOString();
      const dbPayload = {
        fullName,
        phone,
        email,
        cityState,
        service,
        aboutWhom,
        briefStory,
        preferredTime,
        status: "Pending",
        ticketNo: ticket,
        attachments: uploadedAttachments,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(doc(db, "inquiries", ticket), dbPayload);

      // 3. Trigger automatic SMS and Email client notification dispatches
      try {
        await fetch("/api/send-submission-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            phone,
            email,
            ticketNo: ticket,
            service,
          }),
        });
      } catch (notifyErr) {
        console.error("Sub-step automation alert dispatch failed:", notifyErr);
      }

      // 4. Update local user view to display receipt
      setSubmittedData({
        fullName,
        phone,
        email,
        cityState,
        service,
        aboutWhom,
        briefStory,
        preferredTime,
        ticketNo: ticket,
        attachments: uploadedAttachments,
      });

      // Clear standard form inputs
      setFullName("");
      setPhone("");
      setEmail("");
      setCityState("");
      setBriefStory("");
      setAttachedFiles([]);
      
      // Reset form dropdown fields
      setService('Life Story Book');
      setAboutWhom('My Parent');
      setPreferredTime('Anytime');
    } catch (dbErr: any) {
      console.error("Critical submission flow occurred:", dbErr);
      setErrorMsg(isHindi ? "जमा करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।" : "Database submission failed. Please try again.");
      handleFirestoreError(dbErr, OperationType.WRITE, `inquiries/${ticket}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-16 lg:py-24 overflow-hidden ${
        darkMode 
          ? 'bg-[#1f1030] text-[#F5F0F8] border-b border-white/10' 
          : 'bg-gradient-to-b from-[#FAF6F0] via-[#FCFBF7] to-[#FAF8F5] text-[#190F26] border-b border-[#E3DDE9]/40'
      }`}
    >
      {/* Decorative Blur Ellipse per guidelines */}
      <div className="absolute bottom-[5%] right-[-120px] w-[500px] h-[500px] bg-[#8B5CF6]/4 rounded-full blurred-ellipse pointer-events-none" />
      <div className="absolute top-[10%] left-[-100px] w-[400px] h-[400px] bg-[#8B3CDC]/4 rounded-full blurred-ellipse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* SUB-SECTION A: Bold Stats Row with FadeIn */}
        <FadeIn>
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl p-6 lg:p-8 mb-20 text-center relative z-10 shadow-[0_8px_30px_rgba(69,20,122,0.04)] ${
            darkMode 
              ? 'bg-[#2D1B36] border border-white/10'
              : 'bg-white border border-[#E3DDE9]/60'
          }`}>
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center p-3">
              <div className={`p-2.5 rounded-full text-[#8B5CF6] mb-3 border ${
                darkMode ? 'bg-[#3A2447] border-white/10' : 'bg-[#FAF6F0] border-[#E3DDE9]'
              }`}>
                <Phone className="h-5 w-5" />
              </div>
              <span className={`font-serif font-bold text-lg sm:text-xl lg:text-[22px] ${
                darkMode ? 'text-white' : 'text-[#190F26]'
              }`}>
                9889011174
              </span>
              <span className="font-sans font-semibold text-[11px] sm:text-xs text-[#8B5CF6] uppercase tracking-wider mt-1">
                {isHindi ? "कभी भी कॉल करें" : "Call Us Anytime"}
              </span>
            </div>

            {/* Stat 2 */}
            <div className={`flex flex-col items-center justify-center p-3 border-l lg:border-l ${
              darkMode ? 'border-white/10' : 'border-[#E3DDE9]'
            }`}>
              <div className={`p-2.5 rounded-full text-[#8B5CF6] mb-3 border ${
                darkMode ? 'bg-[#3A2447] border-white/10' : 'bg-[#FAF6F0] border-[#E3DDE9]'
              }`}>
                <Mail className="h-5 w-5" />
              </div>
              <span className="font-serif font-bold text-sm sm:text-base lg:text-[18px] text-[#190F26] truncate max-w-full">
                support@memoirtale.com
              </span>
              <span className="font-sans font-semibold text-[11px] sm:text-xs text-[#8B5CF6] uppercase tracking-wider mt-1">
                {isHindi ? "हमें ईमेल करें" : "Email Us"}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center p-3 border-l border-[#E3DDE9] lg:border-l">
              <div className="bg-[#FAF6F0] p-2.5 rounded-full text-[#8B5CF6] mb-3 border border-[#E3DDE9]">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="font-serif font-bold text-lg sm:text-xl lg:text-[21px] text-[#190F26]">
                {isHindi ? "झाँसी, उत्तर प्रदेश" : "Jhansi, UP"}
              </span>
              <span className="font-sans font-semibold text-[11px] sm:text-xs text-[#8B5CF6] uppercase tracking-wider mt-1">
                {isHindi ? "हमारा केंद्र" : "Our Base"}
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center p-3 border-l border-[#E3DDE9] lg:border-l">
              <div className="bg-[#FAF6F0] p-2.5 rounded-full text-[#8B5CF6] mb-3 border border-[#E3DDE9]">
                <Clock className="h-5 w-5 animate-pulse" />
              </div>
              <span className="font-serif font-bold text-lg sm:text-xl lg:text-[22px] text-[#190F26]">
                {isHindi ? "तत्काल संपर्क" : "24 Hours"}
              </span>
              <span className="font-sans font-semibold text-[11px] sm:text-xs text-[#8B5CF6] uppercase tracking-wider mt-1">
                {isHindi ? "प्रतिक्रिया समय" : "Response Time"}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* SUB-SECTION B: Section Heading with FadeIn */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-[60px] h-[3px] bg-[#8B5CF6] rounded-[2px] mb-4" />
            <span className="font-sans font-semibold text-[12px] uppercase tracking-[3px] text-[#8B5CF6] mb-3">
              {isHindi ? "निःशुल्क परामर्श" : "GET IN TOUCH"}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[52px] text-[#190F26] leading-tight">
              {isHindi ? "अपनी गौरवशाली कहानी आज ही शुरू करें" : "Start Your Story Today"}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#554466] mt-4 max-w-2xl leading-relaxed">
              {isHindi ? "नीचे अपना विवरण दर्ज करें, और हमारे साहित्य समन्वयक 24 घंटे के भीतर फोन और व्हाट्सएप के माध्यम से आपसे संपर्क करेंगे।" : "Fill in your preferred details below, and our literary coordinators will reach out within 24 hours via phone, SMS, and WhatsApp."}
            </p>
          </div>
        </FadeIn>

        {/* SUB-SECTION C: Glassmorphic Inquiry Form with FadeIn */}
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="bg-white border border-[#E3DDE9]/60 rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-[0_12px_44px_rgba(69,20,122,0.05)] text-[#190F26]">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Error Box */}
                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-800 text-sm px-4 py-3 rounded-lg text-left font-sans font-semibold">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Row 1: 2 columns equal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col text-left space-y-1.5">
                    <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1px]">
                      {isHindi ? "पूरा नाम" : "Full Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isHindi ? "यहाँ अपना पूरा नाम लिखें" : "Aapka pura naam"}
                      className="w-full bg-[#FAF8F5] border border-[#E3DDE9] rounded-xl h-[52px] px-4 text-[#190F26] placeholder-[#554466]/40 font-sans text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="flex flex-col text-left space-y-1.5">
                    <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1px]">
                      {isHindi ? "फ़ोन नंबर (WhatsApp)" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-[#FAF8F5] border border-[#E3DDE9] rounded-xl h-[52px] px-4 text-[#190F26] placeholder-[#554466]/40 font-sans text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: 2 columns equal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col text-left space-y-1.5">
                    <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1px]">
                      {isHindi ? "ईमेल पता" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aapka@email.com"
                      className="w-full bg-[#FAF8F5] border border-[#E3DDE9] rounded-xl h-[52px] px-4 text-[#190F26] placeholder-[#554466]/40 font-sans text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="flex flex-col text-left space-y-1.5">
                    <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1px]">
                      {isHindi ? "शहर / राज्य" : "City / State"}
                    </label>
                    <input
                      type="text"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      placeholder={isHindi ? "जैसे: झाँसी, उत्तर प्रदेश" : "Jaise: Gorakhpur, UP"}
                      className="w-full bg-[#FAF8F5] border border-[#E3DDE9] rounded-xl h-[52px] px-4 text-[#190F26] placeholder-[#554466]/40 font-sans text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Which Service Are You Interested In? */}
                <div className="flex flex-col text-left space-y-1.5">
                  <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1px]">
                    {isHindi ? "आप किस बायोग्राफी सेवा में रुचि रखते हैं?" : "Which Memoir Service Are You Interested In?"}
                  </label>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E3DDE9] rounded-xl h-[52px] px-4 text-[#190F26] font-sans text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Life Story Book" className="text-[#190F26]">
                        {isHindi ? "जीवन कहानी पुस्तक (शुरुआत ₹24,999)" : "Life Story Book (Starting ₹24,999)"}
                      </option>
                      <option value="Obituaries / Tribute Book" className="text-[#190F26]">
                        {isHindi ? "श्रद्धांजलि व संस्मरण ग्रंथ (शुरुआत ₹14,999)" : "Obituaries & Tribute Book (Starting ₹14,999)"}
                      </option>
                      <option value="Anniversary Book" className="text-[#190F26]">
                        {isHindi ? "वर्षगांठ / उत्सव पुस्तक (शुरुआत ₹18,999)" : "Anniversary / Celebration Book (Starting ₹18,999)"}
                      </option>
                      <option value="Animated Short Film" className="text-[#190F26]">
                        {isHindi ? "एनिमेटेड लघु चित्र (हेरिटेज श्रेणी)" : "Animated Short Films (Heritage Tier)"}
                      </option>
                      <option value="Audiobook" className="text-[#190F26]">
                        {isHindi ? "ऑडियोबुक संस्करण" : "Bespoke Audiobooks"}
                      </option>
                      <option value="Family Tree" className="text-[#190F26]">
                        {isHindi ? "वंश-वृक्ष और वंशावली मानचित्र" : "Full Genealogy Family Tree Mapping"}
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5CF6] pointer-events-none text-xs">▼</div>
                  </div>
                </div>

                {/* Row 4: About Whom Is This Book? */}
                <div className="flex flex-col text-[11px] text-left space-y-1.5">
                  <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1px]">
                    {isHindi ? "यह पुस्तक किसके बारे में लिखी जानी है?" : "About Whom Is This Book?"}
                  </label>
                  <div className="relative">
                    <select
                      value={aboutWhom}
                      onChange={(e) => setAboutWhom(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E3DDE9] rounded-xl h-[52px] px-4 text-[#190F26] font-sans text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Myself">{isHindi ? "मेरे अपने बारे में (अपनी कहानी)" : "About Myself (Apni Kahani)"}</option>
                      <option value="My Parent">{isHindi ? "मेरे माता / पिता के लिए" : "My Parent (Mata / Pita Ke Liye)"}</option>
                      <option value="My Grandparent">{isHindi ? "मेरे दादा-दादी / नाना-नानी के लिए" : "My Grandparent (Dada / Dadi Ke Liye)"}</option>
                      <option value="My Spouse">{isHindi ? "मेरे जीवनसाथी / पार्टनर के लिए" : "My Spouse / Partner"}</option>
                      <option value="My Child">{isHindi ? "मेरे बच्चों के लिए" : "My Child"}</option>
                      <option value="Other Family Member">{isHindi ? "परिवार के अन्य आदरणीय सदस्य के लिए" : "Other Respected Family Member"}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5CF6] pointer-events-none text-xs">▼</div>
                  </div>
                </div>

                {/* Row 5: Your Story */}
                <div className="flex flex-col text-left space-y-1.5">
                  <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1px]">
                    {isHindi ? "संक्षिप्त रूपरेखा / जिन कहानियों व यादों को आप संजोना चाहते हैं" : "Brief Outline / Stories to Preserve"}
                  </label>
                  <textarea
                    value={briefStory}
                    onChange={(e) => setBriefStory(e.target.value)}
                    placeholder={isHindi ? "अपनी कहानी के बारे में संक्षेप में बताएं — वे कौन से मुख्य मील के पत्थर, उपलब्धियां या जीवन मूल्य हैं जिन्हें आप हमेशा के लिए सुरक्षित रखना चाहते हैं?" : "Aapki kahani ke baare mein thoda bataiye — key milestones, achievements, or values you wish to preserve forever?"}
                    className="w-full bg-[#FAF8F5] border border-[#E3DDE9] rounded-xl h-24 p-4 text-[#190F26] placeholder-[#554466]/40 font-sans text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Row 6: Preferred Contact Time */}
                <div className="flex flex-col text-[11px] text-left space-y-1.5">
                  <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1px]">
                    {isHindi ? "बातचीत के लिए आपका पसंदीदा समय" : "Preferred Contact Time"}
                  </label>
                  <div className="relative">
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E3DDE9] rounded-xl h-[52px] px-4 text-[#190F26] font-sans text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Morning (9am–12pm)">{isHindi ? "सुबह का समय (9 am – 12 pm)" : "Morning Slots (9 am – 12 pm)"}</option>
                      <option value="Afternoon (12pm–4pm)">{isHindi ? "दोपहर का समय (12 pm – 4 pm)" : "Afternoon Slots (12 pm – 4 pm)"}</option>
                      <option value="Evening (4pm–8pm)">{isHindi ? "शाम का समय (4 pm – 8 pm)" : "Evening Slots (4 pm – 8 pm)"}</option>
                      <option value="Anytime">{isHindi ? "कभी भी (पूरे दिन में किसी भी समय)" : "Anytime (Pure Din Mein Kabhi Bhi)"}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5CF6] pointer-events-none text-xs">▼</div>
                  </div>
                </div>

                {/* PREMIUM DRAG & DROP FILE VAULT MODULE (Images, Videos, Audio, etc) */}
                <div className="flex flex-col text-left space-y-2">
                  <label className="font-sans font-semibold text-[11px] text-[#8B5CF6] uppercase tracking-[1.5px] flex items-center justify-between">
                    <span>{isHindi ? "फ़ाइलें / तस्वीरें / ऑडियो / वीडियो संलग्न करें (वैकल्पिक)" : "Attach Media & Timelines (Optional)"}</span>
                    <span className="text-[10px] text-slate-500 font-mono lower-case">Max 50MB</span>
                  </label>

                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 relative ${
                      dragActive
                        ? "border-[#8B5CF6] bg-[#8B5CF6]/5 scale-[1.01]"
                        : "border-[#E3DDE9] bg-[#FAF8F5] hover:border-[#8B5CF6]/50 hover:bg-[#FAF6F0]"
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileSelection(e.target.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-white border border-[#E3DDE9] rounded-full text-[#8B5CF6] shadow-sm">
                        <UploadCloud className="h-6 w-6 animate-bounce" />
                      </div>
                      <p className="font-sans text-sm text-[#190F26] font-semibold">
                        {isHindi ? "यहाँ फ़ाइलें खींचें या ब्राउज़ करने के लिए क्लिक करें" : "Drag files here or click to browse family vault"}
                      </p>
                      <p className="font-sans text-[11px] text-slate-500">
                        Supports: Images, Videos, Audio transcripts, Word & PDF memoirs
                      </p>
                    </div>
                  </div>

                  {/* Attachment Previews */}
                  <AnimatePresence>
                    {attachedFiles.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 pt-2"
                      >
                        <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                          Selected Assets ({attachedFiles.length})
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {attachedFiles.map((file, idx) => {
                            const isImg = file.type.startsWith("image/");
                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center justify-between p-3 bg-white border border-[#E3DDE9]/60 rounded-xl shadow-sm text-[#190F26]"
                              >
                                <div className="flex items-center space-x-3 overflow-hidden">
                                  {isImg ? (
                                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E3DDE9] shrink-0">
                                      <img src={file.dataUrl} className="w-full h-full object-cover" />
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E3DDE9] flex items-center justify-center text-[#8B5CF6] shrink-0">
                                      {file.type.startsWith("audio/") ? (
                                        <Music className="h-5 w-5" />
                                      ) : file.type.startsWith("video/") ? (
                                        <Video className="h-5 w-5" />
                                      ) : (
                                        <File className="h-5 w-5" />
                                      )}
                                    </div>
                                  )}
                                  <div className="text-left overflow-hidden">
                                    <p className="font-sans text-xs font-semibold text-[#190F26] truncate max-w-[150px]">
                                      {file.name}
                                    </p>
                                    <p className="font-mono text-[9px] text-[#8B5CF6]">
                                      {(file.size / 1024).toFixed(0)} KB
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeAttachedFile(idx)}
                                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Trigger Card */}
                <div className="pt-6 flex flex-col items-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(139, 92, 246,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-full sm:w-fit min-w-[320px] h-[60px] rounded-full bg-[#8B5CF6] text-white font-sans font-bold text-base hover:bg-[#8B5CF6] transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-t-transparent border-[#17063F] rounded-full animate-spin" />
                    ) : (
                      <span>{isHindi ? "विवरण जमा करें और नि:शुल्क परामर्श प्राप्त करें" : "Submit & Get My Free Quote"}</span>
                    )}
                  </motion.button>

                  {/* Dedicated Security & Data Protection Assurance Block */}
                  <div className="w-full mt-8 pt-8 border-t border-[#E3DDE9]/70">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <Lock className="h-4.5 w-4.5 text-[#8B5CF6]" />
                      <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#190F26]">
                        {isHindi ? "डेटा सुरक्षा और अत्यधिक गोपनीयता गारंटी" : "Story Vault — Privacy & Protection Guaranteed"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
                      {/* Badge 1: 100% Confidentiality */}
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02, borderColor: "rgba(139, 92, 246,0.5)", boxShadow: "0 8px 24px rgba(69,20,122,0.04)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-[#FAF8F5] border border-[#E3DDE9]/50 rounded-xl p-4 flex flex-col space-y-2 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-2 text-[#8B5CF6]">
                          <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
                          <h4 className="font-sans font-bold text-xs text-[#190F26] tracking-tight">
                            {isHindi ? "100% पूर्ण गोपनीयता" : "100% Confidential"}
                          </h4>
                        </div>
                        <p className="font-sans text-[11px] text-[#554466] leading-relaxed">
                          {isHindi 
                            ? "आपकी यादें और तस्वीरें बिल्कुल सुरक्षित हैं। आपकी स्पष्ट सहमति के बिना कुछ भी प्रकाशित नहीं किया जाता।" 
                            : "Your deeply personal family stories, text drafts, and photobook files are kept in highly secured, private servers."}
                        </p>
                      </motion.div>

                      {/* Badge 2: NDA Guarantee */}
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02, borderColor: "rgba(139, 92, 246,0.5)", boxShadow: "0 8px 24px rgba(69,20,122,0.04)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-[#FAF8F5] border border-[#E3DDE9]/50 rounded-xl p-4 flex flex-col space-y-2 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-2 text-[#8B5CF6]">
                          <FileSignature className="h-4.5 w-4.5 shrink-0" />
                          <h4 className="font-sans font-bold text-xs text-[#190F26] tracking-tight">
                            {isHindi ? "गैर-प्रकटीकरण अनुबंध (NDA)" : "Family NDAs Available"}
                          </h4>
                        </div>
                        <p className="font-sans text-[11px] text-[#554466] leading-relaxed">
                          {isHindi 
                            ? "हम पूर्ण कानूनी सुरक्षा अनुबंध प्रदान करते हैं ताकि सुनिश्चित हो सके कि आपकी धरोहर परिवार तक ही रहे।" 
                            : "We provide legally robust Non-Disclosure Agreements on request to guarantee that manuscripts never leave your close network."}
                        </p>
                      </motion.div>

                      {/* Badge 3: Data Erasure */}
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02, borderColor: "rgba(139, 92, 246,0.5)", boxShadow: "0 8px 24px rgba(69,20,122,0.04)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-[#FAF8F5] border border-[#E3DDE9]/50 rounded-xl p-4 flex flex-col space-y-2 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-2 text-[#8B5CF6]">
                          <Trash2 className="h-4.5 w-4.5 shrink-0" />
                          <h4 className="font-sans font-bold text-xs text-[#190F26] tracking-tight">
                            {isHindi ? "डेटा हटाने का अधिकार" : "Data Erasure Guarantee"}
                          </h4>
                        </div>
                        <p className="font-sans text-[11px] text-[#554466] leading-relaxed">
                          {isHindi 
                            ? "पुस्तक की सुरक्षित डिलीवरी के बाद, आप हमारे सर्वर से अपने सभी डिजिटल ड्राफ्ट स्थायी रूप से हटा सकते हैं।" 
                            : "Complete control of your archive. Upon book completion and physical delivery, request to permanently purge all digital drafts."}
                        </p>
                      </motion.div>
                    </div>

                    {/* Symmetrical Footnote Trust Statements */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#554466]/70 border-t border-[#E3DDE9]/35 pt-4">
                      <span className="flex items-center text-center sm:text-left">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 shrink-0" />
                        {isHindi ? "हम 24 घंटे के भीतर आपसे व्हाट्सएप और फोन से संपर्क करेंगे।" : "Direct contact — zero third-party leakage."}
                      </span>
                      <span className="flex items-center text-center sm:text-right">
                        <Lock className="h-3 w-3 mr-1.5 text-green-600 shrink-0" />
                        {isHindi ? "SSL-एन्क्रिप्टेड सुरक्षित संचार" : "Transmissions secured by HTTPS / 256-bit SSL encryption."}
                      </span>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </FadeIn>

        {/* Dynamic inquiry success receipt dialog overlay */}
        <AnimatePresence>
          {submittedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#190F26]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 text-[#190F26]"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white border-2 border-[#8B5CF6] rounded-[28px] max-w-lg w-full p-8 shadow-[0_12px_50px_rgba(139, 92, 246,0.25)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E1D3F0]/10 rounded-full blurred-ellipse" />
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-16 w-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <CheckCircle2 className="h-10 w-10 fill-current animate-bounce" />
                  </div>
                  
                  <span className="text-xs uppercase tracking-widest text-[#8B5CF6] font-bold bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#E3DDE9]">
                    {isHindi ? "बुकिंग टिकट:" : "REF TICKET:"} {submittedData.ticketNo}
                  </span>

                  <h3 className="font-serif font-bold text-2xl text-[#190F26]">
                    {isHindi ? "पूछताछ सफलतापूर्वक दर्ज की गई!" : "Inquiry Successfully Registered!"}
                  </h3>

                  <p className="font-sans text-sm text-[#554466] leading-relaxed">
                    {isHindi ? (
                      <>
                        बधाई हो! धन्यवाद, <strong>{submittedData.fullName}</strong>। हमने <strong>{submittedData.aboutWhom === "My Parent" ? "माता-पिता" : submittedData.aboutWhom}</strong> के सम्मान में बनाई जाने वाली विशेष <strong>{submittedData.service}</strong> के लिए आपकी पूछताछ दर्ज कर ली है।
                      </>
                    ) : (
                      <>
                        Badhai Ho! Thank you, <strong>{submittedData.fullName}</strong>. We have registered your professional inquiry for creating a bespoke <strong>{submittedData.service}</strong> honoring <strong>{submittedData.aboutWhom}</strong>.
                      </>
                    )}
                  </p>

                  {/* Details summary */}
                  <div className="w-full bg-[#FAF8F5] border border-[#E3DDE9] p-5 rounded-xl font-sans text-xs text-left space-y-2 mt-4 text-[#190F26]">
                    <div className="flex justify-between border-b border-[#E3DDE9] pb-1.5">
                      <span className="text-[#554466]/70">{isHindi ? "प्राथमिक संपर्क नंबर:" : "Primary Contact No:"}</span>
                      <span className="text-[#190F26] font-mono font-bold">{submittedData.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E3DDE9] pb-1.5">
                      <span className="text-[#554466]/70">{isHindi ? "दर्ज ईमेल:" : "Registered Email:"}</span>
                      <span className="text-[#190F26] font-semibold">{submittedData.email}</span>
                    </div>
                    {submittedData.cityState && (
                      <div className="flex justify-between border-b border-[#E3DDE9] pb-1.5">
                        <span className="text-[#554466]/70">{isHindi ? "स्थान/शहर:" : "Location:"}</span>
                        <span className="text-[#190F26] font-semibold">{submittedData.cityState}</span>
                      </div>
                    )}
                    <div className="flex justify-between pb-0.5">
                      <span className="text-[#554466]/70">{isHindi ? "पसंदीदा कॉल स्लॉट:" : "Preferred Call Slot:"}</span>
                      <span className="text-[#8B5CF6] font-bold">{submittedData.preferredTime}</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#554466]/70">
                    {isHindi ? "हमारे पेशेवर संस्मरण लेखक कहानी साक्षात्कार चरण शुरू करने के लिए शीघ्र ही सीधे फोन कॉल और एसएमएस के माध्यम से आपसे संपर्क करेंगे।" : "Our professional biographer will contact you via direct phone call & SMS shortly to start your story interview phase."}
                  </p>

                  <motion.button
                    onClick={() => setSubmittedData(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-12 bg-[#8B5CF6] text-white font-sans font-bold text-sm rounded-full hover:bg-[#8B5CF6] transition-all cursor-pointer mt-4 shadow"
                  >
                    {isHindi ? "बहुत बढ़िया, बंद करें" : "Awesome, Close Receipt"}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
