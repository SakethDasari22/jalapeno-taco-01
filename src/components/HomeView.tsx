import { motion } from 'motion/react';
import { ArrowRight, MapPin, Clock, Phone, ChevronRight, Sparkles } from 'lucide-react';
import { ViewState, MenuItem } from '../types';
import { FEATURED_ITEMS } from '../data/menu';
import Hero from './Hero';
import Button from './ui/Button';

interface HomeViewProps {
  setView: (view: ViewState) => void;
  setSelectedMenuItem: (item: MenuItem | null) => void;
}

export default function HomeView({ setView, setSelectedMenuItem }: HomeViewProps) {
  // Common scroll reveal variant
  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const handleFeaturedItemClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setView('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-view-wrapper" className="bg-[#FBF8F1] text-[#1F2A1A] overflow-x-hidden">
      {/* Hero Header */}
      <Hero setView={setView} />

      {/* --- OUR STORY SECTION --- */}
      <section id="our-story-section" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#4C7A2A]/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Narrative Block */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
          >
            <div className="flex items-center gap-2 mb-4 font-mono text-xs tracking-widest text-[#E8A33D] font-bold uppercase">
              <Sparkles className="w-4 h-4 text-[#D9352A]" />
              Generations of Flavor
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-[#1F2A1A] leading-tight mb-8">
              Born in Michoacán, Perfected in <span className="text-[#4C7A2A]">Westchester</span>
            </h2>
            <div className="space-y-6 text-[#6B6358] font-sans text-base leading-relaxed font-medium">
              <p>
                From our family’s original cast-iron planchas to the bustling corner of Roosevelt Road, Jalapeño Taco represents a lifelong commitment to authentic Mexican street food. 
              </p>
              <p>
                We do not cut corners. Our corn tortillas are pressed fresh daily, our salsas are simmered with roasted jalapeños and traditional cotija cheese, and our meats are slow-marinated for twenty-four hours in our family secret citrus-adobo blend.
              </p>
              <p className="text-sm font-mono italic text-[#4C7A2A] border-l-2 border-[#E8A33D] pl-4">
                "Our grandfather used to tell us: a great taco is a hand-made memory. That is the promise we grill into every single order."
              </p>
            </div>

            <div className="mt-10">
              <Button
                variant="primary"
                onClick={() => setView('visit')}
              >
                Our Location & Hours
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Story Visual Imagery (Overlap Layout) */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Parallax-style background accent card */}
            <div className="absolute inset-0 bg-[#F4EFE3] rounded-3xl -rotate-2 transform scale-105 -z-10" />

            {/* Main Image Frame with Zoom-on-Scroll Interaction */}
            <div className="overflow-hidden rounded-2xl shadow-xl border border-[#4C7A2A]/5 aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80"
                alt="Our Street Tacos Platter"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Smaller secondary floating image */}
            <motion.div
              className="absolute -bottom-8 -left-8 w-1/2 rounded-xl overflow-hidden shadow-2xl border-4 border-[#FBF8F1] aspect-square hidden sm:block group"
              whileInView={{ y: [20, -10] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80"
                alt="Griddling Quesadillas"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Badge */}
            <div className="absolute -top-6 -right-6 bg-[#D9352A] text-[#FBF8F1] p-5 rounded-full shadow-lg font-sans font-black tracking-tight text-center text-xs flex flex-col justify-center items-center h-20 w-20 leading-tight">
              <span>100%</span>
              <span>HECHO</span>
              <span>A MANO</span>
            </div>

            {/* Overlay Float (Frosted Glass Style Signature Card) */}
            <div className="absolute -bottom-6 -right-6 hidden xl:block w-72 bg-white/40 backdrop-blur-xl border border-white/40 p-6 rounded-3xl z-20 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#D9352A] text-white px-2 py-0.5 rounded">Signature Dish</span>
                <span className="text-[#E8A33D] font-bold text-sm">$14.95</span>
              </div>
              <p className="font-bold text-base leading-tight text-[#1F2A1A] mb-1">Quesabirrias Dinner</p>
              <p className="text-xs text-[#6B6358] mb-4">Three crispy corn tortillas folded with melted cheese & tender beef birria, served with consomé broth.</p>
              <button 
                onClick={() => {
                  setSelectedMenuItem({
                    id: 'd-quesabirrias',
                    name: 'Quesabirrias Dinner',
                    price: 14.95,
                    description: 'Three crispy corn tortillas folded with melted cheese and slow-stewed tender beef birria, served with rich consomé broth for dipping, onion, cilantro, rice, and beans.',
                    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80',
                    category: 'dinners'
                  });
                  setView('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-[#1F2A1A] hover:bg-[#4C7A2A] text-[#FBF8F1] rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02] cursor-pointer"
              >
                View Ingredients & Order
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- FEATURED DISHES SECTION --- */}
      <section id="featured-dishes-section" className="py-24 md:py-32 bg-[#F4EFE3]/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <span className="font-mono text-xs tracking-widest text-[#4C7A2A] font-bold uppercase mb-3 block">
                Signature Plates
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-[#1F2A1A]">
                The Neighborhood Favorites
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  setView('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                View Full Menu
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Staggered Grid of Featured Items with Replicated Kronensee Hover Interactions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {FEATURED_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                id={`featured-card-${item.id}`}
                variants={revealVariants}
                className="glass-panel rounded-3xl p-5 shadow-sm transition-all duration-500 cursor-pointer flex flex-col justify-between group"
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: '0 20px 40px rgba(76, 122, 42, 0.08)'
                }}
                onClick={() => handleFeaturedItemClick(item)}
              >
                <div>
                  {/* Card Image Frame with Zoom Effect */}
                  <div className="overflow-hidden rounded-xl aspect-[4/3] bg-[#1F2A1A]/10 mb-5 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#D9352A] text-[#FBF8F1] font-mono text-xs font-bold px-2.5 py-1 rounded-full">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Category */}
                  <span className="text-[10px] font-mono tracking-wider text-[#E8A33D] font-bold uppercase mb-1.5 block">
                    {item.category.replace('-', ' ')}
                  </span>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-lg text-[#1F2A1A] group-hover:text-[#4C7A2A] transition-colors mb-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#6B6358] font-medium leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Card CTA Link */}
                <div className="flex items-center justify-between text-xs font-semibold text-[#4C7A2A] border-t border-[#4C7A2A]/5 pt-4">
                  <span>Quick View & Customize</span>
                  <div className="w-6 h-6 rounded-full bg-[#4C7A2A]/10 flex items-center justify-center group-hover:bg-[#4C7A2A] group-hover:text-[#FBF8F1] transition-colors duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- VISIT US TEASER SECTION --- */}
      <section id="visit-teaser-section" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-[#1F2A1A] rounded-3xl overflow-hidden shadow-2xl relative grid grid-cols-1 lg:grid-cols-12">
          
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(232,163,61,0.06)_0%,transparent_60%)] pointer-events-none" />

          {/* Details column */}
          <motion.div
            className="p-10 sm:p-14 lg:col-span-6 flex flex-col justify-between text-[#FBF8F1] relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <div>
              <span className="font-mono text-xs tracking-widest text-[#E8A33D] font-bold uppercase mb-4 block">
                Come Eat With Us
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight mb-8">
                Drop By The <span className="text-[#4C7A2A]">Taqueria</span>
              </h2>

              {/* Hours & Contact */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#4C7A2A]/20 flex items-center justify-center text-[#4C7A2A] flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#E8A33D] tracking-wide">ADDRESS</h4>
                    <p className="text-[#F4EFE3]/80 text-sm mt-1">10229 Roosevelt Rd, Westchester, IL 60154</p>
                    <p className="text-xs text-[#F4EFE3]/50 mt-0.5">Conveniently serving Westchester & surrounding area</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#4C7A2A]/20 flex items-center justify-center text-[#4C7A2A] flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#E8A33D] tracking-wide">HOURS</h4>
                    <p className="text-[#F4EFE3]/80 text-sm mt-1">Monday - Sunday: 10:00 AM - 11:00 PM</p>
                    <p className="text-xs text-[#F4EFE3]/50 mt-0.5">Dine-In, Pickup & delivery are open daily</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#4C7A2A]/20 flex items-center justify-center text-[#4C7A2A] flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#E8A33D] tracking-wide">CALL US</h4>
                    <a href="tel:+17086529000" className="text-[#F4EFE3]/80 text-sm hover:text-[#4C7A2A] transition-colors block mt-1">
                      (708) 652-9000
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                onClick={() => setView('visit')}
                className="w-full sm:w-auto"
              >
                Directions & Info
              </Button>
              <Button
                variant="outline"
                className="border-[#FBF8F1]/20 text-[#FBF8F1] hover:bg-[#FBF8F1]/10 w-full sm:w-auto"
                onClick={() => setView('contact')}
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>

          {/* Styled Abstract Map Preview (Replicating high-end design blocks) */}
          <motion.div
            className="lg:col-span-6 relative min-h-[350px] lg:min-h-auto bg-[#1a2316] overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Embedded Google Maps iFrame styled beautifully with custom dark elements around it */}
            <iframe
              src="https://maps.google.com/maps?q=10229%20Roosevelt%20Rd,%20Westchester,%20IL%2060154&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 absolute inset-0 opacity-80 invert filter hue-rotate-60 brightness-90 saturate-50"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jalapeno Taco Map Location"
            />
            {/* Absolute overlay badge with coordinates */}
            <div className="absolute bottom-6 right-6 bg-[#4C7A2A] text-[#FBF8F1] px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest shadow-xl border border-[#FBF8F1]/10 z-20">
              📍 Westchester, IL (41.8511, -87.8837)
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
