import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Check, Send, Sparkles, AlertCircle } from 'lucide-react';
import Button from './ui/Button';

export default function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!form.name || !form.email || !form.message) {
      setValidationError('Please complete all fields before sending your message.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  // Label animation state check helper
  const isFloating = (field: 'name' | 'email' | 'message') => {
    return focusedField === field || !!form[field];
  };

  return (
    <div id="contact-view-wrapper" className="bg-[#FBF8F1] min-h-screen pt-24 pb-32 overflow-x-hidden">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 text-center">
        <span className="font-mono text-xs text-[#4C7A2A] font-bold tracking-widest uppercase mb-2.5 block">
          REACH OUT TO JALAPEÑO TACO
        </span>
        <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-[#1F2A1A] leading-none mb-6">
          Connect With Our Team
        </h1>
        <p className="text-sm md:text-base text-[#6B6358] max-w-lg mx-auto leading-relaxed font-medium">
          Have an event, feedback on our tacos, or inquiry about bulk ordering? Send us a message and we will respond as fast as we grill!
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Contact Details & Info (Left Column) */}
          <motion.div
            className="lg:col-span-5 space-y-8 glass-panel p-8 sm:p-10 rounded-3xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-wider text-[#E8A33D] font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D9352A]" />
                DIRECT CHANNELS
              </div>
              <h2 className="text-2xl font-sans font-black tracking-tight text-[#1F2A1A]">
                Get In Touch Today
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4C7A2A]/10 text-[#4C7A2A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#E8A33D] tracking-wide uppercase">Call Us</h4>
                  <a
                    href="tel:+17086529000"
                    className="text-sm font-mono font-bold text-[#1F2A1A] hover:text-[#4C7A2A] transition-colors mt-1 block"
                  >
                    (708) 652-9000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4C7A2A]/10 text-[#4C7A2A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#E8A33D] tracking-wide uppercase">Email Address</h4>
                  <a
                    href="mailto:hola@jalapenotacowestchester.com"
                    className="text-sm font-mono font-bold text-[#1F2A1A] hover:text-[#4C7A2A] transition-colors mt-1 block"
                  >
                    hola@jalapenotacowestchester.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4C7A2A]/10 text-[#4C7A2A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#E8A33D] tracking-wide uppercase">Address Location</h4>
                  <p className="text-sm text-[#6B6358] font-semibold mt-1">
                    10229 Roosevelt Rd, Westchester, IL 60154
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Map embed widget */}
            <div className="h-44 rounded-xl overflow-hidden shadow-inner border border-[#4C7A2A]/10 relative">
              <iframe
                src="https://maps.google.com/maps?q=10229%20Roosevelt%20Rd,%20Westchester,%20IL%2060154&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0 opacity-80 invert filter hue-rotate-60 brightness-90 saturate-50"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                title="Contact Mini Map"
              />
            </div>
          </motion.div>

          {/* Form Area with Floating Labels (Right Column) */}
          <motion.div
            className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Name input */}
              <div className="relative">
                <input
                  type="text"
                  id="contact-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={`w-full bg-transparent border-b-2 py-3 px-1 pt-6 text-sm font-semibold tracking-wide outline-none transition-colors duration-300 ${
                    focusedField === 'name' ? 'border-[#D9352A] text-[#1F2A1A]' : 'border-[#4C7A2A]/20 text-[#1F2A1A]'
                  }`}
                  disabled={isSubmitting || isSubmitted}
                />
                <label
                  htmlFor="contact-name"
                  className={`absolute left-1 transition-all duration-300 pointer-events-none select-none ${
                    isFloating('name')
                      ? 'top-1 text-[10px] text-[#D9352A] font-bold font-mono tracking-widest uppercase'
                      : 'top-5 text-sm font-semibold text-[#6B6358]'
                  }`}
                >
                  Your Full Name
                </label>
              </div>

              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  id="contact-email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={`w-full bg-transparent border-b-2 py-3 px-1 pt-6 text-sm font-semibold tracking-wide outline-none transition-colors duration-300 ${
                    focusedField === 'email' ? 'border-[#D9352A] text-[#1F2A1A]' : 'border-[#4C7A2A]/20 text-[#1F2A1A]'
                  }`}
                  disabled={isSubmitting || isSubmitted}
                />
                <label
                  htmlFor="contact-email"
                  className={`absolute left-1 transition-all duration-300 pointer-events-none select-none ${
                    isFloating('email')
                      ? 'top-1 text-[10px] text-[#D9352A] font-bold font-mono tracking-widest uppercase'
                      : 'top-5 text-sm font-semibold text-[#6B6358]'
                  }`}
                >
                  Email Address
                </label>
              </div>

              {/* Message Input */}
              <div className="relative">
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  className={`w-full bg-transparent border-b-2 py-3 px-1 pt-6 text-sm font-semibold tracking-wide outline-none transition-colors duration-300 resize-none ${
                    focusedField === 'message' ? 'border-[#D9352A] text-[#1F2A1A]' : 'border-[#4C7A2A]/20 text-[#1F2A1A]'
                  }`}
                  disabled={isSubmitting || isSubmitted}
                />
                <label
                  htmlFor="contact-message"
                  className={`absolute left-1 transition-all duration-300 pointer-events-none select-none ${
                    isFloating('message')
                      ? 'top-1 text-[10px] text-[#D9352A] font-bold font-mono tracking-widest uppercase'
                      : 'top-5 text-sm font-semibold text-[#6B6358]'
                  }`}
                >
                  Write Your Message
                </label>
              </div>

              {/* Validation errors indicator */}
              <AnimatePresence>
                {validationError && (
                  <motion.div
                    className="flex items-center gap-2 bg-[#D9352A]/5 border border-[#D9352A]/20 rounded-xl p-4 text-xs font-semibold text-[#D9352A]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{validationError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Container with Morphing Button Micro-animation */}
              <div className="flex justify-start pt-4 h-16 relative">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="submit-button"
                      className="w-full sm:w-auto"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-[#FBF8F1] border-t-transparent animate-spin mr-1" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-badge"
                      className="flex items-center gap-3 bg-[#4C7A2A] text-[#FBF8F1] px-6 py-3 rounded-full shadow-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#FBF8F1]" />
                      </div>
                      <span className="font-sans font-bold text-sm tracking-wide">
                        Message Sent Successfully! Hola!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
