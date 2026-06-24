import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';
import Button from './ui/Button';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger background change once scrolled past 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' as ViewState },
    { label: 'Menu', id: 'menu' as ViewState },
    { label: 'Visit', id: 'visit' as ViewState },
    { label: 'Contact', id: 'contact' as ViewState },
  ];

  const handleNavClick = (viewId: ViewState) => {
    setView(viewId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        id="main-navigation-bar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F4EFE3]/80 backdrop-blur-md border-b border-[#4C7A2A]/10 shadow-sm py-4'
            : 'bg-[#F4EFE3]/40 backdrop-blur-sm border-b border-[#4C7A2A]/5 py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <div onClick={() => handleNavClick('home')} className="cursor-pointer">
            <Logo size="md" animate={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="relative py-2 text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300"
                  style={{ color: isActive ? '#4C7A2A' : '#6B6358' }}
                >
                  <span className="hover:text-[#4C7A2A] transition-colors">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="header-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9352A]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+17086529000"
              className="flex items-center gap-2 text-xs font-mono font-medium text-[#6B6358] hover:text-[#4C7A2A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8A33D]" />
              (708) 652-9000
            </a>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('menu')}
            >
              Order Online
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-1.5 text-xs"
              onClick={() => handleNavClick('menu')}
            >
              Menu
            </Button>
            <button
              id="mobile-menu-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1F2A1A] hover:text-[#4C7A2A] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Slide-in Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-fullscreen-navigation-overlay"
            className="fixed inset-0 z-40 bg-[#FBF8F1] flex flex-col justify-between p-8 pt-28"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top wave / logo display inside menu */}
            <div className="flex flex-col gap-10">
              <div className="flex justify-center border-b border-[#4C7A2A]/10 pb-6">
                <Logo size="lg" animate={true} />
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-6 items-center">
                {navItems.map((item, index) => {
                  const isActive = currentView === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      id={`mobile-nav-item-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-2xl font-sans font-bold tracking-tight py-2 transition-all ${
                        isActive ? 'text-[#4C7A2A]' : 'text-[#6B6358]'
                      }`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                    >
                      <span className="relative">
                        {item.label}
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#D9352A] rounded" />
                        )}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions & Address */}
            <motion.div
              className="flex flex-col items-center gap-6 text-center border-t border-[#4C7A2A]/10 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-xs font-mono text-[#6B6358]">
                <p className="font-bold text-[#1F2A1A]">JALAPEÑO TACO WESTCHESTER</p>
                <p className="mt-1">10229 Roosevelt Rd, Westchester, IL 60154</p>
                <p className="mt-0.5">Call: (708) 652-9000</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleNavClick('menu')}
                >
                  Order Pickup & Delivery
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
