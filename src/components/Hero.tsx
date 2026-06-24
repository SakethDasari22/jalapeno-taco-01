import { motion } from 'motion/react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import Button from './ui/Button';
import { ViewState } from '../types';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export default function Hero({ setView }: HeroProps) {
  const headline = "Authentic Mexican Crafted With Fire & Family";
  const words = headline.split(" ");

  return (
    <section id="hero-section" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1F2A1A]">
      {/* Background Hero Image with Slow Parallax Motion */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15, opacity: 0.85 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1920&q=80"
          alt="Jalapeño Taco Grill"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Deep, premium dark gradient overlay matching Kronensee's atmospheric styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A1A] via-[#1F2A1A]/60 to-[#1F2A1A]/40" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Floating subtle atmospheric smoke/light highlights */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(232,163,61,0.08)_0%,transparent_70%)]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#FBF8F1] flex flex-col items-center">
        {/* Small location tag with fade-in */}
        <motion.div
          id="hero-tagline-westchester"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4C7A2A]/85 backdrop-blur-md border border-[#FBF8F1]/10 text-xs font-mono tracking-wider text-[#E8A33D] font-bold uppercase mb-6"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <MapPin className="w-3.5 h-3.5 text-[#E8A33D]" />
          Westchester, IL
        </motion.div>

        {/* Word-by-word Split Text Staggered Reveal Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight leading-[1.08] mb-6 flex flex-wrap justify-center gap-x-3.5 gap-y-1 max-w-3xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-1">
              <motion.span
                className="inline-block font-black origin-bottom"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 1.0 + i * 0.08,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  color: word.toLowerCase().includes("fire") ? "#D9352A" : word.toLowerCase().includes("family") ? "#E8A33D" : "inherit"
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle with fade up delay */}
        <motion.p
          className="text-lg md:text-xl text-[#F4EFE3]/90 font-medium max-w-2xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
        >
          Experience local, hand-made street tacos, rich quesabirrias, giant burritos, and fresh aguas frescas. Serving Westchester with vibrant culinary tradition.
        </motion.p>

        {/* Action Buttons Staggered */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-lg shadow-[#4C7A2A]/20"
            onClick={() => {
              setView('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Explore Full Menu
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-[#FBF8F1] text-[#FBF8F1] hover:bg-[#FBF8F1] hover:text-[#1F2A1A]"
            onClick={() => {
              setView('visit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Visit Taqueria
          </Button>
        </motion.div>

        {/* Operational Highlights Banner */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[#F4EFE3]/70 font-mono text-xs border-t border-[#FBF8F1]/10 pt-8 w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#E8A33D]" />
            <span>Open Daily: 10:00 AM - 11:00 PM</span>
          </div>
          <div className="h-4 w-[1px] bg-[#FBF8F1]/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4C7A2A] animate-pulse" />
            <span>Dine-In, Carryout & Delivery</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom transition decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FBF8F1] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
