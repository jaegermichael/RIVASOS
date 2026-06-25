import React from "react";
import { Ruler, Scissors, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import { PROCESS_DATA } from "../data/industrialData";
import { motion } from "framer-motion";

const iconMap: { [key: string]: any } = {
  Ruler: Ruler,
  Scissors: Scissors,
  Layers: Layers,
  ShieldCheck: ShieldCheck,
};

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 relative bg-gradient-to-b from-[#101926] to-[#0d141e] overflow-hidden">
      {/* Background visual styling */}
      <div className="absolute inset-0 steel-grid opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-2 mb-16 max-w-2xl mx-auto"
        >
          <div className="flex items-center space-x-2">
            <span className="h-[2px] w-6 bg-industrial-orange"></span>
            <span className="font-mono text-xs text-industrial-orange uppercase tracking-widest font-bold">WORKSHOP FLOW CHART</span>
            <span className="h-[2px] w-6 bg-industrial-orange"></span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white uppercase tracking-tight">
            THE PRECISION SEAM FLOW
          </h2>
          
          <p className="text-xs text-industrial-steel font-sans leading-relaxed">
            Every sheet strike conforms with structured QA parameters, transitioning seamlessly from drafting to flat cuts, computerized folding, and rigid gas-CO2 MIG bonding.
          </p>
        </motion.div>

        {/* Process Flow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans relative">
          
          {/* Connecting line for visual guidance on desktop grids */}
          <div className="hidden lg:block absolute top-[52px] left-16 right-16 h-[1.5px] bg-gradient-to-r from-industrial-orange/40 via-industrial-light-blue/40 to-industrial-steel/40 z-0"></div>

          {PROCESS_DATA.map((step, idx) => {
            const IconComp = iconMap[step.iconName] || Ruler;

            return (
              <motion.div 
                key={step.stepNumber}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-industrial-blue/15 border border-industrial-steel/15 p-6 relative flex flex-col justify-between group z-10 hover:border-industrial-orange/35 hover:bg-industrial-blue/25 transition-all"
              >
                {/* Visual Number Label */}
                <div className="absolute top-4 right-4 font-mono text-3xl font-extrabold text-industrial-steel/15 group-hover:text-industrial-orange/20 transition-all leading-none">
                  0{step.stepNumber}
                </div>

                <div className="space-y-4">
                  {/* Icon Frame */}
                  <div className="w-11 h-11 bg-industrial-dark border-2 border-industrial-steel/20 group-hover:border-industrial-orange/50 flex items-center justify-center text-industrial-orange font-bold relative z-10 shadow-inner">
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Text descriptions */}
                  <div>
                    <span className="text-[10px] font-mono text-industrial-orange uppercase block font-semibold leading-none">{step.subtitle}</span>
                    <h3 className="text-sm md:text-md uppercase font-bold text-white tracking-tight mt-1 group-hover:text-industrial-orange transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-2.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Engineering Sizing Metric Indicator overlay */}
                <div className="mt-6 pt-3 border-t border-industrial-steel/10">
                  <span className="text-[9px] font-mono text-industrial-steel block uppercase">STATION METRIC LIMIT</span>
                  <strong className="font-mono text-[10px] text-white block mt-0.5">{step.technicalMetric}</strong>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
