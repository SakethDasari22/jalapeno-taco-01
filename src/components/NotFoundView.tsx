import { motion } from 'motion/react';
import { ArrowLeft, RefreshCw, Compass } from 'lucide-react';
import { ViewState } from '../types';
import Button from './ui/Button';

interface NotFoundViewProps {
  setView: (view: ViewState) => void;
}

export default function NotFoundView({ setView }: NotFoundViewProps) {
  return (
    <div id="not-found-view-wrapper" className="bg-[#FBF8F1] min-h-screen flex items-center justify-center pt-24 pb-32 px-6">
      <div className="max-w-md w-full text-center space-y-8 flex flex-col items-center">
        
        {/* Animated Custom Sad Jalapeño Vector Illustration */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Pulsing light behind character */}
          <div className="absolute inset-0 bg-[#E8A33D]/10 rounded-full blur-3xl animate-pulse" />

          {/* Sad Jalapeño Character SVG */}
          <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-lg">
            {/* Sombrero Hat */}
            <motion.g
              initial={{ rotate: -5 }}
              animate={{ rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <ellipse cx="100" cy="40" rx="35" ry="10" fill="#E8A33D" />
              <path d="M75 40 C75 15, 125 15, 125 40 Z" fill="#E8A33D" />
              {/* Red ribbon details on Sombrero */}
              <path d="M76 38 C88 34, 112 34, 124 38" stroke="#D9352A" strokeWidth="3.5" fill="none" />
              {/* Green dots on Sombrero rim */}
              <circle cx="72" cy="40" r="2.5" fill="#4C7A2A" />
              <circle cx="85" cy="42" r="2.5" fill="#4C7A2A" />
              <circle cx="100" cy="43" r="2.5" fill="#4C7A2A" />
              <circle cx="115" cy="42" r="2.5" fill="#4C7A2A" />
              <circle cx="128" cy="40" r="2.5" fill="#4C7A2A" />
            </motion.g>

            {/* Jalapeño Green Body */}
            <motion.path
              d="M100 48 C115 50, 130 75, 128 110 C125 140, 105 165, 95 168 C80 172, 70 150, 72 125 C74 95, 85 46, 100 48 Z"
              fill="#4C7A2A"
              initial={{ scaleY: 0.95 }}
              animate={{ scaleY: [1.02, 0.95, 1.02] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />

            {/* Sad Eyes (Slanted lines + small teardrop) */}
            <g fill="none" stroke="#FBF8F1" strokeWidth="3" strokeLinecap="round">
              {/* Left Eye */}
              <line x1="84" y1="90" x2="94" y2="94" />
              {/* Right Eye */}
              <line x1="116" y1="90" x2="106" y2="94" />
            </g>

            {/* Sad Mouth */}
            <path d="M92 118 C96 112, 104 112, 108 118" stroke="#FBF8F1" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Teardrop falling down */}
            <motion.path
              d="M86 98 C86 98, 82 106, 82 110 C82 114, 86 114, 86 110 Z"
              fill="#38bdf8"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: [0, 20], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeIn" }}
            />

            {/* Upside Down Map holding hand */}
            <g>
              {/* Arm Left */}
              <path d="M78 115 C65 120, 55 130, 60 138" stroke="#4C7A2A" strokeWidth="7.5" strokeLinecap="round" fill="none" />
              {/* Upside down map card */}
              <motion.rect
                x="35"
                y="132"
                width="34"
                height="24"
                rx="3"
                fill="#F4EFE3"
                stroke="#6B6358"
                strokeWidth="2.5"
                initial={{ rotate: -10 }}
                animate={{ rotate: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              {/* Map dotted tracks */}
              <path d="M42 144 C48 140, 54 150, 60 144" stroke="#D9352A" strokeWidth="2" strokeDasharray="2,2" fill="none" />
              {/* Giant Upside Down question mark on map */}
              <text x="48" y="152" fill="#D9352A" fontSize="14" fontWeight="bold">¿</text>
            </g>
          </svg>

          {/* Compass icon element */}
          <div className="absolute top-10 right-4 bg-[#D9352A] text-[#FBF8F1] p-2 rounded-full shadow-lg border border-[#FBF8F1]/10">
            <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* Copywriting Details */}
        <div className="space-y-4">
          <h2 className="text-3xl font-sans font-black tracking-tight text-[#1F2A1A]">
            ¡Ay Caramba! 404
          </h2>
          <p className="text-base font-semibold text-[#D9352A]">
            "This page wandered off the menu."
          </p>
          <p className="text-xs text-[#6B6358] font-medium leading-relaxed max-w-sm mx-auto">
            Our jalapeño tried to navigate, but held the map upside down. Don't worry, the tacos are still exactly where they should be!
          </p>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Button
            variant="primary"
            onClick={() => {
              setView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setView('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto"
          >
            Go To Taco Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
