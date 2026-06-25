import React, { useState } from "react";
import * as Lucide from "lucide-react";
import { SERVICES_DATA } from "../data/industrialData";
import { Service } from "../types";
import { motion } from "framer-motion";

interface ServicesGridProps {
  onSelectService: (service: Service) => void;
  onQuickLoadToCalculator: (serviceId: string) => void;
}

// Resilient icon resolver to avoid crashes with dynamic names
const resolveIcon = (name: string) => {
  const IconComponent = (Lucide as any)[name];
  if (IconComponent) {
    return <IconComponent className="w-6 h-6 shrink-0 text-industrial-orange transition-transform group-hover:scale-110" />;
  }
  // Safe Fallback
  return <Lucide.Wrench className="w-6 h-6 shrink-0 text-industrial-orange" />;
};

export default function ServicesGrid({ onSelectService, onQuickLoadToCalculator }: ServicesGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="services" className="py-20 relative bg-industrial-dark">
      {/* Absolute blueprint backdrop lines */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-industrial-steel/10 pb-6 mb-12"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="h-[2px] w-8 bg-industrial-orange"></span>
              <span className="font-mono text-xs text-industrial-orange uppercase tracking-widest font-bold">PRODUCTION AND PROCESSING CAPACITY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white uppercase tracking-tight">
              CORE SHEET METAL SERVICES
            </h2>
            <p className="text-xs text-industrial-steel mt-1 font-sans max-w-xl">
              Equipped with high-tonnage folders and rapid linear shearers, Rivasos processes plates up to 8.0mm thickness with tight geometric tolerances under certified standards.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="text-[10px] uppercase font-mono text-industrial-steel block tracking-wider text-right">EQUIPMENT POWER INDEX</span>
            <span className="font-mono text-xs text-white font-bold block mt-1 py-1 px-3 bg-industrial-blue/40 border border-industrial-steel/20">
              120T Max Bending • 6.0mm Max Shearing
            </span>
          </div>
        </motion.div>

        {/* Services Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {SERVICES_DATA.map((service, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="bg-gradient-to-b from-[#131d2a] to-[#0f141d] border border-industrial-steel/15 shadow-xl relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-industrial-orange/40"
              >
                {/* Yellow/Orange Diagonal Corner Accent on Hover */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-industrial-orange to-transparent opacity-10 transition-all duration-350 pointer-events-none ${isHovered ? "scale-125" : "scale-0"}`}></div>
                
                {/* Top thin line indicator mapping to orange or blue */}
                <div className={`h-1.5 w-full transition-all duration-300 ${isHovered ? "bg-industrial-orange" : "bg-industrial-light-blue"}`}></div>

                {/* Card Content body */}
                <div className="p-6 space-y-4 flex-1">
                  
                  {/* Icon Block */}
                  <div className="flex items-center space-x-3.5">
                    <div className="p-2.5 bg-industrial-dark/80 border border-industrial-steel/10">
                      {resolveIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-[9px] text-industrial-steel shrink-0 tracking-wider">
                      CAPACITY SCALE: {service.id === "guillotine-cutting" || service.id === "press-bending" ? "EXTREME" : "HEAVY"}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-md md:text-lg font-bold text-white uppercase tracking-tight group-hover:text-industrial-orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-2 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Technical quick spec specs drawer */}
                  <div className="bg-industrial-dark/40 p-2.5 py-3 border border-industrial-steel/10 mt-4">
                    <div className="grid grid-cols-2 gap-y-2 text-[10px] font-mono leading-none text-industrial-steel">
                      <div>Material:</div>
                      <div className="text-right text-white font-semibold truncate max-w-[130px]">{service.primaryMaterial}</div>
                      <div>Standard Lead:</div>
                      <div className="text-right text-[#ffa726] font-semibold">{service.typicalLeadTime}</div>
                    </div>
                  </div>

                </div>

                {/* Footer Buttons */}
                <div className="mt-auto border-t border-industrial-steel/15 grid grid-cols-2 text-center text-xs text-industrial-steel font-mono">
                  <button
                    onClick={() => onSelectService(service)}
                    className="py-3 px-1 border-r border-industrial-steel/15 text-[10px] md:text-xs font-bold uppercase tracking-wider hover:bg-industrial-blue/40 hover:text-white transition-colors cursor-pointer"
                  >
                    Spec Sheets
                  </button>
                  
                  <button
                    onClick={() => {
                      onQuickLoadToCalculator(service.id);
                      scrollTo("quote");
                    }}
                    className="py-3 px-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-industrial-orange hover:bg-industrial-orange/10 hover:text-white transition-all cursor-pointer"
                  >
                    Load Estimator
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
