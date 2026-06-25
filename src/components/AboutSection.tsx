import React from "react";
import { Shield, Hammer, MapPin, Award, User, PhoneCall, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY_DETAILS, TRUST_METRICS } from "../data/industrialData";

interface AboutSectionProps {
  onLearnMoreServices: () => void;
}

export default function AboutSection({ onLearnMoreServices }: AboutSectionProps) {
  // Directly referencing our custom-generated headshot of T Musara MD
  const mdAvatarUrl = "/src/assets/images/t_musara_director_1781966245270.jpg";

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-white text-slate-800">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 steel-grid opacity-10 pointer-events-none"></div>
      
      {/* Visual steel corner shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-industrial-orange/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Layout: Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Narrative & Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="h-[2px] w-8 bg-industrial-orange"></span>
                <span className="font-mono text-xs text-industrial-orange uppercase tracking-widest font-bold">FOUNDED 2013 • HARARE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 uppercase tracking-tight">
                PROVEN IN METALS. <br />
                <span className="text-industrial-orange">TRUSTED IN PRECISION.</span>
              </h2>
            </div>

            <p className="text-slate-700 leading-relaxed text-sm md:text-md">
              Rivasos Enterprises Pvt Ltd has positioned itself as Harare's benchmark sheet metal processing and fabrication partner. Operative since 2013 from our heavy engineering workshop in Workington, we specialize in high-capacity slicing, computerized bending, robust architectural doors frames, and bespoke blacksmithing assemblies.
            </p>

            <p className="text-slate-500 leading-relaxed text-xs md:text-sm font-sans">
              Guided by a vision of manufacturing excellence on home soil, Rivasos bridges raw chemical metal elements and custom physical structures, supporting Zimbabwe's residential builders, factory owners, and civil engineering conglomerates with uncompromising turnarounds.
            </p>

            {/* Core Trust Drivers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-industrial-orange/10 border border-industrial-orange/30 text-industrial-orange">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wide">Heavy Gauge Structural Integrity</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We strictly process prime structural steel grades, minimizing sag and failure.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-industrial-light-blue/10 border border-industrial-light-blue/20 text-industrial-light-blue">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wide">Accredited Trade Standards</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Manufacturing conforms with regional structural standards for civil works.</p>
                </div>
              </div>
            </div>

            {/* CTA action trigger scroll */}
            <div className="pt-4 flex items-center space-x-4">
              <button
                onClick={onLearnMoreServices}
                className="bg-industrial-blue hover:bg-industrial-light-blue/80 border border-industrial-steel/40 text-white font-sans text-xs font-semibold uppercase tracking-wider py-3 px-6 transition-all cursor-pointer"
              >
                Explore Active Capabilities
              </button>
              <a
                href="#contact"
                className="text-xs uppercase font-mono font-bold text-industrial-orange hover:text-industrial-light-blue flex items-center space-x-1 hover:underline"
              >
                <span>Find workington offices</span>
                <span>→</span>
              </a>
            </div>

          </motion.div>

          {/* Right Block: MD Professional Profile Layout with Custom Generated Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Geometric industrial border offset */}
            <div className="absolute -inset-4 border border-dashed border-slate-300 pointer-events-none transform translate-x-2 translate-y-2"></div>
            
            {/* Main Profile Canvas Box */}
            <div className="relative bg-industrial-dark border border-industrial-steel/20 p-5 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-linear-to-bl from-industrial-orange/30 to-transparent pointer-events-none"></div>

              {/* MD portrait using generated photo */}
              <div className="relative aspect-square w-full bg-slate-950 border border-industrial-steel/20 mb-5 overflow-hidden">
                <img 
                  src={mdAvatarUrl}
                  alt="T Musara Managing Director Rivasos Enterprises"
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 hover:grayscale-0 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge */}
                <div className="absolute bottom-0 left-0 bg-industrial-orange text-white py-1 px-3 font-mono text-[9px] uppercase font-bold tracking-widest leading-none">
                  LEADER CAPACITY • 25+ YRS IN METALS
                </div>
              </div>

              {/* Narrative & Phone Hooks */}
              <div className="space-y-3 font-sans">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{COMPANY_DETAILS.mdName}</h3>
                  <p className="text-xs font-mono text-industrial-orange uppercase font-semibold leading-none">{COMPANY_DETAILS.mdRole}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "At Rivasos, precision isn't just an asset metric — it is the core of our daily workshop sheet strike. We turn raw structural sheet grades into the protective gates and frames that host Zimbabwean lives. Feel welcome to reach out to me directly."
                </p>

                {/* Direct quick contact links */}
                <div className="p-3.5 bg-slate-900 border border-industrial-steel/10 space-y-2">
                  <span className="text-[9px] font-mono text-industrial-steel block uppercase tracking-wider">DIRECT HOTLINE CONTACTS</span>
                  <div className="font-mono text-xs space-y-1">
                    <a href={`tel:${COMPANY_DETAILS.hotline1}`} className="flex items-center space-x-2 text-white hover:text-industrial-orange transition-colors">
                      <PhoneCall className="w-3.5 h-3.5 text-industrial-orange" />
                      <span>{COMPANY_DETAILS.hotline1} (WhatsApp)</span>
                    </a>
                    <a href={`tel:${COMPANY_DETAILS.hotline2}`} className="flex items-center space-x-2 text-white hover:text-industrial-orange transition-colors">
                      <PhoneCall className="w-3.5 h-3.5 text-industrial-steel" />
                      <span>{COMPANY_DETAILS.hotline2}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Counter Trust Section below About block */}
        <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_METRICS.map((metric, index) => (
            <motion.div 
              key={metric.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-55 border border-slate-200 p-5 text-center relative overflow-hidden group hover:border-industrial-orange/30 transition-all bg-slate-50"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-industrial-blue group-hover:bg-industrial-orange transition-colors"></div>
              <span className="font-mono text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight uppercase block">
                {metric.value}
              </span>
              <span className="text-[10px] sm:text-xs font-sans text-slate-500 uppercase block tracking-wider mt-1.5 font-medium leading-tight">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
