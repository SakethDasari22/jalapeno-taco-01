import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Instagram, Facebook, Mail, MessageSquare, Check, Sparkles } from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';
import Button from './ui/Button';

interface FooterProps {
  setView: (view: ViewState) => void;
}

export default function Footer({ setView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1200);
  };

  const handleNavClick = (view: ViewState) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-restaurant-footer" className="bg-[#1F2A1A] text-[#FBF8F1] pt-24 pb-12 border-t border-[#4C7A2A]/10 relative overflow-hidden">
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4C7A2A]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#E8A33D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#FBF8F1]/10">
          
          {/* Brand Presentation with Slow Swaying Logo Mark */}
          <div className="lg:col-span-4 space-y-6">
            <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
              {/* Logo has a slow pulse/sway variant built into parent motion container */}
              <motion.div
                animate={{
                  rotate: [-1.5, 1.5, -1.5],
                  y: [-1, 1, -1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              >
                <Logo size="md" animate={true} />
              </motion.div>
            </div>
            
            <p className="text-sm text-[#F4EFE3]/70 leading-relaxed font-medium">
              Elevated taqueria experience delivering authentic street food crafted with premium locally-sourced ingredients, hand-pressed tortillas, and generational family pride in Westchester, IL.
            </p>

            {/* Social Channels */}
            <div className="flex gap-4 items-center">
              {[
                { icon: <Instagram className="w-4 h-4" />, label: 'Instagram', url: 'https://instagram.com/jalapenotacowestchester' },
                { icon: <Facebook className="w-4 h-4" />, label: 'Facebook', url: 'https://facebook.com/jalapenotacowestchester' },
                { icon: <MessageSquare className="w-4 h-4" />, label: 'Yelp', url: 'https://yelp.com' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#F4EFE3]/10 hover:bg-[#4C7A2A] text-[#FBF8F1] flex items-center justify-center transition-colors shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans font-semibold text-xs text-[#E8A33D]">
              Explore
            </h4>
            <ul className="space-y-2.5 font-sans font-semibold text-sm text-[#F4EFE3]/80">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-[#4C7A2A] transition-colors cursor-pointer">
                  Home page
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('menu')} className="hover:text-[#4C7A2A] transition-colors cursor-pointer">
                  Our menu
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('visit')} className="hover:text-[#4C7A2A] transition-colors cursor-pointer">
                  Visit location
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-[#4C7A2A] transition-colors cursor-pointer">
                  Get in touch
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans font-semibold text-xs text-[#E8A33D]">
              Locate us
            </h4>
            <div className="space-y-4 text-sm text-[#F4EFE3]/80 font-medium leading-relaxed">
              <p>
                <span className="font-semibold text-[#FBF8F1]">Jalapeño Taco Westchester</span><br />
                10229 Roosevelt Rd<br />
                Westchester, IL 60154
              </p>
              <div>
                <p className="font-semibold text-[#FBF8F1]">Hours of operation</p>
                <p className="text-xs text-[#F4EFE3]/60 mt-0.5">Mon to Sun: 10:00 AM - 11:00 PM</p>
                <p className="text-xs text-[#F4EFE3]/60">Fri and Sat: Late night until midnight</p>
              </div>
            </div>
          </div>

          {/* Newsletter Form Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans font-semibold text-xs text-[#E8A33D]">
              The salsita newsletter
            </h4>
            <p className="text-xs text-[#F4EFE3]/70 leading-relaxed font-medium">
              Join our list to receive exclusive promo codes, direct menu announcements, and weekend catering specials!
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F4EFE3]/10 text-xs text-[#FBF8F1] px-4 py-3.5 pr-10 rounded-full border border-transparent focus:border-[#D9352A] outline-none transition-colors font-sans placeholder-[#F4EFE3]/40"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#4C7A2A] text-[#FBF8F1] hover:bg-[#D9352A] transition-colors cursor-pointer"
                      aria-label="Subscribe"
                    >
                      {isSubmitting ? (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-[#FBF8F1] border-t-transparent animate-spin block" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  className="bg-[#4C7A2A]/20 border border-[#4C7A2A]/40 rounded-xl p-3.5 flex items-center gap-2.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-5 h-5 rounded-full bg-[#4C7A2A] flex items-center justify-center text-[#FBF8F1] flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs leading-snug font-semibold text-[#FBF8F1]">
                    <span className="text-[#E8A33D] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D9352A]" /> ¡gracias!
                    </span>
                    Check your inbox for 10% off!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footer Legal and Copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-sm font-sans text-[#F4EFE3]/50">
          <p>© {new Date().getFullYear()} Jalapeño Taco. All rights reserved.</p>
          <p className="mt-4 sm:mt-0 flex items-center gap-1.5">
            Made with fresh jalapeños in Cicero, Illinois
          </p>
        </div>

      </div>

      {/* Decorative Bottom Tri-Color Gradient Stripe */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-[#4C7A2A] w-full" />
    </footer>
  );
}
