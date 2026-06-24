import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, Plus, Minus, Check } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import Button from './ui/Button';

interface MenuViewProps {
  selectedMenuItem: MenuItem | null;
  setSelectedMenuItem: (item: MenuItem | null) => void;
}

export default function MenuView({ selectedMenuItem, setSelectedMenuItem }: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState('tacos');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'sm' | 'lg'>('sm');
  const [selectedProtein, setSelectedProtein] = useState<string>('');
  const [salsaOption, setSalsaOption] = useState<string>('both'); // red, green, both, none
  const [cartSuccess, setCartSuccess] = useState(false);

  // Refs for smooth scroll
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Reset modal parameters when selected menu item changes
  useEffect(() => {
    if (selectedMenuItem) {
      setItemQuantity(1);
      setSelectedSize('sm');
      setCartSuccess(false);
      // Try to match default protein from title if applicable
      if (selectedMenuItem.name.includes('(')) {
        const matches = selectedMenuItem.name.match(/\(([^)]+)\)/);
        if (matches && matches[1]) {
          setSelectedProtein(matches[1]);
        } else {
          setSelectedProtein('Original');
        }
      } else {
        setSelectedProtein('Original');
      }
    }
  }, [selectedMenuItem]);

  // Handle smooth scroll to category section
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = sectionRefs.current[categoryId];
    if (element) {
      const headerOffset = 140; // Offset for sticky headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Intersection observer to track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (const category of CATEGORIES) {
        const element = sectionRefs.current[category.id];
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items based on search query
  const filteredItems = (categoryId: string) => {
    const items = MENU_ITEMS.filter((item) => item.category === categoryId);
    if (!searchQuery) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Check if any items match the search query in this category
  const hasItems = (categoryId: string) => {
    return filteredItems(categoryId).length > 0;
  };

  const handleAddToCart = () => {
    setCartSuccess(true);
    setTimeout(() => {
      setCartSuccess(false);
      setSelectedMenuItem(null);
    }, 1500);
  };

  // Scroll reveal variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div id="menu-view-wrapper" className="bg-[#FBF8F1] min-h-screen pt-24 pb-32">
      {/* Menu Banner Hero */}
      <div className="bg-[#1F2A1A] py-16 md:py-24 text-[#FBF8F1] relative overflow-hidden mb-8">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=1200&q=80"
            alt="Burrito Banner"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A1A] to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="font-mono text-xs text-[#E8A33D] font-bold tracking-widest uppercase mb-3 block">
            House Recipes Since Day One
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight mb-4">
            Our Traditional Menu
          </h1>
          <p className="text-[#F4EFE3]/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Freshly prepared with pure local ingredients, hand-pressed tortillas, and our family adobo recipes. Select a category below to explore.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <input
              type="text"
              placeholder="Search dishes (e.g. Al Pastor, Quesadilla...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FBF8F1] text-[#1F2A1A] text-sm font-sans font-medium px-5 py-3.5 pl-12 rounded-full border border-transparent shadow-md focus:border-[#4C7A2A] focus:outline-none transition-colors"
            />
            <Search className="w-5 h-5 text-[#6B6358] absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Sticky Horizontal Categories Tabs Bar with Layout Underline */}
      <div className="sticky top-[72px] md:top-[88px] z-30 bg-[#FBF8F1]/70 backdrop-blur-md border-b border-white/30 shadow-md py-4 overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex gap-2 sm:gap-4 flex-nowrap min-w-max justify-center">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                id={`tab-${category.id}`}
                onClick={() => handleCategoryClick(category.id)}
                className="relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300 cursor-pointer select-none"
                style={{ color: isActive ? '#FBF8F1' : '#6B6358' }}
              >
                <span className="relative z-10">{category.name}</span>
                {isActive ? (
                  <motion.div
                    layoutId="active-menu-tab"
                    className="absolute inset-0 bg-[#4C7A2A] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <div className="absolute inset-0 rounded-full hover:bg-[#F4EFE3]/80 transition-colors" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        {CATEGORIES.map((category) => {
          const items = filteredItems(category.id);
          if (items.length === 0) return null;

          return (
            <div
              key={category.id}
              ref={(el) => { sectionRefs.current[category.id] = el; }}
              className="py-10 md:py-14 border-b border-[#4C7A2A]/5 scroll-mt-36"
            >
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-wider text-[#E8A33D] font-bold uppercase">
                  <Sparkles className="w-3 h-3 text-[#D9352A]" />
                  TACO TAQUERIA SELECTION
                </div>
                <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-[#1F2A1A]">
                  {category.name}
                </h2>
              </div>

              {/* Grid Layout of Menu Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    id={`menu-card-${item.id}`}
                    variants={itemVariants}
                    className="glass-panel hover:bg-white/60 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm"
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                      boxShadow: '0 12px 24px rgba(76, 122, 42, 0.05)',
                    }}
                    onClick={() => setSelectedMenuItem(item)}
                  >
                    <div>
                      {/* Image Thumbnail with zoom effect */}
                      <div className="overflow-hidden rounded-xl aspect-[16/10] bg-[#1F2A1A]/5 mb-4 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-3 right-3 bg-[#4C7A2A] text-[#FBF8F1] font-mono text-xs font-black px-2.5 py-1 rounded-full border border-[#FBF8F1]/10 shadow-md">
                          {item.priceLarge ? (
                            `$${item.price.toFixed(2)}+`
                          ) : (
                            `$${item.price.toFixed(2)}`
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-bold text-base text-[#1F2A1A] group-hover:text-[#4C7A2A] transition-colors mb-1.5 leading-tight">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#6B6358] font-medium leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Quick Order Accent */}
                    <div className="flex items-center justify-between text-xs font-semibold text-[#6B6358] border-t border-[#4C7A2A]/5 pt-3.5 mt-auto">
                      <span className="text-[10px] font-mono text-[#E8A33D] font-bold uppercase">
                        TAP TO CUSTOMIZE
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#4C7A2A]/10 text-[#4C7A2A] flex items-center justify-center group-hover:bg-[#4C7A2A] group-hover:text-[#FBF8F1] transition-colors duration-300">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}

        {/* Empty Search State */}
        {searchQuery && CATEGORIES.every((c) => !hasItems(c.id)) && (
          <div className="text-center py-20 bg-[#F4EFE3]/30 rounded-2xl border border-dashed border-[#4C7A2A]/10">
            <p className="font-sans font-bold text-lg text-[#1F2A1A] mb-2">
              "No dishes matched '{searchQuery}'"
            </p>
            <p className="text-sm text-[#6B6358] max-w-xs mx-auto">
              Please check your spelling or search for standard options like tacos, burritos, quesadillas, or horchata!
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-6"
              onClick={() => setSearchQuery('')}
            >
              Clear Search Query
            </Button>
          </div>
        )}
      </div>

      {/* --- OVERLAYS & MODALS FEATURE (Replicating Kronensee Modal System) --- */}
      <AnimatePresence>
        {selectedMenuItem && (
          <div id="menu-overlay-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blurred glass backdrop with smooth fade-in */}
            <motion.div
              className="absolute inset-0 bg-[#1F2A1A]/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMenuItem(null)}
              transition={{ duration: 0.35 }}
            />

            {/* Modal Body Container: scales from 0.95 to 1 with slight upward slide */}
            <motion.div
              id="menu-item-details-modal"
              className="relative bg-[#FBF8F1]/75 backdrop-blur-2xl w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/45 z-10 max-h-[90vh] flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                id="close-menu-modal"
                onClick={() => setSelectedMenuItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#D9352A] text-[#FBF8F1] transition-colors focus:outline-none cursor-pointer shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto overflow-x-hidden p-6 md:p-8 space-y-6">
                {/* Hero Dish Photo */}
                <div className="relative aspect-[16/9] md:aspect-[16/8] rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={selectedMenuItem.image}
                    alt={selectedMenuItem.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-[#FBF8F1]">
                    <span className="font-mono text-[10px] tracking-widest text-[#E8A33D] font-bold uppercase mb-1.5 block">
                      {selectedMenuItem.category.replace('-', ' ')}
                    </span>
                    <h2 className="text-xl md:text-3xl font-sans font-black tracking-tight leading-tight">
                      {selectedMenuItem.name}
                    </h2>
                  </div>
                </div>

                {/* Dish Narrative & Description */}
                <div className="border-b border-[#4C7A2A]/5 pb-6">
                  <h4 className="font-sans font-bold text-xs text-[#4C7A2A] tracking-wider uppercase mb-2">
                    DISH DETAILS
                  </h4>
                  <p className="text-sm md:text-base text-[#6B6358] font-medium leading-relaxed">
                    {selectedMenuItem.description}
                  </p>
                </div>

                {/* Pricing & Size Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#4C7A2A]/5">
                  {/* Base Pricing */}
                  <div>
                    <h4 className="font-sans font-bold text-xs text-[#4C7A2A] tracking-wider uppercase mb-2">
                      PRICE
                    </h4>
                    <div className="text-2xl font-mono font-black text-[#D9352A]">
                      {selectedMenuItem.priceLarge ? (
                        selectedSize === 'sm' ? (
                          `$${selectedMenuItem.price.toFixed(2)} (Small)`
                        ) : (
                          `$${selectedMenuItem.priceLarge.toFixed(2)} (Large)`
                        )
                      ) : (
                        `$${selectedMenuItem.price.toFixed(2)}`
                      )}
                    </div>
                  </div>

                  {/* Size Selector for Aguas Frescas */}
                  {selectedMenuItem.priceLarge && (
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#4C7A2A] tracking-wider uppercase mb-2">
                        CHOOSE SIZE
                      </h4>
                      <div className="flex gap-2.5">
                        <button
                          onClick={() => setSelectedSize('sm')}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedSize === 'sm'
                              ? 'bg-[#4C7A2A] text-[#FBF8F1] border-transparent shadow-sm'
                              : 'bg-transparent text-[#6B6358] border-[#4C7A2A]/20 hover:border-[#4C7A2A]'
                          }`}
                        >
                          Small (16oz)
                        </button>
                        <button
                          onClick={() => setSelectedSize('lg')}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedSize === 'lg'
                              ? 'bg-[#4C7A2A] text-[#FBF8F1] border-transparent shadow-sm'
                              : 'bg-transparent text-[#6B6358] border-[#4C7A2A]/20 hover:border-[#4C7A2A]'
                          }`}
                        >
                          Large (32oz)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Custom Protein options for Tacos / Burritos / Bowls */}
                  {!selectedMenuItem.priceLarge && selectedMenuItem.category !== 'sides' && (
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#4C7A2A] tracking-wider uppercase mb-2">
                        PROTEIN SELECTION
                      </h4>
                      <select
                        value={selectedProtein}
                        onChange={(e) => setSelectedProtein(e.target.value)}
                        className="w-full bg-transparent border border-[#4C7A2A]/20 hover:border-[#4C7A2A] text-sm font-sans font-bold text-[#1F2A1A] rounded-xl px-3.5 py-2.5 outline-none"
                      >
                        <option value="Salty Beef (Cecina)">Cecina (Salty Beef)</option>
                        <option value="Marinated Pork (Al Pastor)">Al Pastor (Marinated Pork)</option>
                        <option value="Chicken (Pollo)">Pollo (Chicken)</option>
                        <option value="Braised Pork (Carnitas)">Carnitas (Pork)</option>
                        <option value="Spiced Sausage (Chorizo)">Chorizo (Mexican Sausage)</option>
                        {selectedMenuItem.category === 'tacos' && (
                          <>
                            <option value="Beef Tripe (Tripas)">Tripas (Crispy Tripe)</option>
                            <option value="Grilled Fish (Pescado)">Pescado (Fish)</option>
                            <option value="Camarón (Shrimp)">Camarón (Shrimp)</option>
                          </>
                        )}
                        <option value="Vegetarian">Vegetarian (Avocado & Cheese)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Salsas Customization Options */}
                {selectedMenuItem.category !== 'sides' && selectedMenuItem.category !== 'drinks' && selectedMenuItem.category !== 'aguas-frescas' && (
                  <div className="pb-4">
                    <h4 className="font-sans font-bold text-xs text-[#4C7A2A] tracking-wider uppercase mb-3">
                      HOUSE SALSA PREFERENCE
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { label: 'Both Green & Red', id: 'both' },
                        { label: 'Green Salsa (Tomatillo)', id: 'green' },
                        { label: 'Red Salsa (Chili Arbol)', id: 'red' },
                        { label: 'No Salsa / On Side', id: 'none' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSalsaOption(opt.id)}
                          className={`px-3 py-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                            salsaOption === opt.id
                              ? 'bg-[#E8A33D] text-[#1F2A1A] border-transparent shadow-sm'
                              : 'bg-[#F4EFE3]/40 text-[#6B6358] border-[#4C7A2A]/10 hover:border-[#4C7A2A]/30'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Action Footer */}
              <div className="bg-[#F4EFE3] p-6 md:p-8 flex items-center justify-between border-t border-[#4C7A2A]/10 rounded-b-3xl">
                {/* Quantity Controls */}
                <div className="flex items-center gap-3.5 bg-[#FBF8F1] px-4 py-2.5 rounded-full border border-[#4C7A2A]/10">
                  <button
                    onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                    className="p-1 rounded-full text-[#6B6358] hover:text-[#D9352A] transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-base text-[#1F2A1A] w-5 text-center">
                    {itemQuantity}
                  </span>
                  <button
                    onClick={() => setItemQuantity(itemQuantity + 1)}
                    className="p-1 rounded-full text-[#6B6358] hover:text-[#4C7A2A] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Order Button */}
                <Button
                  variant={cartSuccess ? 'outline' : 'primary'}
                  size="md"
                  className="px-8 flex-1 sm:flex-initial ml-6 shadow-md"
                  onClick={handleAddToCart}
                  disabled={cartSuccess}
                >
                  {cartSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#4C7A2A]" />
                      Added to Order!
                    </>
                  ) : (
                    `Add ${itemQuantity} to Order`
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
