import React, { useState, useEffect } from "react";
import { Calculator, ArrowRight, Table, Copy, Check, MessageSquare, ListFilter, RotateCcw, ShieldCheck, FileText } from "lucide-react";
import { SERVICES_DATA, MATERIAL_DENSITIES, COMPANY_DETAILS } from "../data/industrialData";
import { QuoteRequest } from "../types";

interface QuoteCalculatorProps {
  selectedServiceId: string;
  onQuoteSubmitted: () => void;
}

export default function QuoteCalculator({ selectedServiceId, onQuoteSubmitted }: QuoteCalculatorProps) {
  // Calculator State
  const [serviceId, setServiceId] = useState(SERVICES_DATA[0].id);
  const [materialId, setMaterialId] = useState(MATERIAL_DENSITIES[0].id);
  const [profileShape, setProfileShape] = useState<"flat" | "uchannel" | "circle">("flat");
  
  const [lengthMm, setLengthMm] = useState<number>(2400);
  const [widthMm, setWidthMm] = useState<number>(1200);
  const [flangeMm, setFlangeMm] = useState<number>(100); // only for uchannel
  const [thicknessMm, setThicknessMm] = useState<number>(1.6);
  const [quantity, setQuantity] = useState<number>(5);

  // User details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  // Calc results
  const [itemWeightKg, setItemWeightKg] = useState(0);
  const [totalWeightKg, setTotalWeightKg] = useState(0);
  const [estCostUSD, setEstCostUSD] = useState(0);

  // UX Feedback
  const [submittedRequest, setSubmittedRequest] = useState<QuoteRequest | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // Sync loaded service from parent modal triggers
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
      // Preset sensible shapes
      if (selectedServiceId === "door-frames" || selectedServiceId === "press-bending") {
        setProfileShape("uchannel");
      } else if (selectedServiceId === "guillotine-cutting" || selectedServiceId === "custom-fab") {
        setProfileShape("flat");
      } else {
        setProfileShape("flat");
      }
    }
  }, [selectedServiceId]);

  // Recalculate weights and costs
  useEffect(() => {
    const selectedMat = MATERIAL_DENSITIES.find(m => m.id === materialId) || MATERIAL_DENSITIES[0];
    const density = selectedMat.densityGCM3; // g/cm3

    let volumeCm3 = 0;

    if (profileShape === "flat") {
      // Area = L * W (mm2)
      // Volume = Area * Thickness (mm3) -> convert to cm3 (/1000)
      const areaMm2 = lengthMm * widthMm;
      const volumeMm3 = areaMm2 * thicknessMm;
      volumeCm3 = volumeMm3 / 1000;
    } else if (profileShape === "uchannel") {
      // developed width = base width + 2 * side flange heights
      const devWidthMm = widthMm + (2 * flangeMm);
      const areaMm2 = lengthMm * devWidthMm;
      const volumeMm3 = areaMm2 * thicknessMm;
      volumeCm3 = volumeMm3 / 1000;
    } else if (profileShape === "circle") {
      // width is diameter
      const radiusMm = widthMm / 2;
      const areaMm2 = Math.PI * radiusMm * radiusMm;
      const volumeMm3 = areaMm2 * thicknessMm;
      volumeCm3 = volumeMm3 / 1000;
    }

    // Weight (g) = Volume (cm3) * Density (g/cm3)
    const weightG = volumeCm3 * density;
    const weightKg = weightG / 1000;

    const itemWt = parseFloat(weightKg.toFixed(3));
    const totalWt = parseFloat((itemWt * quantity).toFixed(2));

    // Base fabrication processing fee: ~1.3 multiplier
    const fabMultiplier = profileShape === "uchannel" ? 1.45 : 1.25;
    const itemCost = totalWt * selectedMat.basePriceKgUSD * fabMultiplier;
    
    setItemWeightKg(itemWt);
    setTotalWeightKg(totalWt);
    setEstCostUSD(parseFloat(itemCost.toFixed(2)));
  }, [serviceId, materialId, profileShape, lengthMm, widthMm, flangeMm, thicknessMm, quantity]);

  // Reset Calculator Form
  const handleReset = () => {
    setProfileShape("flat");
    setLengthMm(2400);
    setWidthMm(1200);
    setFlangeMm(100);
    setThicknessMm(1.6);
    setQuantity(5);
    setSubmittedRequest(null);
  };

  // Compile WhatsApp Text
  const getWhatsAppMessage = (req: QuoteRequest) => {
    const selectedMat = MATERIAL_DENSITIES.find(m => m.id === req.materialId)?.name || req.materialId;
    const selectedSrv = SERVICES_DATA.find(s => s.id === req.serviceId)?.title || req.serviceId;
    
    const shapeText = req.serviceId === "door-frames" ? "Double-ebated Frame profile" :
                      profileShape === "uchannel" ? "Folded U-Channel Panel" :
                      profileShape === "circle" ? "Circular Flange Plate" : "Flat Section Plate";

    return `*RIVASOS ENTERPRISES QUOTE REQUEST*
-----------------------------
*Ref ID:* ${req.id}
*Customer:* ${req.customerName}
*Phone:* ${req.customerPhone}
*Service Required:* ${selectedSrv}
*Profile configuration:* ${shapeText}

*METALLIC SPECIFICATIONS:*
• *Material Type:* ${selectedMat}
• *Length:* ${req.lengthMm} mm
• *Width (developed):* ${req.widthMm} mm ${profileShape === 'uchannel' ? `(+ ${flangeMm}mm flanges)` : ''}
• *Thickness:* ${req.thicknessMm} mm
• *Batch Quantity:* ${req.quantity} units

*THEORETICAL ESTIMATIONS:*
• *Total Theoretical Weight:* ${req.calculatedWeightKg} kg
• *Estimated Metal Mass:* ${itemWeightKg} kg/unit
• *Budgetary Indicator:* $${req.estimatedCostUSD} USD

*Notes/Sketches:* ${req.customNotes || "No extra drawings. Direct processing."}
-----------------------------
_Sent via Rivasos Web Blueprint Portal_`;
  };

  // Handle Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please provide at least a name and contact phone number.");
      return;
    }

    const randomID = `RVS-2026-F${Math.floor(100 + Math.random() * 900)}`;
    const newRequest: QuoteRequest = {
      id: randomID,
      serviceId,
      materialId,
      lengthMm,
      widthMm: profileShape === "uchannel" ? (widthMm + 2 * flangeMm) : widthMm,
      thicknessMm,
      quantity,
      customerName,
      customerPhone,
      customerEmail,
      customNotes,
      calculatedWeightKg: totalWeightKg,
      estimatedCostUSD: estCostUSD,
      status: "pending",
      submissionDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    };

    // Save to local localStorage array
    const existingQuotesJson = localStorage.getItem("rivasos_quote_history");
    const existingQuotes = existingQuotesJson ? JSON.parse(existingQuotesJson) : [];
    localStorage.setItem("rivasos_quote_history", JSON.stringify([...existingQuotes, newRequest]));

    // Update UI State
    setSubmittedRequest(newRequest);
    
    // Clear user details but keep calc variables
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCustomNotes("");

    // Trigger parent callback
    if (onQuoteSubmitted) {
      onQuoteSubmitted();
    }
  };

  // Trigger copy to clipboard
  const handleCopyToClipboard = () => {
    if (!submittedRequest) return;
    const textMsg = getWhatsAppMessage(submittedRequest);
    navigator.clipboard.writeText(textMsg).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  return (
    <div className="bg-industrial-dark border border-industrial-steel/20 shadow-2xl overflow-hidden relative">
      {/* Absolute background grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

      {/* Header Accent Line */}
      <div className="h-2 w-full bg-linear-to-r from-industrial-orange to-red-600"></div>

      <div className="p-6 md:p-8 relative z-10">
        <div className="border-b border-industrial-steel/10 pb-4 mb-6">
          <span className="font-mono text-xs text-industrial-orange uppercase tracking-wider font-bold block mb-1">HARARE WORKSHOP CALCULATOR</span>
          <h3 className="text-xl md:text-2xl font-sans font-bold text-white uppercase tracking-tight flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-industrial-orange" />
            <span>Interactive Sheet Metal Estimator</span>
          </h3>
          <p className="text-xs text-industrial-steel mt-1 font-sans">
            Calculate estimated theoretical weight in kilograms instantly. Select shape parameters to render visual CAD dimensions.
          </p>
        </div>

        {submittedRequest ? (
          /* SUCCESS STATE / BLUEPRINT BILL OF MATERIALS */
          <div className="space-y-6 animate-fade-in">
            <div className="bg-[#122312] border border-green-500/30 p-4 flex items-start space-x-3 text-green-300">
              <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans font-bold text-sm uppercase tracking-wide text-white">ESTIMATE GENERATED SUCCESSFULLY!</h4>
                <p className="text-xs text-green-400 font-sans mt-0.5">
                  Assigned Project Ref ID: <strong className="font-mono text-white underline">{submittedRequest.id}</strong>. A copy of this ledger is stored in your local browser history below.
                </p>
              </div>
            </div>

            {/* Simulated Bill of Materials blueprint card */}
            <div className="border-2 border-dashed border-industrial-steel/40 bg-industrial-blue/40 p-6 rounded-xs relative overflow-hidden font-mono text-xs">
              <div className="absolute top-0 right-0 py-1 px-3 bg-industrial-orange text-white transform rotate-12 translate-x-3 translate-y-2 uppercase font-mono font-bold tracking-widest text-[8px] animate-pulse">
                PENDING COSTING
              </div>

              <div className="space-y-4">
                <div className="border-b border-industrial-steel/20 pb-3 flex justify-between items-center text-industrial-steel">
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-tight font-sans text-sm">{COMPANY_DETAILS.name}</h5>
                    <p className="text-[10px] uppercase font-mono">{COMPANY_DETAILS.address}</p>
                  </div>
                  <FileText className="w-8 h-8 text-industrial-steel/40" />
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-industrial-steel">
                  <div>Ref Ticket ID: <span className="text-white font-bold">{submittedRequest.id}</span></div>
                  <div className="text-right">Est. Date: <span className="text-white">{submittedRequest.submissionDate}</span></div>
                  <div>Client contact: <span className="text-white">{submittedRequest.customerPhone}</span></div>
                  <div className="text-right">Processing Status: <span className="text-yellow-400 font-bold uppercase tracking-wider">Awaiting Drawing Check</span></div>
                </div>

                <div className="border-t border-b border-industrial-steel/20 py-3 my-3">
                  <div className="grid grid-cols-12 font-bold text-white border-b border-industrial-steel/10 pb-1 mb-2">
                    <span className="col-span-6">ITEM DESCRIPTION</span>
                    <span className="col-span-2 text-center">QTY</span>
                    <span className="col-span-2 text-right">UNIT WT</span>
                    <span className="col-span-2 text-right">TOTAL</span>
                  </div>

                  <div className="grid grid-cols-12 text-industrial-steel">
                    <span className="col-span-6 font-sans text-[11px] text-white font-semibold">
                      {SERVICES_DATA.find(s => s.id === submittedRequest.serviceId)?.title} - {MATERIAL_DENSITIES.find(m => m.id === submittedRequest.materialId)?.name} 
                      <span className="block text-[9px] font-mono mt-0.5 text-industrial-steel">({lengthMm}mm x {widthMm}mm x {thicknessMm}mm)</span>
                    </span>
                    <span className="col-span-2 text-center text-white">{submittedRequest.quantity}</span>
                    <span className="col-span-2 text-right">{itemWeightKg} kg</span>
                    <span className="col-span-2 text-right text-industrial-orange font-bold font-mono">{submittedRequest.calculatedWeightKg} kg</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
                  <div>
                    <p className="text-industrial-steel">Note: Budget pricing includes raw plate rolling + standard press brake surcharge.</p>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <span className="text-xs text-industrial-steel">Indicator Bill Price:</span>
                    <p className="text-lg text-white font-mono font-bold">${submittedRequest.estimatedCostUSD} <span className="text-[10px] text-industrial-steel font-normal">USD</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Bridge Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleCopyToClipboard}
                className="w-full flex items-center justify-center space-x-2 bg-industrial-blue hover:bg-industrial-light-blue/80 text-white font-sans text-xs uppercase tracking-wider py-3.5 border border-industrial-steel/30 rounded-xs transition-all cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Calculations Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-industrial-steel" />
                    <span>Copy Specs to Clipboard</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.hotline1.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(getWhatsAppMessage(submittedRequest))}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-white font-sans text-xs uppercase tracking-wider py-3.5 border-b-2 border-green-800 rounded-xs font-bold transition-all"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Transmit Quote (WhatsApp)</span>
              </a>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="text-xs font-mono text-industrial-steel hover:text-industrial-orange flex items-center space-x-1.5 mx-auto hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Estimator & Input New Spec</span>
              </button>
            </div>
          </div>
        ) : (
          /* FORM ENTRY STATE */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* INPUT FIELDS COLUMN */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* 1. Service Type and Material Type Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-industrial-steel uppercase tracking-wider mb-1">
                      Fabrication Sector
                    </label>
                    <select
                      value={serviceId}
                      onChange={(e) => {
                        setServiceId(e.target.value);
                        // Sensible defaults
                        if (e.target.value === "door-frames" || e.target.value === "press-bending") {
                          setProfileShape("uchannel");
                        } else {
                          setProfileShape("flat");
                        }
                      }}
                      className="w-full bg-industrial-blue/50 border border-industrial-steel/25 text-white py-2 px-3 focus:outline-none focus:border-industrial-orange text-xs font-sans rounded-xs"
                    >
                      {SERVICES_DATA.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-industrial-steel uppercase tracking-wider mb-1">
                      Material Sheet Selection
                    </label>
                    <select
                      value={materialId}
                      onChange={(e) => setMaterialId(e.target.value)}
                      className="w-full bg-industrial-blue/50 border border-industrial-steel/25 text-white py-2 px-3 focus:outline-none focus:border-industrial-orange text-xs font-sans rounded-xs"
                    >
                      {MATERIAL_DENSITIES.map(m => (
                        <option key={m.id} value={m.id}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Shape Configuration Toggles */}
                <div>
                  <label className="block text-[10px] font-mono text-industrial-steel uppercase tracking-wider mb-2">
                    Profile Cross-Section Shape
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "flat", label: "Flat Sheet / Plate" },
                      { id: "uchannel", label: "Folded U-Channel" },
                      { id: "circle", label: "Circular Disk/Flange" },
                    ].map((shape) => (
                      <button
                        key={shape.id}
                        type="button"
                        onClick={() => {
                          setProfileShape(shape.id as "flat" | "uchannel" | "circle");
                          if (shape.id === "circle" && lengthMm !== widthMm) {
                            // Circle diameters should align roughly
                            setLengthMm(widthMm);
                          }
                        }}
                        className={`py-2 px-1 text-center font-sans text-[10px] uppercase font-bold tracking-wider transition-colors border cursor-pointer rounded-xs ${profileShape === shape.id ? "bg-industrial-orange/15 border-industrial-orange text-white" : "bg-industrial-blue/20 border-industrial-steel/20 text-industrial-steel hover:border-industrial-steel/40"}`}
                      >
                        {shape.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Slider Controls for Dimensions */}
                <div className="space-y-3 bg-industrial-blue/20 p-4 border border-industrial-steel/10">
                  
                  {/* Length Slider (Hidden if circle) */}
                  {profileShape !== "circle" && (
                    <div>
                      <div className="flex justify-between items-center text-xs font-mono text-industrial-steel mb-1">
                        <span>L — WORKSPACE LENGTH</span>
                        <span className="text-white font-bold">{lengthMm} mm</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="100"
                          max="3500"
                          step="50"
                          value={lengthMm}
                          onChange={(e) => setLengthMm(parseInt(e.target.value))}
                          className="w-full accent-industrial-orange cursor-pointer"
                        />
                        <input 
                          type="number"
                          value={lengthMm}
                          onChange={(e) => setLengthMm(Math.max(10, parseInt(e.target.value) || 0))}
                          className="w-16 bg-industrial-blue text-white font-mono text-xs px-1 border border-industrial-steel/30 text-center py-0.5 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Width Slider (Radius if circle) */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono text-industrial-steel mb-1">
                      <span>{profileShape === "circle" ? "D — FLANGE DIAMETER" : "W — SHEET WIDTH"}</span>
                      <span className="text-white font-bold">{widthMm} mm</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="50"
                        max="3000"
                        step="50"
                        value={widthMm}
                        onChange={(e) => setWidthMm(parseInt(e.target.value))}
                        className="w-full accent-industrial-orange cursor-pointer"
                      />
                      <input 
                        type="number"
                        value={widthMm}
                        onChange={(e) => setWidthMm(Math.max(10, parseInt(e.target.value) || 0))}
                        className="w-16 bg-industrial-blue text-white font-mono text-xs px-1 border border-industrial-steel/30 text-center py-0.5 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Flange Slider (Active only if uchannel) */}
                  {profileShape === "uchannel" && (
                    <div>
                      <div className="flex justify-between items-center text-xs font-mono text-industrial-steel mb-1">
                        <span>F — FLANGE SIDES HEIGHT</span>
                        <span className="text-white font-bold">{flangeMm} mm</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="20"
                          max="800"
                          step="10"
                          value={flangeMm}
                          onChange={(e) => setFlangeMm(parseInt(e.target.value))}
                          className="w-full accent-industrial-orange cursor-pointer"
                        />
                        <input 
                          type="number"
                          value={flangeMm}
                          onChange={(e) => setFlangeMm(Math.max(5, parseInt(e.target.value) || 0))}
                          className="w-16 bg-industrial-blue text-white font-mono text-xs px-1 border border-industrial-steel/30 text-center py-0.5 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Thickness Gauge Selector */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono text-industrial-steel mb-1">
                      <span>T — SHEET METAL THICKNESS</span>
                      <span className="text-white font-bold">{thicknessMm} mm</span>
                    </div>
                    <div className="grid grid-cols-6 gap-1 md:gap-2">
                      {[0.6, 1.0, 1.2, 1.6, 2.0, 3.0, 4.0, 6.0].map((tVal) => (
                        <button
                          key={tVal}
                          type="button"
                          onClick={() => setThicknessMm(tVal)}
                          className={`py-1.5 focus:outline-none font-mono text-[10px] font-bold transition-all border cursor-pointer ${thicknessMm === tVal ? "bg-industrial-orange border-industrial-orange text-white" : "bg-industrial-blue/40 border-industrial-steel/20 text-industrial-steel hover:border-industrial-steel/40"}`}
                        >
                          {tVal}mm
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity fields */}
                  <div className="pt-2 border-t border-industrial-steel/10 flex justify-between items-center">
                    <span className="text-xs font-mono text-industrial-steel">BATCH HEAVY BUNDLE QUANTITY</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 bg-industrial-blue border border-industrial-steel/30 text-white font-bold text-xs flex items-center justify-center cursor-pointer hover:border-industrial-orange"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="2000"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 h-7 bg-industrial-dark text-white font-mono text-center text-xs border border-industrial-steel/40 rounded-none focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 bg-industrial-blue border border-industrial-steel/30 text-white font-bold text-xs flex items-center justify-center cursor-pointer hover:border-industrial-orange"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>

                {/* 4. Contact Details to Finalize Custom Bid */}
                <div className="p-4 bg-industrial-blue/10 border border-industrial-steel/15 space-y-3">
                  <span className="font-mono text-xs text-industrial-orange uppercase tracking-wider font-semibold block border-b border-industrial-steel/10 pb-1.5">
                    Harare Engineering Contact Authorization
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="My Name / Company *"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-industrial-dark border border-industrial-steel/25 text-white py-1.5 px-3 focus:outline-none focus:border-industrial-orange text-xs font-sans rounded-none"
                    />

                    <input
                      type="tel"
                      placeholder="WhatsApp Mobile *"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-industrial-dark border border-industrial-steel/25 text-white py-1.5 px-3 focus:outline-none focus:border-industrial-orange text-xs font-sans rounded-none"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-industrial-dark border border-industrial-steel/25 text-white py-1.5 px-3 focus:outline-none focus:border-industrial-orange text-xs font-sans rounded-none"
                  />

                  <textarea
                    placeholder="Provide notes or drawing attachment descriptions here..."
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full bg-industrial-dark border border-industrial-steel/25 text-white py-1.5 px-3 focus:outline-none focus:border-industrial-orange text-xs font-sans rounded-none resize-none"
                  ></textarea>
                </div>

              </div>
              
              {/* SCHEMATIC & COMPUTATION PANEL COLUMN */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                {/* Dynamic Blueprint CAD schematic block */}
                <div className="bg-[#0b1a2e] border-2 border-industrial-light-blue/60 p-4 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[280px]">
                  {/* Grid Lines watermark */}
                  <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

                  <div className="flex justify-between items-start relative z-10">
                    <span className="font-mono text-[9px] text-[#29b6f6] font-bold uppercase tracking-wider block">CAD INTEGRITY CONTROLS</span>
                    <span className="font-mono text-[9px] font-bold text-industrial-steel">SCALE: AUTO</span>
                  </div>

                  {/* SVG Canvas drawing dynamic isometric shape layouts */}
                  <div className="w-full h-40 flex items-center justify-center relative z-10 py-2">
                    {profileShape === "flat" && (
                      <svg viewBox="0 0 100 80" className="w-full h-full text-[#4fc3f7] select-none">
                        {/* Iso metal block */}
                        <polygon points="15,45 65,30 90,45 40,60" fill="rgba(79, 195, 247, 0.15)" stroke="#4fc3f7" strokeWidth="1" strokeLinejoin="round" />
                        {/* Dimensional thickness lines */}
                        <path d="M 15,45 L 15,48 L 40,63 L 90,48 L 90,45" stroke="#4fc3f7" strokeWidth="1" fill="none" />
                        <line x1="15" y1="45" x2="15" y2="48" stroke="#4fc3f7" strokeWidth="1" />
                        <line x1="40" y1="60" x2="40" y2="63" stroke="#4fc3f7" strokeWidth="1" />
                        <line x1="90" y1="45" x2="90" y2="48" stroke="#4fc3f7" strokeWidth="1" />

                        {/* Dimension labels */}
                        {/* Length label (15,45) to (65,30) */}
                        <line x1="12" y1="42" x2="62" y2="27" stroke="#ffa726" strokeWidth="0.75" strokeDasharray="2,2" />
                        <text x="32" y="32" fill="#ffa726" fontSize="5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" transform="rotate(-15, 32, 32)">L = {lengthMm}mm</text>
                        
                        {/* Width label (40,60) to (90,45) */}
                        <line x1="42" y1="63" x2="92" y2="48" stroke="#ffa726" strokeWidth="0.75" strokeDasharray="2,2" />
                        <text x="69" y="59" fill="#ffa726" fontSize="5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" transform="rotate(15, 69, 59)">W = {widthMm}mm</text>
                        
                        {/* Thickness Marker */}
                        <line x1="93" y1="45" x2="93" y2="48" stroke="#f44336" strokeWidth="0.75" />
                        <text x="96" y="48" fill="#f44336" fontSize="5" fontFamily="monospace" fontWeight="bold">T={thicknessMm}mm</text>
                      </svg>
                    )}

                    {profileShape === "uchannel" && (
                      <svg viewBox="0 0 100 80" className="w-full h-full text-[#4fc3f7] select-none">
                        {/* Iso channel shape */}
                        {/* Back-end flange, flat plate, and front-end flange */}
                        <path d="M 12,25 L 12,45 L 37,55 L 75,40 L 75,20 L 71,18 L 71,38 M 12,45 L 16,47 L 41,57 L 75,44 L 75,40" stroke="#4fc3f7" strokeWidth="1" fill="none" />
                        {/* Shimmer infill */}
                        <polygon points="12,45 37,55 75,40 71,38 33,48 8,38" fill="rgba(79, 195, 247, 0.12)" stroke="#4fc3f7" strokeWidth="0.5" />
                        <path d="M 8,18 L 8,38 L 33,48 L 71,38 L 71,18 M 8,38 L 12,45" stroke="#4fc3f7" strokeWidth="0.8" />

                        {/* Front plate side flap */}
                        <polygon points="33,48 37,55 12,45 8,38" fill="rgba(79, 195, 247, 0.2)" stroke="#4fc3f7" strokeWidth="1" />
                        <line x1="33" y1="48" x2="33" y2="18" stroke="#4fc3f7" strokeWidth="0.75" />
                        <line x1="37" y1="55" x2="37" y2="25" stroke="#4fc3f7" strokeWidth="1" />

                        {/* Dimensions */}
                        {/* Length L marker */}
                        <line x1="7" y1="15" x2="70" y2="15" stroke="#ffa726" strokeWidth="0.75" strokeDasharray="2,2" />
                        <text x="38" y="12" fill="#ffa726" fontSize="5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L = {lengthMm}mm</text>

                        {/* Base width marker */}
                        <line x1="39" y1="58" x2="77" y2="43" stroke="#ffa726" strokeWidth="0.75" strokeDasharray="2,2" />
                        <text x="59" y="54" fill="#ffa726" fontSize="5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" transform="rotate(-15, 59, 54)">W = {widthMm}mm</text>

                        {/* Side Flange height F marker */}
                        <line x1="77" y1="20" x2="77" y2="40" stroke="#ffa726" strokeWidth="0.75" strokeDasharray="2,2" />
                        <text x="80" y="32" fill="#ffa726" fontSize="5" fontFamily="monospace" fontWeight="bold">F = {flangeMm}mm</text>

                        {/* Thickness indicator */}
                        <text x="40" y="30" fill="#f44336" fontSize="5" fontFamily="monospace" fontWeight="bold">T = {thicknessMm}mm</text>
                      </svg>
                    )}

                    {profileShape === "circle" && (
                      <svg viewBox="0 0 100 80" className="w-full h-full text-[#4fc3f7] select-none">
                        {/* Circular flange ring */}
                        <ellipse cx="50" cy="40" rx="35" ry="22" fill="rgba(79, 195, 247, 0.15)" stroke="#4fc3f7" strokeWidth="1" />
                        {/* 3D thickness lip */}
                        <ellipse cx="50" cy="42" rx="35" ry="22" fill="none" stroke="#4fc3f7" strokeWidth="0.5" strokeDasharray="1,1" />
                        <line x1="15" y1="40" x2="15" y2="42" stroke="#4fc3f7" strokeWidth="1" />
                        <line x1="85" y1="40" x2="85" y2="42" stroke="#4fc3f7" strokeWidth="1" />

                        {/* Bolt circles to show structural steel detail */}
                        <ellipse cx="50" cy="40" rx="25" ry="15.5" fill="none" stroke="#29b6f6" strokeWidth="0.5" strokeDasharray="2,3" />
                        {/* Bolt circles punches */}
                        <circle cx="50" cy="24.5" r="1.5" fill="#0f141d" stroke="#29b6f6" strokeWidth="0.5" />
                        <circle cx="50" cy="55.5" r="1.5" fill="#0f141d" stroke="#29b6f6" strokeWidth="0.5" />
                        <circle cx="25" cy="40" r="1.5" fill="#0f141d" stroke="#29b6f6" strokeWidth="0.5" />
                        <circle cx="75" cy="40" r="1.5" fill="#0f141d" stroke="#29b6f6" strokeWidth="0.5" />

                        {/* Center hub */}
                        <ellipse cx="50" cy="40" rx="10" ry="6" fill="#000000" stroke="#4fc3f7" strokeWidth="0.75" />

                        {/* Diameter Marker line */}
                        <line x1="15" y1="40" x2="85" y2="40" stroke="#ffa726" strokeWidth="0.75" strokeDasharray="1,2" />
                        <text x="50" y="37" fill="#ffa726" fontSize="5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Ø = {widthMm}mm</text>
                        
                        {/* Thickness Indicator */}
                        <text x="50" y="45" fill="#f44336" fontSize="5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">T = {thicknessMm}mm</text>
                      </svg>
                    )}
                  </div>

                  <div className="text-[10px] bg-industrial-dark/60 border border-industrial-steel/10 p-2 font-mono text-industrial-steel leading-none relative z-10">
                    <span className="text-[#4fc3f7]">DEVELOPED SHEARING WIDTH:</span> <strong className="text-white">
                      {profileShape === "uchannel" ? `${widthMm + 2 * flangeMm} mm` : `${widthMm} mm`}
                    </strong>
                  </div>
                </div>

                {/* Computational weight card rendering exact metrics */}
                <div className="bg-industrial-blue/40 border border-industrial-steel/20 p-5 space-y-4">
                  <span className="font-mono text-xs text-industrial-steel uppercase block border-b border-industrial-steel/10 pb-1.5">
                    METRIC THEORY SUMS
                  </span>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-industrial-dark p-3 border border-industrial-steel/10 text-center">
                      <span className="text-[9px] font-mono text-industrial-steel uppercase block">ITEM WT</span>
                      <p className="font-mono text-md md:text-lg text-white font-bold mt-1">
                        {itemWeightKg} <span className="text-xs font-sans text-industrial-steel font-normal">kg</span>
                      </p>
                    </div>

                    <div className="bg-industrial-dark p-3 border border-industrial-steel/10 text-center">
                      <span className="text-[9px] font-mono text-industrial-steel uppercase block">BATCH TOTAL WT</span>
                      <p className="font-mono text-md md:text-lg text-industrial-orange font-bold mt-1">
                        {totalWeightKg} <span className="text-xs font-sans text-industrial-steel font-normal">kg</span>
                      </p>
                    </div>
                  </div>

                  {/* Pricing feedback bracket */}
                  <div className="bg-industrial-dark/50 border-l-2 border-industrial-orange py-2.5 px-4 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-sans text-[11px] text-gray-300 block">Indicative Metal Sum (USD)</span>
                      <span className="font-mono text-[9px] text-industrial-steel">Calculated from base material weight indices</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-lg text-white font-bold">${estCostUSD}</span>
                    </div>
                  </div>

                  {/* Live Safety Check */}
                  <div className="text-[10px] text-industrial-steel leading-tight flex items-start space-x-1.5 font-mono">
                    <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                    <span>Valid Harare commercial calculation. Sourced and sheared local stock.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-industrial-orange to-red-600 hover:from-industrial-orange hover:to-orange-500 text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 shadow-md hover:brightness-110 active:translate-y-[0.5px] cursor-pointer"
                  >
                    <span>Finalize Ledger & Request Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

              </div>

            </div>
          </form>
        )}

      </div>
    </div>
  );
}
