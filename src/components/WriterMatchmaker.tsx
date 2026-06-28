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

interface WriterMatchmakerProps {
  onMatchWriter?: (writerName: string) => void;
}

export default function WriterMatchmaker({ onMatchWriter }: WriterMatchmakerProps) {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-4" style={{ backgroundColor: '#3A2447', borderColor: 'rgba(46, 27, 93, 0.3)' }}>
              <Sparkles className="h-4 w-4" style={{ color: '#A78BFA' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#A78BFA' }}>
                Perfect Match Found
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
              Your <span className="italic" style={{ color: '#A78BFA' }}>Ideal</span> Writer
            </h2>
          </div>

          <div className="border rounded-2xl p-8 lg:p-10" style={{ backgroundColor: '#3A2447', borderColor: 'rgba(46, 27, 93, 0.3)' }}>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="h-32 w-32 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2D1B36', border: '4px solid rgba(46, 27, 93, 0.4)' }}>
                <User className="h-16 w-16" style={{ color: '#A78BFA' }} />
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-2">
                  {matchedWriter.name}
                </h3>
                <p className="text-lg font-semibold mb-4" style={{ color: '#A78BFA' }}>
                  {matchedWriter.specialty}
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 px-3 py-1.5 border rounded-full" style={{ backgroundColor: 'rgba(46, 27, 93, 0.1)', borderColor: 'rgba(46, 27, 93, 0.3)' }}>
                    <Award className="h-4 w-4" style={{ color: '#A78BFA' }} />
                    <span className="text-white text-sm">{matchedWriter.experience}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  if (onMatchWriter) {
                    onMatchWriter(matchedWriter.name);
                  } else {
                    window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 hover:bg-[#A78BFA]/90 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: '#A78BFA' }}
              >
                <span>Book This Writer</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-4 bg-transparent border-2 font-semibold rounded-full transition-all duration-300 hover:text-white"
                style={{ 
                  borderColor: 'rgba(167, 139, 250, 0.5)',
                  color: '#A78BFA'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#A78BFA'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.5)'}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full mb-4 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-purple-300" />
            <span className="text-purple-300 text-xs font-semibold uppercase tracking-wider">
              Writer Matchmaker Tool
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
            Find Your <span className="italic bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Perfect</span> Writer
          </h2>
          <p className="text-white/60 mt-4 text-sm lg:text-base max-w-2xl mx-auto">
            Answer a few questions to match with a writer who understands your story
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-[#3A2447] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-purple-300 text-sm text-center mt-2">
            Step {step} of 3
          </p>
        </div>

        {/* Step 1: Genre */}
        {step === 1 && (
          <div className="bg-[#3A2447] border border-[#A78BFA]/30 rounded-2xl p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-white mb-6 text-center">
              What type of story is this?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: 'family', label: 'Family Legacy', color: 'purple' },
                { value: 'personal', label: 'Personal Memoir', color: 'blue' },
                { value: 'freedom', label: 'Freedom Fighter', color: 'amber' },
                { value: 'business', label: 'Business Journey', color: 'emerald' },
                { value: 'love', label: 'Love Story', color: 'rose' },
              ].map((option) => {
                const colorClasses = {
                  purple: genre === option.value 
                    ? 'border-purple-400 bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-purple-500/20' 
                    : 'border-purple-400/30 hover:border-purple-400/60 hover:bg-purple-500/5',
                  blue: genre === option.value 
                    ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-blue-600/10 shadow-blue-500/20' 
                    : 'border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/5',
                  amber: genre === option.value 
                    ? 'border-amber-400 bg-gradient-to-br from-amber-500/20 to-amber-600/10 shadow-amber-500/20' 
                    : 'border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/5',
                  emerald: genre === option.value 
                    ? 'border-emerald-400 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 shadow-emerald-500/20' 
                    : 'border-emerald-400/30 hover:border-emerald-400/60 hover:bg-emerald-500/5',
                  rose: genre === option.value 
                    ? 'border-rose-400 bg-gradient-to-br from-rose-500/20 to-rose-600/10 shadow-rose-500/20' 
                    : 'border-rose-400/30 hover:border-rose-400/60 hover:bg-rose-500/5',
                };
                
                const checkColors = {
                  purple: 'bg-purple-500',
                  blue: 'bg-blue-500',
                  amber: 'bg-amber-500',
                  emerald: 'bg-emerald-500',
                  rose: 'bg-rose-500',
                };

                return (
                  <button
                    key={option.value}
                    onClick={() => setGenre(option.value as Genre)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${colorClasses[option.color as keyof typeof colorClasses]} ${genre === option.value ? 'shadow-lg scale-105' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{option.label}</span>
                      {genre === option.value && (
                        <div className={`h-6 w-6 rounded-full ${checkColors[option.color as keyof typeof checkColors]} flex items-center justify-center shadow-lg`}>
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => genre && setStep(2)}
                disabled={!genre}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Language */}
        {step === 2 && (
          <div className="bg-[#3A2447] border border-[#A78BFA]/30 rounded-2xl p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-white mb-6 text-center">
              Preferred language for your book?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: 'english', label: 'English', color: 'blue' },
                { value: 'hindi', label: 'Hindi', color: 'amber' },
                { value: 'hinglish', label: 'Hinglish', color: 'purple' },
                { value: 'regional', label: 'Regional (Urdu/Marathi/Tamil)', color: 'teal' },
              ].map((option) => {
                const colorClasses = {
                  blue: language === option.value 
                    ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-blue-600/10 shadow-blue-500/20' 
                    : 'border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/5',
                  amber: language === option.value 
                    ? 'border-amber-400 bg-gradient-to-br from-amber-500/20 to-amber-600/10 shadow-amber-500/20' 
                    : 'border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/5',
                  purple: language === option.value 
                    ? 'border-purple-400 bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-purple-500/20' 
                    : 'border-purple-400/30 hover:border-purple-400/60 hover:bg-purple-500/5',
                  teal: language === option.value 
                    ? 'border-teal-400 bg-gradient-to-br from-teal-500/20 to-teal-600/10 shadow-teal-500/20' 
                    : 'border-teal-400/30 hover:border-teal-400/60 hover:bg-teal-500/5',
                };
                
                const checkColors = {
                  blue: 'bg-blue-500',
                  amber: 'bg-amber-500',
                  purple: 'bg-purple-500',
                  teal: 'bg-teal-500',
                };

                return (
                  <button
                    key={option.value}
                    onClick={() => setLanguage(option.value as Language)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${colorClasses[option.color as keyof typeof colorClasses]} ${language === option.value ? 'shadow-lg scale-105' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{option.label}</span>
                      {language === option.value && (
                        <div className={`h-6 w-6 rounded-full ${checkColors[option.color as keyof typeof checkColors]} flex items-center justify-center shadow-lg`}>
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-transparent border-2 border-purple-400/50 hover:border-purple-400 text-purple-300 hover:text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => language && setStep(3)}
                disabled={!language}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Tone */}
        {step === 3 && (
          <div className="bg-[#3A2447] border border-[#A78BFA]/30 rounded-2xl p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-white mb-6 text-center">
              What tone do you prefer?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: 'formal', label: 'Formal Literary', color: 'indigo' },
                { value: 'warm', label: 'Warm Conversational', color: 'rose' },
                { value: 'historical', label: 'Historical Epic', color: 'amber' },
                { value: 'poetic', label: 'Poetic', color: 'pink' },
              ].map((option) => {
                const colorClasses = {
                  indigo: tone === option.value 
                    ? 'border-indigo-400 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 shadow-indigo-500/20' 
                    : 'border-indigo-400/30 hover:border-indigo-400/60 hover:bg-indigo-500/5',
                  rose: tone === option.value 
                    ? 'border-rose-400 bg-gradient-to-br from-rose-500/20 to-rose-600/10 shadow-rose-500/20' 
                    : 'border-rose-400/30 hover:border-rose-400/60 hover:bg-rose-500/5',
                  amber: tone === option.value 
                    ? 'border-amber-400 bg-gradient-to-br from-amber-500/20 to-amber-600/10 shadow-amber-500/20' 
                    : 'border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/5',
                  pink: tone === option.value 
                    ? 'border-pink-400 bg-gradient-to-br from-pink-500/20 to-pink-600/10 shadow-pink-500/20' 
                    : 'border-pink-400/30 hover:border-pink-400/60 hover:bg-pink-500/5',
                };
                
                const checkColors = {
                  indigo: 'bg-indigo-500',
                  rose: 'bg-rose-500',
                  amber: 'bg-amber-500',
                  pink: 'bg-pink-500',
                };

                return (
                  <button
                    key={option.value}
                    onClick={() => setTone(option.value as Tone)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${colorClasses[option.color as keyof typeof colorClasses]} ${tone === option.value ? 'shadow-lg scale-105' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{option.label}</span>
                      {tone === option.value && (
                        <div className={`h-6 w-6 rounded-full ${checkColors[option.color as keyof typeof checkColors]} flex items-center justify-center shadow-lg`}>
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-transparent border-2 border-purple-400/50 hover:border-purple-400 text-purple-300 hover:text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleMatch}
                disabled={!tone}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
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


