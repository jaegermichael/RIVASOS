import React from "react";
import { HardHat, GraduationCap, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY_DETAILS, SERVICES_DATA } from "../data/industrialData";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-industrial-dark border-t border-industrial-steel/20 relative z-30 pt-16 pb-8 font-sans">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Sitemap split columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-industrial-steel/10">
          
          {/* Col 1: About short summary */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3" onClick={handleScrollToTop}>
              <div className="flex items-end space-x-[2px] h-5 cursor-pointer">
                <div className="w-[3px] h-3 bg-industrial-steel rounded-xs"></div>
                <div className="w-[3px] h-4 bg-industrial-light-blue rounded-xs"></div>
                <div className="w-[3px] h-5 bg-industrial-orange rounded-xs"></div>
              </div>
              <div>
                <span className="font-sans font-extrabold text-white text-md uppercase tracking-tight">Rivasos Enterprises Private Limited</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Precision sheet metal fabrication, press folding, and guillotine shearing. Proudly manufacturing doors, frames, gutters, and architectural gates in Harare, Zimbabwe since {COMPANY_DETAILS.founded}.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-[10px] font-mono text-industrial-steel">
              <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
              <span>Conforms with SABS / Trade Standards</span>
            </div>
          </div>

          {/* Col 2: Services shortcuts */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono text-industrial-orange uppercase font-bold tracking-wider block">
              Core Capabilities
            </span>
            <ul className="text-xs text-gray-350 space-y-2">
              {SERVICES_DATA.slice(0, 5).map((srv) => (
                <li key={srv.id} className="hover:text-white transition-colors">
                  <a href={`#services`}>• {srv.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Harare address coordinates */}
          <div className="md:col-span-5 space-y-3 font-sans">
            <span className="text-[10px] font-mono text-industrial-orange uppercase font-bold tracking-wider block">
              Workington Plant Logistics
            </span>
            <div className="text-xs text-gray-350 space-y-2.5">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-industrial-steel shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-industrial-steel shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>{COMPANY_DETAILS.hotline1}</span>
                  <span>{COMPANY_DETAILS.hotline2}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-industrial-steel shrink-0" />
                <span>{COMPANY_DETAILS.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits and compliance */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-industrial-steel gap-4">
          <div className="text-center md:text-left leading-normal">
            <p>© {currentYear} {COMPANY_DETAILS.name}. All Rights Reserved.</p>
            <p className="mt-1 text-industrial-steel/60">Registered Pvt Ltd in Zimbabwe Co. Register Group. Founded {COMPANY_DETAILS.founded}.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleScrollToTop}
              className="hover:text-white py-1 px-2 border border-industrial-steel/20 rounded-xs hover:border-industrial-orange transition-colors cursor-pointer"
            >
              Return to Top 
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
