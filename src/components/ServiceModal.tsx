import React from "react";
import { X, Clock, Settings, Package, ChevronRight, Calculator, CheckCircle2 } from "lucide-react";
import { Service } from "../types";
import { COMPANY_DETAILS } from "../data/industrialData";

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onLoadToCalculator: (serviceId: string) => void;
}

export default function ServiceModal({ service, onClose, onLoadToCalculator }: ServiceModalProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blueprint lines */}
      <div 
        className="absolute inset-0 bg-industrial-dark/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      >
        <div className="absolute inset-0 blueprint-grid opacity-20"></div>
      </div>

      {/* Sheet Metal Modal Frame with diagonal accent cuts */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#162235] to-industrial-dark border-2 border-industrial-steel/30 shadow-2xl overflow-hidden animate-zoom-in max-h-[90vh] flex flex-col">
        {/* Top Orange Warning Safety Stripe Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-industrial-orange via-yellow-500 to-industrial-light-blue"></div>
        
        {/* Header */}
        <div className="p-6 border-b border-industrial-steel/10 flex justify-between items-start">
          <div>
            <span className="font-mono text-xs text-industrial-orange uppercase tracking-wider font-semibold block mb-1">TECHNICAL SPECIFICATION SHEET</span>
            <h3 className="text-xl md:text-2xl font-sans font-bold text-white uppercase tracking-tight">{service.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white bg-industrial-dark/60 border border-industrial-steel/20 rounded-xs hover:border-industrial-orange transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm font-sans text-gray-200">
          
          {/* Detailed Narrative */}
          <div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-md">
              {service.detailedDescription}
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-industrial-blue/40 border border-industrial-steel/10 px-4 py-3.5 flex items-start space-x-3">
              <Settings className="w-5 h-5 text-industrial-orange shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-industrial-steel uppercase block">PRIMARY STATION WORKPLACE</span>
                <span className="font-sans font-semibold text-white text-sm">{service.machineryUsed}</span>
              </div>
            </div>

            <div className="bg-industrial-blue/40 border border-industrial-steel/10 px-4 py-3.5 flex items-start space-x-3">
              <Clock className="w-5 h-5 text-industrial-gold shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-industrial-steel uppercase block">AVG HARARE LEAD TIME</span>
                <span className="font-sans font-semibold text-white text-sm">{service.typicalLeadTime}</span>
              </div>
            </div>
          </div>

          {/* Detailed Property Spec Table */}
          <div className="border border-industrial-steel/20">
            <div className="p-3 bg-industrial-dark/80 border-b border-industrial-steel/20">
              <span className="font-mono text-xs font-semibold text-industrial-steel tracking-wider uppercase flex items-center space-x-2">
                <Package className="w-4 h-4 text-industrial-orange" />
                <span>ENGINEERING STRUCTURAL TOLERANCES</span>
              </span>
            </div>
            
            <div className="divide-y divide-industrial-steel/10">
              {service.specifications.map((spec, idx) => (
                <div key={idx} className="grid grid-cols-5 py-3 px-4 hover:bg-industrial-blue/10 transition-colors">
                  <div className="col-span-2 font-mono text-xs text-industrial-steel font-medium">{spec.label}</div>
                  <div className="col-span-3 font-sans text-xs text-white font-semibold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-industrial-orange shrink-0" />
                    <span>{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Material & Workmanship Guarantee Callout */}
          <div className="p-4 bg-industrial-orange/5 border-l-2 border-industrial-orange text-xs leading-relaxed text-gray-300">
            <strong className="text-white uppercase font-semibold block mb-1">RIVASOS GUARANTOR NOTE:</strong>
            All fabrications are managed at our core Workington facility in Harare under the personal structural verification of <strong>{COMPANY_DETAILS.mdName}</strong>. Materials are sourced from certified regional mills, meeting SABS and Standards Association of Zimbabwe expectations of chemical purity and gauge consistency.
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-industrial-dark/60 border-t border-industrial-steel/10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-end items-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs text-gray-400 hover:text-white uppercase tracking-wider transition-colors font-semibold"
          >
            Close Spec Sheet
          </button>
          
          <button
            onClick={() => {
              onLoadToCalculator(service.id);
              onClose();
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-industrial-orange to-red-600 text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-6 shadow-md cursor-pointer border-b-2 border-red-800 hover:brightness-110 transition-all active:translate-y-[1px]"
          >
            <Calculator className="w-4 h-4" />
            <span>Load & Estimate Weights</span>
          </button>
        </div>
      </div>
    </div>
  );
}
