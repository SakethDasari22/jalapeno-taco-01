import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { ViewState, MenuItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import VisitView from './components/VisitView';
import ContactView from './components/ContactView';
import NotFoundView from './components/NotFoundView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check and listen for prefers-reduced-motion query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Simple Router Switcher
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            setView={setCurrentView}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        );
      case 'menu':
        return (
          <MenuView
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        );
      case 'visit':
        return <VisitView setView={setCurrentView} />;
      case 'contact':
        return <ContactView />;
      case '404':
        return <NotFoundView setView={setCurrentView} />;
      default:
        return <HomeView setView={setCurrentView} setSelectedMenuItem={setSelectedMenuItem} />;
    }
  };

  // Global layout transition configurations
  const pageTransition = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: prefersReducedMotion ? 0 : -15 },
    transition: { duration: prefersReducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "user"}>
      <div id="restaurant-site-body" className="min-h-screen bg-[#FBF8F1] selection:bg-[#4C7A2A]/25 selection:text-[#1F2A1A]">
        {/* Navigation Head */}
        <Header currentView={currentView} setView={setCurrentView} />

        {/* Dynamic Transition Canvas */}
        <main id="view-canvas">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
              className="w-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer info & socials */}
        <Footer setView={setCurrentView} />
      </div>
    </MotionConfig>
  );
}
