import React, { useEffect, useState } from "react";
import { FileText, ClipboardList, Clock, MessageSquare, Trash2, ArrowUpRight, CheckCircle2, ChevronRight, HardHat } from "lucide-react";
import { QuoteRequest } from "../types";
import { SERVICES_DATA, MATERIAL_DENSITIES, COMPANY_DETAILS } from "../data/industrialData";

interface QuoteListProps {
  updateTrigger: number;
}

export default function QuoteList({ updateTrigger }: QuoteListProps) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  const loadQuotes = () => {
    const historicalJson = localStorage.getItem("rivasos_quote_history");
    if (historicalJson) {
      try {
        setQuotes(JSON.parse(historicalJson));
      } catch (err) {
        console.error("Error decoding storage quote list", err);
      }
    }
  };

  useEffect(() => {
    loadQuotes();
  }, [updateTrigger]);

  const handleDelete = (id: string) => {
    const filtered = quotes.filter(q => q.id !== id);
    localStorage.setItem("rivasos_quote_history", JSON.stringify(filtered));
    setQuotes(filtered);
  };

  const getWhatsAppMessage = (req: QuoteRequest) => {
    const selectedMat = MATERIAL_DENSITIES.find(m => m.id === req.materialId)?.name || req.materialId;
    const selectedSrv = SERVICES_DATA.find(s => s.id === req.serviceId)?.title || req.serviceId;

    return `*RIVASOS ENTERPRISES QUOTE FOLLOWUP*
-----------------------------
*Ref ID:* ${req.id}
*Customer:* ${req.customerName}
*Service:* ${selectedSrv}
*Material:* ${selectedMat}
*Est Weight:* ${req.calculatedWeightKg} kg
*Date Submitted:* ${req.submissionDate}

MD, I am following up on my sheet metal bending order regarding this reference ID. Please confirm the costing.
-----------------------------
_Sent from Client Register Console_`;
  };

  if (quotes.length === 0) {
    return (
      <div className="border border-dashed border-industrial-steel/25 bg-industrial-blue/15 p-8 text-center">
        <HardHat className="w-10 h-10 text-industrial-steel/40 mx-auto mb-3" />
        <h4 className="font-sans font-bold text-gray-300 text-sm uppercase tracking-wide">Client Ledger Empty</h4>
        <p className="text-xs text-industrial-steel mt-1 max-w-sm mx-auto leading-relaxed">
          There are no active drawing inquiries recorded on this browser station. Draft specifications above and register your weight calculations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans text-sm">
      <div className="flex items-center justify-between border-b border-industrial-steel/10 pb-2 mb-3">
        <span className="font-mono text-xs text-industrial-steel uppercase font-semibold">Registered Records Log ({quotes.length})</span>
        <span className="text-[10px] font-mono text-industrial-orange uppercase">Active Station session</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotes.map((quote) => {
          const service = SERVICES_DATA.find(s => s.id === quote.serviceId);
          const material = MATERIAL_DENSITIES.find(m => m.id === quote.materialId);

          return (
            <div 
              key={quote.id} 
              className="bg-industrial-blue/20 border border-industrial-steel/15 p-4 rounded-xs flex flex-col justify-between relative overflow-hidden group hover:border-industrial-orange/50 transition-colors"
            >
              {/* Header block with unique status light */}
              <div className="flex justify-between items-start border-b border-industrial-steel/10 pb-2.5 mb-2.5">
                <div>
                  <span className="font-mono text-xs text-industrial-orange font-bold uppercase block tracking-wider group-hover:text-white transition-colors">
                    {quote.id}
                  </span>
                  <span className="text-[10px] text-industrial-steel font-mono">{quote.submissionDate}</span>
                </div>
                
                <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-mono uppercase font-bold tracking-wider rounded-sm rounded-none">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full animate-ping"></span>
                  <span>Awaiting Check</span>
                </span>
              </div>

              {/* Specs parameters log */}
              <div className="space-y-1 my-2 flex-1">
                <p className="font-sans font-bold text-white text-xs uppercase tracking-tight">
                  {service?.title || quote.serviceId}
                </p>
                
                <div className="font-mono text-[10px] text-industrial-steel space-y-0.5">
                  <p>Material: <span className="text-gray-300">{material?.name || quote.materialId}</span></p>
                  <p>Aggregated Mass: <span className="text-white font-bold">{quote.calculatedWeightKg} kg</span> ({quote.quantity} units)</p>
                  {quote.customNotes && (
                    <p className="text-[9px] line-clamp-1 italic text-industrial-steel/70 pt-1">
                      Notes: {quote.customNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Status footer with action triggers */}
              <div className="flex justify-between items-center pt-3 border-t border-industrial-steel/10 mt-2">
                <span className="font-mono text-[11px] text-white">
                  Indicator: <span className="text-industrial-orange font-bold">${quote.estimatedCostUSD}</span>
                </span>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleDelete(quote.id)}
                    className="p-1.5 text-industrial-steel hover:text-red-500 hover:bg-red-500/10 rounded-xs border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                    title="Delete ledger record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.hotline1.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(getWhatsAppMessage(quote))}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase tracking-wider hover:bg-green-600 hover:text-white transition-all rounded-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Followup</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
