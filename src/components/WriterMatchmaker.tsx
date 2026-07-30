import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Check, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WriterMatchmakerProps {
  onMatchWriter?: (writerName: string) => void;
}

export default function WriterMatchmaker({ onMatchWriter }: WriterMatchmakerProps) {
  const { lang } = useLanguage();
  const isHindi = lang === 'HI';

  const [step, setStep] = useState(1);
  const [whatPreserve, setWhatPreserve] = useState('');
  const [whoAbout, setWhoAbout] = useState('');
  const [howPreserve, setHowPreserve] = useState('');
  const [storyDetails, setStoryDetails] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const step1Options = isHindi
    ? [
      'मेरी जीवन कहानी',
      'माता-पिता की विरासत',
      'दादा-दादी की यात्रा',
      'पारिवारिक इतिहास',
      'यात्रा के अनुभव',
      'व्यावसायिक यात्रा',
      'प्रेम कहानी',
      'प्रियजन को श्रद्धांजलि',
      'कॉर्पोरेट विरासत',
      'कुछ और'
    ]
    : [
      'My Life Story',
      "A Parent's Legacy",
      "A Grandparent's Journey",
      'Family History',
      'Travel Experiences',
      'Business Journey',
      'Love Story',
      'Tribute to a Loved One',
      'Corporate Legacy',
      'Something Else'
    ];

  const step2Options = isHindi
    ? [
      'स्वयं',
      'माता जी',
      'पिता जी',
      'दादा-दादी / नाना-नानी',
      'दंपति',
      'परिवार',
      'संस्थापक',
      'संगठन',
      'कोई खास व्यक्ति'
    ]
    : [
      'Myself',
      'Mother',
      'Father',
      'Grandparent',
      'Couple',
      'Family',
      'Founder',
      'Organization',
      'Someone Special'
    ];

  const step3Options = isHindi
    ? [
      'प्रीमियम संस्मरण',
      'कॉफी टेबल बुक',
      'यात्रा पत्रिका',
      'जीवनी',
      'विरासत पुस्तक',
      'डॉक्यूमेंट्री फिल्म',
      'डिजिटल आर्काइव'
    ]
    : [
      'Premium Memoir',
      'Coffee Table Book',
      'Travel Journal',
      'Biography',
      'Legacy Book',
      'Documentary Film',
      'Digital Archive'
    ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
      if (onMatchWriter) {
        onMatchWriter(`${whatPreserve} for ${whoAbout}`);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setStep(1);
    setWhatPreserve('');
    setWhoAbout('');
    setHowPreserve('');
    setStoryDetails('');
    setIsCompleted(false);
  };

  const handleConsultationClick = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="discover-story-quiz" className="bg-[#220E24] py-16 lg:py-24 text-white relative overflow-hidden">
      {/* Background Decorative Ellipses */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#8B3CDC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C463]" />
            <span className="text-[#E5C463] text-xs font-bold uppercase tracking-[2px]">
              {isHindi ? 'अपनी कहानी खोजें' : 'DISCOVER YOUR STORY'}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isHindi ? 'आइए आपकी विरासत की शुरुआत करें' : "Let's Begin Your Legacy"}
          </h2>

          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isHindi
              ? 'आपकी कहानी को समझने में हमारी सहायता के लिए कुछ सरल प्रश्नों के उत्तर दें। हम सर्वोत्तम दृष्टिकोण की अनुशंसा करेंगे और आपकी यात्रा को जीवंत बनाने के लिए सही टीम को इकट्ठा करेंगे।'
              : "Answer a few simple questions to help us understand your story. We'll recommend the best approach and assemble the right team to bring your journey to life."}
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-gradient-to-b from-[#2B1638] via-[#200E2C] to-[#170820] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative">

          {!isCompleted ? (
            <>
              {/* Progress Bar & Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider text-white/60 mb-3">
                  <span>{isHindi ? `प्रगति: चरण ${step} / 4` : `Step ${step} of 4`}</span>
                  <span className="text-[#E5C463]">{Math.round((step / 4) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E5C463] to-[#8B3CDC] transition-all duration-500 rounded-full"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: What would you like to preserve? */}
              {step === 1 && (
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-6">
                    {isHindi ? 'आप क्या सहेजना चाहेंगे?' : 'What would you like to preserve?'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {step1Options.map((opt) => {
                      const isSelected = whatPreserve === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setWhatPreserve(opt)}
                          className={`p-4 rounded-xl border text-left font-sans text-sm font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${isSelected
                              ? 'bg-gradient-to-r from-[#2E1B5D] to-[#45147A] border-[#E5C463] text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30'
                            }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#E5C463]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Who is this story about? */}
              {step === 2 && (
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-6">
                    {isHindi ? 'यह कहानी किसके बारे में है?' : 'Who is this story about?'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {step2Options.map((opt) => {
                      const isSelected = whoAbout === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setWhoAbout(opt)}
                          className={`p-4 rounded-xl border text-left font-sans text-sm font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${isSelected
                              ? 'bg-gradient-to-r from-[#2E1B5D] to-[#45147A] border-[#E5C463] text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30'
                            }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#E5C463]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: How would you like to preserve it? */}
              {step === 3 && (
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-6">
                    {isHindi ? 'आप इसे कैसे सहेजना चाहेंगे?' : 'How would you like to preserve it?'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {step3Options.map((opt) => {
                      const isSelected = howPreserve === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setHowPreserve(opt)}
                          className={`p-4 rounded-xl border text-left font-sans text-sm font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${isSelected
                              ? 'bg-gradient-to-r from-[#2E1B5D] to-[#45147A] border-[#E5C463] text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30'
                            }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#E5C463]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Tell us a little about your story */}
              {step === 4 && (
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-3">
                    {isHindi ? 'हमें अपनी कहानी के बारे में थोड़ा बताएं।' : 'Tell us a little about your story.'}
                  </h3>
                  <p className="text-white/60 text-xs font-sans mb-6">
                    {isHindi
                      ? 'कोई विशेष मील के पत्थर, विचार या विचार साझा करें जिन्हें आप अपनी विरासत पुस्तक में शामिल करना चाहते हैं।'
                      : 'Share any special milestones, ideas, or thoughts you wish to include in your legacy book.'}
                  </p>
                  <textarea
                    rows={4}
                    value={storyDetails}
                    onChange={(e) => setStoryDetails(e.target.value)}
                    placeholder={
                      isHindi
                        ? 'अपनी यादें या विचार यहाँ लिखें...'
                        : 'Type any details, memories, or specific thoughts here...'
                    }
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E5C463] font-sans text-sm resize-none"
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                {step > 1 ? (
                  <button
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:bg-white/10 text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isHindi ? 'पीछे' : 'Back'}</span>
                  </button>
                ) : <div />}

                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !whatPreserve) ||
                    (step === 2 && !whoAbout) ||
                    (step === 3 && !howPreserve)
                  }
                  className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans font-bold text-xs uppercase tracking-[2px] transition-all cursor-pointer ${((step === 1 && whatPreserve) ||
                      (step === 2 && whoAbout) ||
                      (step === 3 && howPreserve) ||
                      step === 4)
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#E5C463] to-[#D4AF37] text-[#1A1410] hover:brightness-110 shadow-lg hover:shadow-[#D4AF37]/30'
                      : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
                    }`}
                >
                  <span>{step === 4 ? (isHindi ? 'सबमिट करें' : 'Submit') : (isHindi ? 'आगे बढ़ें' : 'Next')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            /* Final Success Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B3CDC] p-0.5 mx-auto mb-4">
                <div className="w-full h-full bg-[#1A0B20] rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-[#E5C463]" />
                </div>
              </div>

              <h3 className="font-serif font-bold text-3xl text-white">
                {isHindi ? 'आपकी कहानी यहाँ से शुरू होती है।' : 'Your Story Begins Here.'}
              </h3>

              <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
                {isHindi
                  ? 'अपनी यात्रा साझा करने के लिए धन्यवाद। हमारे स्टोरीटेलिंग विशेषज्ञ आपकी आवश्यकताओं की समीक्षा करेंगे और आपकी विरासत को सहेजने के सर्वोत्तम दृष्टिकोण की सिफारिश करेंगे।'
                  : 'Thank you for sharing your journey. Our storytelling specialists will review your requirements and recommend the best approach to preserve your legacy.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <button
                  onClick={handleConsultationClick}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C463] to-[#D4AF37] text-[#1A1410] font-sans font-bold text-xs uppercase tracking-[2px] rounded-full hover:brightness-110 shadow-lg transition-all cursor-pointer"
                >
                  {isHindi ? 'मुफ्त परामर्श बुक करें' : 'Book a Free Consultation'}
                </button>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 text-white font-sans font-bold text-xs uppercase tracking-[2px] rounded-full hover:bg-white/20 transition-all cursor-pointer"
                >
                  {isHindi ? 'अपनी यात्रा शुरू करें' : 'Start Your Journey'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
