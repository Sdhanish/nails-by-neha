import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Heart,
  Palette,
  Scissors,
  Calendar,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: 'What style best describes your vibe?',
    subtitle: 'Choose the aesthetic that feels most natural to you.',
    icon: Sparkles,
    key: 'style',
    options: [
      { label: 'Minimal', desc: 'Clean, understated, nude tones and sheer milky glazes.' },
      { label: 'Elegant', desc: 'Refined classics, French micro-tips, and soft pearl shines.' },
      { label: 'Bold', desc: 'Runway drama, rich crimsons, obsidian blacks, and high-shine chromes.' },
      { label: 'Playful', desc: 'Hand-painted florals, sparkling stardust glitters, and creative art.' },
    ],
  },
  {
    id: 2,
    title: 'Which nail shape flatters your hands most?',
    subtitle: 'From timeless almond to sculpted architectural coffins.',
    icon: Scissors,
    key: 'shape',
    options: [
      { label: 'Almond', desc: 'Tapered sides with a soft rounded tip for natural elongation.' },
      { label: 'Square', desc: 'Straight sidewalls with crisp 90° edges for modern chic.' },
      { label: 'Oval', desc: 'Gently curved along the natural fingertip contour.' },
      { label: 'Coffin', desc: 'Tapered silhouette with a dramatic flat, squared-off apex.' },
      { label: 'Stiletto', desc: 'Ultra-sharp, dramatic pointed tips that make a fierce statement.' },
    ],
  },
  {
    id: 3,
    title: 'What length fits your daily lifestyle?',
    subtitle: 'Typing, texting, or making head-turning statements.',
    icon: Layers,
    key: 'length',
    options: [
      { label: 'Short', desc: 'Comfortable, practical for keyboards, gym, and low-maintenance wear.' },
      { label: 'Medium', desc: 'The golden balance: noticeable elegance without hindering daily tasks.' },
      { label: 'Long', desc: 'Glamorous and dramatic, sculpted for maximum hand elegance.' },
    ],
  },
  {
    id: 4,
    title: 'What finish makes your heart skip a beat?',
    subtitle: 'From liquid glass glazes to cosmic metallic mirrors.',
    icon: Palette,
    key: 'finish',
    options: [
      { label: 'Glossy', desc: 'Ultra-shiny UV topcoat that mimics fresh salon gel lacquer.' },
      { label: 'Matte', desc: 'Velvety, reflection-free smooth suede texture.' },
      { label: 'Chrome', desc: 'Molten liquid-metal reflection that shimmers with movement.' },
      { label: 'Glitter', desc: 'Suspended holographic micro-flakes and celestial sparkle.' },
    ],
  },
  {
    id: 5,
    title: 'What occasion are you styling for today?',
    subtitle: 'Everyday elegance, weddings, or a glamorous night out.',
    icon: Calendar,
    key: 'occasion',
    options: [
      { label: 'Everyday', desc: 'Effortless polish that coordinates with every wardrobe piece.' },
      { label: 'Wedding', desc: 'Bridal ceremonies, engagement parties, and reception festivities.' },
      { label: 'Party', desc: 'Cocktail hours, club nights, concerts, and weekend celebrations.' },
      { label: 'Office', desc: 'Groomed, refined, understated professionalism.' },
      { label: 'Special Event', desc: 'Festivals, anniversaries, and red-carpet moments.' },
    ],
  },
];

export default function FindYourMatch() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    style: '',
    shape: '',
    length: '',
    finish: '',
    occasion: '',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (optionLabel) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.key]: optionLabel,
    }));
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({
      style: '',
      shape: '',
      length: '',
      finish: '',
      occasion: '',
    });
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Compute matched products based on user answers
  const recommendedProducts = React.useMemo(() => {
    if (!isCompleted) return [];

    const scored = PRODUCTS.map((product) => {
      let score = 0;

      // Shape match
      if (answers.shape && (product.shape === answers.shape || product.availableShapes?.includes(answers.shape))) {
        score += 3;
      }
      // Length match
      if (answers.length && (product.length === answers.length || product.availableLengths?.includes(answers.length))) {
        score += 3;
      }
      // Finish match
      if (answers.finish && (product.finish === answers.finish || product.availableFinishes?.includes(answers.finish))) {
        score += 2;
      }
      // Occasion match
      if (answers.occasion && product.occasion === answers.occasion) {
        score += 2;
      }
      // Style keywords in tags
      if (answers.style && product.tags.includes(answers.style.toLowerCase())) {
        score += 2;
      }

      return { product, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((s) => s.product);
  }, [isCompleted, answers]);

  const progressPercent = Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Find Your Match Quiz', path: '/find-your-match' }]} />

      {!isCompleted ? (
        <div className="bg-white rounded-3xl border border-[#EDE4E6] p-6 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
          {/* Progress Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#E85D75] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-[#6E6368]">{progressPercent}% Completed</span>
            </div>

            <div className="w-full h-1.5 bg-[#F8EEF0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E85D75] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Question Title */}
              <div className="space-y-1">
                <h1 className="font-serif text-2xl sm:text-4xl text-[#1E1A1D]">
                  {currentQ.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#6E6368]">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.key] === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelectOption(opt.label)}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#E85D75] bg-[#F8EEF0] shadow-xs'
                          : 'border-[#EDE4E6] bg-[#FAF7F5] hover:border-[#1E1A1D]/40 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-semibold text-sm text-[#1E1A1D]">
                          {opt.label}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#E85D75] bg-[#E85D75] text-white'
                              : 'border-[#EDE4E6] bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                      <p className="text-xs text-[#6E6368] leading-normal">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#EDE4E6]">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors ${
                currentStep === 0
                  ? 'opacity-40 cursor-not-allowed text-[#6E6368]'
                  : 'text-[#1E1A1D] hover:bg-[#F8EEF0]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[currentQ.key]}
              className={`px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm ${
                answers[currentQ.key]
                  ? 'bg-[#1E1A1D] hover:bg-[#E85D75] text-white cursor-pointer'
                  : 'bg-[#EDE4E6] text-[#6E6368] cursor-not-allowed'
              }`}
            >
              <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'Reveal Matches' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Header */}
          <div className="bg-[#F8EEF0] rounded-3xl p-8 sm:p-12 border border-[#EDE4E6] text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-xs font-semibold uppercase tracking-wider text-[#E85D75] border border-[#EDE4E6]">
              <Sparkles className="w-3.5 h-3.5" /> Your Curated Matches
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1A1D]">
              Sets tailored to your aesthetic.
            </h1>

            {/* Selected Answers summary chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
                Style: <strong>{answers.style}</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
                Shape: <strong>{answers.shape}</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
                Length: <strong>{answers.length}</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
                Finish: <strong>{answers.finish}</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#EDE4E6] text-[#1E1A1D]">
                Occasion: <strong>{answers.occasion}</strong>
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={handleRetake}
                className="text-xs text-[#E85D75] hover:underline inline-flex items-center gap-1.5 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Style Quiz
              </button>
            </div>
          </div>

          {/* Recommended Products Grid */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1A1D]">
              Recommended for You
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Bottom Explore CTA */}
          <div className="text-center pt-6">
            <Link
              to="/shop"
              className="px-8 py-3.5 rounded-full bg-[#1E1A1D] hover:bg-[#E85D75] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <span>Explore All Atelier Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
