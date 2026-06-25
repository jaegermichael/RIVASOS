import React, { useState } from "react";
import { Handshake, ShieldAlert, Award, Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { TESTIMONIALS } from "../data/industrialData";
import { motion, AnimatePresence } from "framer-motion";

export default function WhyChooseUs() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prev = () => {
    setActiveTestimonial(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveTestimonial(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const features = [
    {
      icon: Award,
      title: "Standards Association Alignment",
      desc: "All physical plate structures are calculated and welded in adherence with international dimensional specifications for tension, load, and corrosion resistances."
    },
    {
      icon: Handshake,
      title: "Direct Managing Director Review",
      desc: "Managing Director T Musara oversees major batch configurations personally, ensuring no profile leaves Workington with bending angle errors."
    },
    {
      icon: ShieldAlert,
      title: "Harare Local Stock Fast Dispatch",
      desc: "We maintain heavy stockpiles of standard galvanized iron, black mild steel plate, and structural tubing right here in Workington, reducing lead times."
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background visual watermarks */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left half: Feature columns */}
          <div className="lg:col-span-7 space-y-8 font-sans">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="h-[2px] w-8 bg-industrial-orange"></span>
                <span className="font-mono text-xs text-industrial-orange uppercase tracking-widest font-bold">WORKSHOP ADVANTAGE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 uppercase tracking-tight">
                WHY CONTRACTORS CHOOSE <br />
                <span className="text-industrial-orange">RIVASOS ENTERPRISES</span>
              </h2>
              <p className="text-xs text-slate-500 max-w-lg">
                We design, process, and erect structural creations under high-precision engineering benchmarks, providing Zimbabwean builders with total accountability.
              </p>
            </div>

            {/* Core Features list layout */}
            <div className="space-y-6">
              {features.map((feat, index) => {
                const IconComponent = feat.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex items-start space-x-4 bg-slate-50 border border-slate-200 p-5 hover:border-industrial-orange/30 hover:shadow-sm transition-all"
                  >
                    <div className="p-2.5 bg-white border border-slate-200 text-industrial-orange shrink-0">
                       <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-md uppercase font-bold text-slate-900 tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right half: Heavy Testimonial Slider Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-[#111a26] border border-slate-700 p-6 md:p-8 rounded-none shadow-2xl overflow-hidden min-h-[350px] flex flex-col justify-between">
              
              {/* Giant orange citation icon */}
              <div className="absolute -top-4 -left-4 font-serif text-industrial-orange/15 font-bold text-[180px] leading-none pointer-events-none select-none">
                “
              </div>

              {/* Slider Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 relative z-10">
                <span className="font-mono text-xs text-slate-400 uppercase font-semibold">VERIFIED HARARE PARTNER</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-industrial-orange text-industrial-orange" />
                  ))}
                </div>
              </div>

              {/* Slider Content */}
              <div className="my-6 relative z-10 flex-1 flex flex-col justify-center">
                <Quote className="w-8 h-8 text-industrial-orange/30 mb-3 shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic font-sans">
                      "{TESTIMONIALS[activeTestimonial].quote}"
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-slate-800">
                      <h4 className="font-sans font-bold text-white uppercase text-xs tracking-wide">
                        {TESTIMONIALS[activeTestimonial].name}
                      </h4>
                      <p className="text-[10px] font-mono text-industrial-orange uppercase font-semibold">
                        {TESTIMONIALS[activeTestimonial].role} • {TESTIMONIALS[activeTestimonial].company}
                      </p>
                      <span className="inline-block mt-2 font-mono text-[9px] bg-slate-950 p-1 text-industrial-steel border border-slate-800 uppercase">
                        Project: {TESTIMONIALS[activeTestimonial].project}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Buttons Controls */}
              <div className="flex justify-between items-center relative z-10 pt-4 border-t border-slate-800">
                <span className="font-mono text-[10px] text-industrial-steel">
                  Ledger Record 0{activeTestimonial + 1} of 0{TESTIMONIALS.length}
                </span>

                <div className="flex space-x-2">
                  <button
                    onClick={prev}
                    className="p-1.5 text-industrial-steel hover:text-white bg-slate-950 border border-slate-800 rounded-none hover:border-industrial-orange cursor-pointer transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={next}
                    className="p-1.5 text-industrial-steel hover:text-white bg-slate-950 border border-slate-800 rounded-none hover:border-industrial-orange cursor-pointer transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
