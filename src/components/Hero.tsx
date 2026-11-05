import { ArrowRight, Clock, MapPin } from 'lucide-react';
import Button from './ui/Button';
import { ViewState } from '../types';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export default function Hero({ setView }: HeroProps) {
  const go = (view: ViewState) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative min-h-[640px] h-[92vh] max-h-[880px] w-full flex items-end overflow-hidden bg-[#1F2A1A]">
      <img
        src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1920&q=80"
        alt="Tacos and plates on the table at Jalapeño Taco"
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      {/* Scrim keeps the text on the calm, dark left of the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A1A]/90 via-[#1F2A1A]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1F2A1A]/70 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 sm:pb-24 pt-36">
        <div className="max-w-2xl rise-in">
          <h1 className="text-5xl sm:text-7xl leading-[1.04] tracking-[-0.03em] font-semibold text-[#FBF8F1]">
            Street tacos, quesabirria and burritos made by hand
          </h1>

          <p className="text-lg leading-7 text-[#F4EFE3]/80 max-w-xl mt-6">
            Cooked to order on cast-iron planchas at our Mexican taqueria on Roosevelt Road in Westchester.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => go('menu')}>
              View the menu
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-[#FBF8F1]/30 text-[#FBF8F1] hover:bg-[#FBF8F1] hover:text-[#1F2A1A]"
              onClick={() => go('visit')}
            >
              Visit us
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 mt-10 text-sm text-[#F4EFE3]/70">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              Westchester, IL
            </span>
            <span className="flex items-center gap-2 tabular-nums">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              Open daily, 10 AM to 11 PM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
