import React, { useState } from "react";
import { ListFilter, Search, Grid, Eye, CheckCircle2 } from "lucide-react";
import { GALLERY_ITEMS } from "../data/industrialData";
import { GalleryItem } from "../types";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryShowcase() {
  const [activeCategory, setActiveCategory] = useState<"all" | "architectural" | "structural" | "processing">("all");
  const [selectedPhotoItem, setSelectedPhotoItem] = useState<GalleryItem | null>(null);

  // Mapping our generated custom images to gallery products!
  const getProductImage = (id: string, category: string) => {
    switch (id) {
      case "g1": // Unpainted door frames
        return "/images/door_frames.jpeg";
      case "g2": // Red oxide door frames
        return "/images/door_frames_red.jpeg";
      case "g3": // Shelving
        return "/images/shelving.jpeg";
      case "g4": // Silver sliding gate
        return "/images/sliding_gate_silver.jpeg";
      case "g5": // Red sliding gate
        return "/images/sliding_gate_red.jpeg";
      case "g6": // Truck bed bending
        return "/images/truck_bed_bending.jpeg";
      default:
        return "/images/hero_fabrication_harare_1781966200274.jpg";
    }
  };

  const categories: { id: "all" | "architectural" | "structural" | "processing"; label: string }[] = [
    { id: "all", label: "All Fabrications" },
    { id: "architectural", label: "Architectural & Frames" },
    { id: "structural", label: "Structural & Tubing" },
    { id: "processing", label: "Bespoke & Processing" },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 bg-[#101926] relative">
      {/* Background visual helpers */}
      <div className="absolute inset-0 steel-grid opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-industrial-steel/10 pb-6 mb-10"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="h-[2px] w-8 bg-industrial-orange"></span>
              <span className="font-mono text-xs text-industrial-orange uppercase tracking-widest font-bold">CLIENT LOGISTICS SHOWCASE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white uppercase tracking-tight">
              HARARE REGISTERED COMMISSIONS
            </h2>
            <p className="text-xs text-industrial-steel mt-1 font-sans">
              Authentic review of sheet metal products processed and ready for dispatch at our Workington facility.
            </p>
          </div>
        </motion.div>

        {/* Filter Categories Menu */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-industrial-steel/10 pb-4 font-sans justify-start">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2 px-4 cursor-pointer text-xs uppercase font-bold tracking-wider transition-all border rounded-xs ${activeCategory === cat.id ? "bg-industrial-orange text-white border-industrial-orange shadow-md" : "bg-industrial-blue/15 border-industrial-steel/20 text-industrial-steel hover:border-industrial-steel/45"}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
            const productImg = getProductImage(item.id, item.category);

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="bg-[#142031] border border-industrial-steel/15 flex flex-col justify-between group overflow-hidden shadow-xl"
              >
                {/* Visual Image container */}
                <div className="relative aspect-video w-full bg-industrial-dark overflow-hidden border-b border-industrial-steel/10">
                  <img 
                    src={productImg}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale brightness-90 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category overlay tags */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-industrial-dark/80 text-[9px] font-mono uppercase tracking-wider text-industrial-steel border border-industrial-steel/30">
                    {item.category}
                  </div>

                  {/* Eye look focus details overlay */}
                  <button 
                    onClick={() => setSelectedPhotoItem(item)}
                    className="absolute inset-0 bg-industrial-dark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer"
                    aria-label={`View expanded image of ${item.title}`}
                  >
                    <div className="p-3 bg-industrial-orange text-white border-b-2 border-red-800 shadow-lg">
                      <Eye className="w-5 h-5" />
                    </div>
                  </button>
                </div>

                {/* Narrative Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 font-sans">
                    <span className="font-mono text-[9px] text-industrial-orange uppercase font-bold tracking-widest">PROCESSED WORKS SPEC</span>
                    <h3 className="text-sm md:text-md uppercase font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Specifications bracket */}
                  <div className="bg-industrial-dark/50 border border-industrial-steel/10 p-3 text-[10px] space-y-1.5 font-mono text-industrial-steel">
                    <div className="flex justify-between">
                      <span>DIMENSIONS:</span>
                      <strong className="text-white text-right truncate max-w-[150px]">{item.dimensions}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>MATERIAL GA:</span>
                      <strong className="text-white text-right truncate max-w-[150px]">{item.material}</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

        {/* Empty placeholder */}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center border-2 border-dashed border-industrial-steel/20 bg-industrial-blue/15 text-industrial-steel">
            <p className="font-mono text-xs">No logged drawings match this filter.</p>
          </div>
        )}

      </div>

      {/* Expanded Modal Photo / Spec Viewer */}
      <AnimatePresence>
      {selectedPhotoItem && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div 
            className="absolute inset-0 bg-industrial-dark/95 cursor-pointer"
            onClick={() => setSelectedPhotoItem(null)}
          ></div>
          
          <div className="relative w-full max-w-3xl bg-[#131d2a] border border-industrial-steel/30 shadow-2xl overflow-hidden font-sans">
            <div className="h-1 bg-industrial-orange w-full"></div>
            
            <button 
              onClick={() => setSelectedPhotoItem(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white bg-industrial-dark/80 border border-industrial-steel/25 rounded-xs cursor-pointer z-20"
              aria-label="Close photo view"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              <div className="md:col-span-7 bg-industrial-dark relative flex items-center justify-center">
                <img 
                  src={getProductImage(selectedPhotoItem.id, selectedPhotoItem.category)}
                  alt={selectedPhotoItem.title}
                  className="w-full h-auto object-contain max-h-[50vh] md:max-h-[75vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-5 p-6 flex flex-col justify-between text-sm space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-xs text-industrial-orange uppercase font-bold tracking-widest">{selectedPhotoItem.category} category</span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mt-1">{selectedPhotoItem.title}</h3>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                    {selectedPhotoItem.description}
                  </p>

                  <div className="border border-industrial-steel/25">
                    <div className="bg-industrial-dark px-3 py-1.5 border-b border-industrial-steel/20 font-mono text-[10px] text-industrial-steel uppercase">
                      Engineering Metrics
                    </div>
                    <div className="divide-y divide-industrial-steel/10 p-3 space-y-2 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-industrial-steel">Profile sizing:</span>
                        <span className="text-white font-bold">{selectedPhotoItem.dimensions}</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-industrial-steel">Material Grade:</span>
                        <span className="text-white font-bold">{selectedPhotoItem.material}</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-industrial-steel">Workshop Status:</span>
                        <span className="text-green-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Delivered</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPhotoItem(null)}
                  className="w-full bg-industrial-orange text-white uppercase font-bold text-xs tracking-widest py-3 border-b-2 border-red-800 transition-all cursor-pointer hover:brightness-115"
                >
                  Return to Register
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
