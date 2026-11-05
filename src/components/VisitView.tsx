import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';
import Button from './ui/Button';

interface VisitViewProps {
  setView: (view: ViewState) => void;
}

export default function VisitView({ setView }: VisitViewProps) {
  // Paced Scroll Reveal Animations
  const fadeInVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const daySchedule = [
    { day: 'Monday', hours: '10:00 AM - 11:00 PM' },
    { day: 'Tuesday', hours: '10:00 AM - 11:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM - 11:00 PM' },
    { day: 'Thursday', hours: '10:00 AM - 11:00 PM' },
    { day: 'Friday', hours: '10:00 AM - Midnight' },
    { day: 'Saturday', hours: '10:00 AM - Midnight' },
    { day: 'Sunday', hours: '10:00 AM - 11:00 PM' },
  ];

  const handleGetDirections = () => {
    window.open('https://maps.google.com/?q=10229+Roosevelt+Rd,+Westchester,+IL+60154', '_blank');
  };

  return (
    <div id="visit-view-wrapper" className="bg-[#FBF8F1] min-h-screen pt-24 pb-32 overflow-x-hidden">
      {/* Visual Header Banner */}
      <div className="relative h-[300px] md:h-[450px] w-full bg-[#1F2A1A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
            alt="Jalapeño Taco Restaurant Exterior / Interior"
            className="w-full h-full object-cover object-center scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF8F1] via-[#1F2A1A]/50 to-[#1F2A1A]/30" />
        </div>

        {/* Hero Overlay Text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-12 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-sans text-sm text-[#E8A33D] font-semibold mb-2.5 block">
              Visit our location
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-sans font-semibold tracking-tight text-[#1F2A1A] leading-none">
              Jalapeño Taco Westchester
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Visit Us Grid Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Physical Address and Contact Details (Left Column) */}
          <motion.div
            className="lg:col-span-7 space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <div>
              <h2 className="text-2xl sm:text-4xl font-sans font-semibold tracking-tight text-[#1F2A1A] mb-4">
                Taste true tradition
              </h2>
              <p className="text-[#6B6358] text-base leading-relaxed font-medium max-w-xl">
                Located on Roosevelt Road in Westchester, Illinois. Drop in for a quick lunch, family dinner, or order late-night pickup directly from our grill to your table.
              </p>
            </div>

            {/* Address Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 glass-panel p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#4C7A2A]/10 text-[#4C7A2A] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-[#1F2A1A]">Location</h4>
                  <p className="text-sm text-[#6B6358] font-medium mt-1.5 leading-relaxed">
                    10229 Roosevelt Rd<br />Westchester, IL 60154
                  </p>
                  <span className="inline-block text-sm font-sans font-semibold text-[#E8A33D] mt-1.5 bg-[#1F2A1A] px-2.5 py-1 rounded">
                    Westchester, IL
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#4C7A2A]/10 text-[#4C7A2A] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-[#1F2A1A]">Phone & enquiries</h4>
                  <a
                    href="tel:+17086529000"
                    className="text-sm font-sans font-semibold text-[#4C7A2A] hover:text-[#D9352A] transition-colors block mt-2"
                  >
                    (708) 652-9000
                  </a>
                  <p className="text-xs text-[#6B6358] font-medium mt-1 leading-relaxed">
                    Call ahead for rapid carryout orders and family packages.
                  </p>
                </div>
              </div>
            </div>

            {/* Directions & Delivery CTA Panel */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleGetDirections}
                className="shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                Get directions on google maps
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setView('menu')}
              >
                <ShoppingBag className="w-4 h-4" />
                Order pickup online
              </Button>
            </div>

            {/* Delivery Partners & Hygiene assurance */}
            <div className="pt-6 border-t border-[#4C7A2A]/5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-sans font-semibold text-[#6B6358]">
                <ShieldCheck className="w-4 h-4 text-[#4C7A2A]" />
                Delivery partners
              </div>
              <div className="flex flex-wrap gap-4 items-center opacity-70">
                {['Uber Eats', 'DoorDash', 'Grubhub', 'Postmates'].map((partner) => (
                  <span
                    key={partner}
                    className="px-4 py-2 bg-transparent border border-[#4C7A2A]/10 rounded-full font-sans text-xs font-semibold text-[#1F2A1A]"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Daily Schedule (Right Column) */}
          <motion.div
            className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-[#E8A33D]" />
              <h3 className="font-sans font-semibold text-xl text-[#1F2A1A]">
                Operating hours
              </h3>
            </div>

            <div className="space-y-4 divide-y divide-[#4C7A2A]/5">
              {daySchedule.map((sched) => (
                <div key={sched.day} className="flex justify-between items-center pt-3.5 first:pt-0">
                  <span className="font-sans font-semibold text-sm text-[#1F2A1A]">{sched.day}</span>
                  <span className="font-sans text-sm font-medium text-[#6B6358]">{sched.hours}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#4C7A2A]/5 bg-[#4C7A2A]/5 p-5 rounded-xl text-center">
              <p className="text-sm font-sans text-[#4C7A2A] font-semibold mb-1">
                Late night GRILLED crusts
              </p>
              <p className="text-xs text-[#6B6358] font-semibold leading-relaxed">
                Enjoy hot, sizzling al pastor, chorizo, and fresh birria until midnight on Fridays and Saturdays!
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Embedded Google Map Block with scroll-triggered fade in */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <motion.div
          id="embedded-fullscreen-map-wrapper"
          className="rounded-2xl overflow-hidden shadow-sm h-[450px] border border-[#4C7A2A]/10 relative group"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Real Embedded Google Map matching coordinate near Westchester, IL */}
          <iframe
            src="https://maps.google.com/maps?q=10229%20Roosevelt%20Rd,%20Westchester,%20IL%2060154&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jalapeno Taco Full Location Map"
          />

          {/* Quick External Map trigger */}
          <div className="absolute top-6 left-6 z-10">
            <button
              onClick={handleGetDirections}
              className="bg-[#FBF8F1] hover:bg-[#4C7A2A] text-[#1F2A1A] hover:text-[#FBF8F1] px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-2 border border-[#4C7A2A]/10 transition-colors cursor-pointer"
            >
              Open in google maps app
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
