import { useState } from 'react';
import { Phone, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc } from 'firebase/firestore';
import { db, isFirebaseReady } from '../lib/firebase';

export default function FloatingCallbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    callbackTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    // Check if Firebase is ready
    if (!isFirebaseReady()) {
      setErrorMsg('Firebase service is not available. Please try again later.');
      setIsSubmitting(false);
      return;
    }
    
    // Additional null check for db
    if (!db) {
      setErrorMsg('Service is currently unavailable. Please call us directly at 9889011174.');
      setIsSubmitting(false);
      return;
    }

    // Check for duplicate submissions (cooldown period: 1 hour)
    const lastSubmit = localStorage.getItem('mt-callback-ts');
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 3600000) {
      setErrorMsg('You already submitted a callback request. We will call you soon!');
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate ticket number
      const ticketNo = `CB-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Save to Firestore in 'callbacks' collection
      await addDoc(collection(db, 'callbacks'), {
        fullName: formData.name,
        phone: formData.phone,
        callbackTime: formData.callbackTime,
        ticketNo: ticketNo,
        status: 'Pending',
        type: 'Callback Request',
        createdAt: new Date().toISOString(),
        source: 'Floating Callback Button',
      });

      console.log('Callback Request Saved:', { ticketNo, ...formData });
      
      // Store timestamp to prevent duplicate submissions
      localStorage.setItem('mt-callback-ts', Date.now().toString());
      
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setFormData({ name: '', phone: '', callbackTime: '' });
      }, 3000);
    } catch (error) {
      console.error('Failed to save callback request:', error);
      setErrorMsg('Failed to submit request. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 md:bottom-8 right-8 z-50 h-16 px-6 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_8px_32px_rgba(139,92,246,0.4)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.5)] transition-all duration-300 items-center justify-center gap-3 group cursor-pointer ${
          isOpen ? 'hidden' : 'flex'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? {
          y: [0, -10, 0],
        } : {}}
        transition={!isOpen ? {
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        } : {}}
      >
        <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-bold text-sm tracking-wide whitespace-nowrap">BOOK FREE CALL</span>
        
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#A78BFA] opacity-75 animate-ping" />
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#1B101E]/90 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-[#2D1B36] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4 text-white" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-2">
                    Book Free Call
                  </h2>
                  <p className="text-white/60 text-sm">
                    MemoirTale Hub • Heirloom Appraisal Ring
                  </p>
                </div>

                {!isSuccess ? (
                  <>
                    {/* Description */}
                    <p className="text-white/70 text-sm mb-6 text-center leading-relaxed">
                      Enter your contact details: we will prepare custom visual hardcover sizing presets prior to speaking on the phone.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name Field */}
                      <div>
                        <label className="block text-white/80 text-sm font-semibold mb-2">
                          Your Good Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="w-full h-12 px-4 bg-[#3A2447] border border-white/15 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                        />
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label className="block text-white/80 text-sm font-semibold mb-2">
                          Callback Phone Number <span className="text-white">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 98890 11174"
                          pattern="[0-9+\s-]+"
                          className="w-full h-12 px-4 bg-[#3A2447] border border-white/15 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                        />
                        <p className="text-white/40 text-xs mt-1">
                          Call hours operate 09:00 - 18:00 IST • Monday to Saturday
                        </p>
                      </div>

                      {/* Callback Time Field */}
                      <div>
                        <label className="block text-white/80 text-sm font-semibold mb-2">
                          Confirm Callback Slot
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                          <select
                            name="callbackTime"
                            value={formData.callbackTime}
                            onChange={handleChange}
                            required
                            className="w-full h-12 pl-12 pr-4 bg-[#3A2447] border border-white/15 rounded-lg text-white appearance-none focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all cursor-pointer"
                          >
                            <option value="">Select preferred time slot</option>
                            <option value="09:00-11:00">Morning (09:00 - 11:00 IST)</option>
                            <option value="11:00-13:00">Late Morning (11:00 - 13:00 IST)</option>
                            <option value="13:00-15:00">Afternoon (13:00 - 15:00 IST)</option>
                            <option value="15:00-18:00">Evening (15:00 - 18:00 IST)</option>
                          </select>
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Error Message */}
                      {errorMsg && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 text-sm">
                          {errorMsg}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer mt-6 shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Booking...</span>
                          </>
                        ) : (
                          <>
                            <Phone className="h-5 w-5" />
                            <span>Confirm Callback Request</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success Message */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center mx-auto mb-4">
                      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-white font-serif text-xl font-bold mb-2">
                      Callback Scheduled!
                    </h3>
                    <p className="text-white/70 text-sm">
                      We'll call you during your selected time slot.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
