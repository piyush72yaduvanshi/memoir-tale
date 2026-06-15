import { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Sparkles, Award, User } from 'lucide-react';

type Genre = 'family' | 'personal' | 'freedom' | 'business' | 'love' | '';
type Language = 'english' | 'hindi' | 'hinglish' | 'regional' | '';
type Tone = 'formal' | 'warm' | 'historical' | 'poetic' | '';

interface Writer {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  languages: string[];
  tones: string[];
  genres: string[];
}

const WRITERS: Writer[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialty: "Historical & Freedom Fighter Narratives",
    experience: "15+ years",
    languages: ['english', 'hindi', 'hinglish'],
    tones: ['formal', 'historical'],
    genres: ['freedom', 'business', 'family'],
  },
  {
    id: 2,
    name: "Priya Sharma",
    specialty: "Personal Memoirs & Love Stories",
    experience: "12+ years",
    languages: ['english', 'hindi', 'hinglish'],
    tones: ['warm', 'poetic'],
    genres: ['personal', 'love', 'family'],
  },
  {
    id: 3,
    name: "Amit Verma",
    specialty: "Business & Entrepreneurial Journeys",
    experience: "10+ years",
    languages: ['english', 'hinglish'],
    tones: ['formal', 'warm'],
    genres: ['business', 'personal'],
  },
  {
    id: 4,
    name: "Kamal Singh",
    specialty: "Regional Language Specialist",
    experience: "18+ years",
    languages: ['hindi', 'regional'],
    tones: ['formal', 'historical', 'poetic'],
    genres: ['freedom', 'family', 'personal'],
  },
  {
    id: 5,
    name: "Anjali Mehta",
    specialty: "Warm Conversational Stories",
    experience: "8+ years",
    languages: ['english', 'hindi', 'hinglish'],
    tones: ['warm', 'poetic'],
    genres: ['love', 'personal', 'family'],
  },
];

export default function WriterMatchmaker() {
  const [step, setStep] = useState(1);
  const [genre, setGenre] = useState<Genre>('');
  const [language, setLanguage] = useState<Language>('');
  const [tone, setTone] = useState<Tone>('');
  const [matchedWriter, setMatchedWriter] = useState<Writer | null>(null);

  const handleMatch = () => {
    // Simple matching logic
    const matched = WRITERS.find(writer => 
      writer.genres.includes(genre) && 
      writer.languages.includes(language) && 
      writer.tones.includes(tone)
    ) || WRITERS[0]; // Fallback to first writer
    
    setMatchedWriter(matched);
  };

  const resetForm = () => {
    setStep(1);
    setGenre('');
    setLanguage('');
    setTone('');
    setMatchedWriter(null);
  };

  const progress = (step / 3) * 100;

  if (matchedWriter) {
    return (
      <section className="bg-[#2D1B36] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3A2447] border border-[#8B5CF6]/30 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-[#A78BFA]" />
              <span className="text-[#A78BFA] text-xs font-semibold uppercase tracking-wider">
                Perfect Match Found
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
              Your <span className="italic text-[#A78BFA]">Ideal</span> Writer
            </h2>
          </div>

          <div className="bg-[#3A2447] border border-[#8B5CF6]/30 rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="h-32 w-32 rounded-full bg-[#2D1B36] border-4 border-[#8B5CF6]/40 flex items-center justify-center flex-shrink-0">
                <User className="h-16 w-16 text-[#A78BFA]" />
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-2">
                  {matchedWriter.name}
                </h3>
                <p className="text-[#A78BFA] text-lg font-semibold mb-4">
                  {matchedWriter.specialty}
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full">
                    <Award className="h-4 w-4 text-[#A78BFA]" />
                    <span className="text-white text-sm">{matchedWriter.experience}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-[#8B5CF6] hover:bg-white/88 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <span>Book This Writer</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-4 bg-transparent border-2 border-[#8B5CF6]/50 hover:border-[#8B5CF6] text-[#A78BFA] hover:text-white font-semibold rounded-full transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#2D1B36] py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3A2447] border border-[#8B5CF6]/30 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-[#A78BFA]" />
            <span className="text-[#A78BFA] text-xs font-semibold uppercase tracking-wider">
              Writer Matchmaker Tool
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
            Find Your <span className="italic text-[#A78BFA]">Perfect</span> Writer
          </h2>
          <p className="text-white/60 mt-4 text-sm lg:text-base max-w-2xl mx-auto">
            Answer a few questions to match with a writer who understands your story
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-[#3A2447] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#8B5CF6] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[#A78BFA] text-sm text-center mt-2">
            Step {step} of 3
          </p>
        </div>

        {/* Step 1: Genre */}
        {step === 1 && (
          <div className="bg-[#3A2447] border border-[#8B5CF6]/30 rounded-2xl p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-white mb-6 text-center">
              What type of story is this?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: 'family', label: 'Family Legacy' },
                { value: 'personal', label: 'Personal Memoir' },
                { value: 'freedom', label: 'Freedom Fighter' },
                { value: 'business', label: 'Business Journey' },
                { value: 'love', label: 'Love Story' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGenre(option.value as Genre)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    genre === option.value
                      ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                      : 'border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{option.label}</span>
                    {genre === option.value && (
                      <div className="h-6 w-6 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => genre && setStep(2)}
                disabled={!genre}
                className="px-8 py-3 bg-[#8B5CF6] hover:bg-white/88 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Language */}
        {step === 2 && (
          <div className="bg-[#3A2447] border border-[#8B5CF6]/30 rounded-2xl p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-white mb-6 text-center">
              Preferred language for your book?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: 'english', label: 'English' },
                { value: 'hindi', label: 'Hindi' },
                { value: 'hinglish', label: 'Hinglish' },
                { value: 'regional', label: 'Regional (Urdu/Marathi/Tamil)' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLanguage(option.value as Language)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    language === option.value
                      ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                      : 'border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{option.label}</span>
                    {language === option.value && (
                      <div className="h-6 w-6 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-transparent border-2 border-[#8B5CF6]/50 hover:border-[#8B5CF6] text-[#A78BFA] hover:text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => language && setStep(3)}
                disabled={!language}
                className="px-8 py-3 bg-[#8B5CF6] hover:bg-white/88 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Tone */}
        {step === 3 && (
          <div className="bg-[#3A2447] border border-[#8B5CF6]/30 rounded-2xl p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-white mb-6 text-center">
              What tone do you prefer?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: 'formal', label: 'Formal Literary' },
                { value: 'warm', label: 'Warm Conversational' },
                { value: 'historical', label: 'Historical Epic' },
                { value: 'poetic', label: 'Poetic' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTone(option.value as Tone)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    tone === option.value
                      ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                      : 'border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{option.label}</span>
                    {tone === option.value && (
                      <div className="h-6 w-6 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-transparent border-2 border-[#8B5CF6]/50 hover:border-[#8B5CF6] text-[#A78BFA] hover:text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleMatch}
                disabled={!tone}
                className="px-8 py-3 bg-[#8B5CF6] hover:bg-white/88 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Find My Writer</span>
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
