import React, { useState, useEffect } from "react";
import { ArrowRight, Hammer, Settings, Phone, CheckCircle, ShieldCheck, FileText, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ServicesGrid from "./components/ServicesGrid";
import ServiceModal from "./components/ServiceModal";
import ProcessSection from "./components/ProcessSection";
import GalleryShowcase from "./components/GalleryShowcase";
import WhyChooseUs from "./components/WhyChooseUs";
import QuoteCalculator from "./components/QuoteCalculator";
import QuoteList from "./components/QuoteList";
import FooterSection from "./components/FooterSection";
import ContactSection from "./components/ContactSection";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { Service } from "./types";
import { COMPANY_DETAILS } from "./data/industrialData";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [calculatorServiceId, setCalculatorServiceId] = useState("");
  const [quoteTrigger, setQuoteTrigger] = useState(0);

  // Auto detect active section based on scroll offset to update Navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "process", "gallery", "quote", "contact"];
      const scrollPosition = window.scrollY + 150; // offset for sticky header

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLearnMoreServices = () => {
    const el = document.getElementById("services");
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 85,
        behavior: "smooth",
      });
    }
  };

  const handleQuickLoadToCalculator = (serviceId: string) => {
    setCalculatorServiceId(serviceId);
  };

  const handleQuoteSubmitted = () => {
    // Increment quoteTrigger state to let QuoteList component refresh localStorage array
    setQuoteTrigger((prev) => prev + 1);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 85,
        behavior: "smooth",
      });
    }
  };

  // Direct reference to prime custom generated factory hero photo
  const heroBackdropUrl = "/images/hero_fabrication_harare_1781966200274.jpg";

  return (
    <div className="bg-industrial-dark text-white min-h-screen relative font-sans selection:bg-industrial-orange selection:text-white">
      {/* Structural Utility Lines overlapping slightly like blueprint layers */}
      <div className="absolute inset-y-0 left-6 md:left-12 w-px bg-white/5 pointer-events-none z-10 hidden sm:block"></div>
      <div className="absolute inset-y-0 right-6 md:right-12 w-px bg-white/5 pointer-events-none z-10 hidden sm:block"></div>

      {/* Sticky Top Header Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* 1. HERO BANNER - Precision Sheet Metal Fabrication in Harare */}
      <section 
        id="home" 
        className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden md:py-28"
      >
        {/* Full screen wide industrial factory ambient image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackdropUrl}
            alt="Sheet Metal Bending Workshop Harare"
            className="w-full h-full object-cover scale-100 filter brightness-[0.25]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle industrial blueprint scan animation line */}
          <div className="absolute inset-0 bg-gradient-to-b from-industrial-orange/5 via-indigo-500/0 to-transparent pointer-events-none opacity-20"></div>
          
          {/* Custom Blueprint grid overlay */}
          <div className="absolute inset-0 blueprint-grid opacity-15"></div>

          {/* Solid color gradient overlays to fade out margins */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-industrial-dark to-transparent"></div>
        </div>

        {/* Hero Content Canvas */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-center md:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 md:pt-12">
            
            <div className="lg:col-span-8 space-y-6">
              
              {/* Dynamic Harare Badge markup */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2.5 bg-industrial-blue/80 border border-industrial-steel/35 py-1.5 px-3 backdrop-blur-md rounded-none shadow-lg"
              >
                <span className="w-2 h-2 bg-industrial-orange rounded-full animate-ping"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-industrial-steel">
                  Certified Workington Plant, Harare, Zimbabwe
                </span>
              </motion.div>

              {/* Massive Industrial Headline */}
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold uppercase tracking-tight text-white leading-none"
              >
                Precision Sheet <br className="hidden md:block"/>
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-industrial-orange via-yellow-500 to-white">Metal Fabrication</span> <br />
                in Harare
              </motion.h1>

              {/* High-Contrast Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-300 text-sm md:text-md font-sans max-w-2xl leading-relaxed"
              >
                {COMPANY_DETAILS.name} delivers high-capacity motorized shearing, computer-guided press bending, robust door frames, security gates, and fascia flashings. Engineered for domestic builders and heavy industrial contractors with <strong>same-day dispatch limits</strong>.
              </motion.p>

              {/* CTAs triggers */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start pt-2"
              >
                <button
                  onClick={() => handleScrollToSection("quote")}
                  className="w-full sm:w-auto bg-gradient-to-r from-industrial-orange to-red-600 hover:from-industrial-orange hover:to-orange-500 text-white font-sans text-xs font-bold uppercase tracking-widest py-4 px-8 shadow-2xl transition-all cursor-pointer border-b-2 border-red-800 active:translate-y-[1px]"
                >
                  Launch Weight Estimator
                </button>

                <button
                  onClick={handleLearnMoreServices}
                  className="w-full sm:w-auto bg-industrial-blue hover:bg-industrial-light-blue/70 border border-industrial-steel/40 text-white font-sans text-xs font-semibold uppercase tracking-wider py-4 px-8 transition-colors cursor-pointer"
                >
                  Explore Capabilities Specs
                </button>
              </motion.div>

              {/* Double-checked assurance badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-6 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-3 justify-center md:justify-start text-xs font-mono text-industrial-steel font-medium"
              >
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-industrial-orange" />
                  <span>120T Bending Brake Station</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4.5 h-4.5 text-green-400" />
                  <span>±0.1° Forming Precision Guarantee</span>
                </div>
              </motion.div>

            </div>

            {/* Right Quick Metric Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-4 block font-mono text-xs text-industrial-steel"
            >
              <div className="bg-[#122335]/70 border-l-2 border-industrial-orange p-6 backdrop-blur-md space-y-4 shadow-2xl">
                <span className="text-[10px] text-industrial-orange block uppercase font-bold tracking-widest">WORKSHOP LEDGER FEED</span>
                
                <div className="space-y-3">
                  <div className="border-b border-white/5 pb-2">
                    <span className="block text-[9px] text-[#4fc3f7] uppercase">CO2 MIG Welding Sets</span>
                    <strong className="text-white block">8 Working Stations Active</strong>
                  </div>
                  
                  <div className="border-b border-white/5 pb-2">
                    <span className="block text-[9px] text-[#4fc3f7] uppercase">Guillotine Workspace Limit</span>
                    <strong className="text-white block">3000 mm sheet width contiguous</strong>
                  </div>

                  <div>
                    <span className="block text-[9px] text-[#4fc3f7] uppercase">Trade Authorization</span>
                    <strong className="text-white block">SAZ & SABS steel standards compliance</strong>
                  </div>
                </div>

                <div className="text-[10px] text-gray-300">
                  Registered physical plant open to contractors: <strong>15 Bristol Rd, Workington, Harare</strong>.
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Floating bottom arrow down */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-20" onClick={handleLearnMoreServices}>
          <span className="font-mono text-[9px] uppercase tracking-widest text-industrial-steel mb-1">Scroll to services</span>
          <ChevronDown className="w-5 h-5 text-industrial-orange animate-bounce" />
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <AboutSection onLearnMoreServices={handleLearnMoreServices} />

      {/* 3. CORE SERVICES BENTO GRID */}
      <ServicesGrid 
        onSelectService={(service) => setSelectedService(service)}
        onQuickLoadToCalculator={handleQuickLoadToCalculator}
      />

      {/* 4. PRECISION PROCESS TIMELINE */}
      <ProcessSection />

      {/* 5. PORTFOLIO SHOWCASE */}
      <GalleryShowcase />

      {/* 6. TESTIMONIALS & TRUST SECTION */}
      <WhyChooseUs />

      {/* 7. DUAL BLOCK: DIRECT QUOTE ESTIMATOR & LOG REGISTER */}
      <section id="quote" className="py-20 relative bg-[#121c2a]">
        <div className="absolute inset-0 steel-grid opacity-5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Heavy duty calculator */}
            <div className="xl:col-span-8">
              <QuoteCalculator 
                selectedServiceId={calculatorServiceId} 
                onQuoteSubmitted={handleQuoteSubmitted}
              />
            </div>

            {/* Right side: Browser history of submitted calculations */}
            <div className="xl:col-span-4 bg-industrial-dark border border-industrial-steel/20 p-6 md:p-8">
              <div className="space-y-2 mb-6">
                <h3 className="text-md md:text-lg uppercase font-bold text-white tracking-tight flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-industrial-orange" />
                  <span>My Active Ledger Registry</span>
                </h3>
                <p className="text-xs text-industrial-steel font-sans leading-relaxed">
                  Pre-compiled quote inquires recorded during your current active session on this terminal. Manage and followup direct over WhatsApp.
                </p>
              </div>

              <QuoteList updateTrigger={quoteTrigger} />
            </div>

          </div>

        </div>
      </section>

      {/* 8. CONTACT COORDINATES & GEOMETRIC LOCATION SECTION */}
      <ContactSection />

      {/* FOOTER SITE MAP AND UTILITY CHANNELS */}
      <FooterSection />

      {/* FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />

      {/* RENDERED EXPANDED SERVICE DETAIL SPEC PORTALS */}
      {selectedService && (
        <ServiceModal 
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onLoadToCalculator={handleQuickLoadToCalculator}
        />
      )}
    </div>
  );
}
