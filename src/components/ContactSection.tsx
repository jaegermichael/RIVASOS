import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Check, HardHat, ExternalLink } from "lucide-react";
import { COMPANY_DETAILS } from "../data/industrialData";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !msg) {
      alert("Name and message are required inputs.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMsg("");
      setSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 relative bg-gradient-to-b from-[#0d141e] to-industrial-dark overflow-hidden">
      {/* Background blueprint details */}
      <div className="absolute inset-0 steel-grid opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Header Block */}
        <div className="border-b border-industrial-steel/10 pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="h-[2px] w-8 bg-industrial-orange"></span>
              <span className="font-mono text-xs text-industrial-orange uppercase tracking-widest font-bold">WORKINGTON HQ REGISTER</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white uppercase tracking-tight">
              CONNECT WITH OUR TEAM
            </h2>
            <p className="text-xs text-industrial-steel font-sans">
              Visit our core sheet fabrication workshop on Bristol Road or lodge electronic channels below.
            </p>
          </div>
        </div>

        {/* Triple Block Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Core details card */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="bg-industrial-blue/15 border border-industrial-steel/15 p-6 space-y-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-industrial-orange font-bold uppercase tracking-wider block">PHYSICAL STATIONS</span>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mt-1 mb-4 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-industrial-orange shrink-0" />
                  <span>Harare Plant Location</span>
                </h3>

                <div className="font-sans text-xs text-gray-300 space-y-3">
                  <div className="bg-industrial-dark p-3 border border-industrial-steel/10">
                    <strong className="text-white uppercase text-[11px] block text-industrial-orange">WAREHOUSE ACCESS:</strong>
                    <p className="mt-1 leading-normal">
                      Rivasos Enterprises Pvt Ltd,<br />
                      {COMPANY_DETAILS.address} <br />
                      (Workington Heavy Industrial Sector)
                    </p>
                  </div>
                  
                  <p className="leading-relaxed text-industrial-steel font-mono text-[10px]">
                    <em>Directions Note:</em> Located off Lyton Rd / Coventry Rd. Directly adjacent to major steel distribution points in Workington.
                  </p>
                </div>
              </div>

              {/* Direct Link triggers */}
              <a 
                href="https://maps.google.com/?q=15+Bristol+Rd,+Workington,+Harare"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 border border-industrial-steel/30 hover:border-industrial-orange hover:bg-industrial-orange/10 text-white font-mono text-[10px] uppercase font-bold tracking-widest transition-all mt-4 flex items-center justify-center space-x-1.5"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Helpline quick contacts */}
            <div className="bg-industrial-blue/15 border border-industrial-steel/15 p-6 space-y-4">
              <span className="font-mono text-[10px] text-industrial-orange font-bold uppercase tracking-wider block leading-none">COMMERCIAL HELPLINES</span>
              
              <div className="space-y-3 text-xs font-sans">
                <a href={`tel:${COMPANY_DETAILS.hotline1}`} className="flex items-center space-x-3 text-white hover:text-industrial-orange transition-all">
                  <div className="p-2 bg-industrial-dark border border-industrial-steel/10">
                    <Phone className="w-4 h-4 text-industrial-orange" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-industrial-steel block leading-none">PRIMARY HOTLINE</span>
                    <strong className="block text-white mt-1 font-mono">{COMPANY_DETAILS.hotline1}</strong>
                  </div>
                </a>

                <a href={`tel:${COMPANY_DETAILS.hotline2}`} className="flex items-center space-x-3 text-white hover:text-industrial-orange transition-all">
                  <div className="p-2 bg-industrial-dark border border-industrial-steel/10">
                    <Phone className="w-4 h-4 text-industrial-orange" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-industrial-steel block leading-none">SECONDARY HOTLINE</span>
                    <strong className="block text-white mt-1 font-mono">{COMPANY_DETAILS.hotline2}</strong>
                  </div>
                </a>

                <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center space-x-3 text-white hover:text-industrial-orange transition-all">
                  <div className="p-2 bg-industrial-dark border border-industrial-steel/10">
                    <Mail className="w-4 h-4 text-industrial-orange" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-industrial-steel block leading-none">DIRECT ELECTRONIC INBOX</span>
                    <strong className="block text-white mt-1">{COMPANY_DETAILS.email}</strong>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Interactive inquiry form */}
          <div className="lg:col-span-4 bg-industrial-blue/15 border border-industrial-steel/15 p-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-industrial-orange font-bold uppercase tracking-wider block">CONTACT SHEETS</span>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mt-1 mb-4 flex items-center space-x-2">
                <Send className="w-5 h-5 text-industrial-orange shrink-0 animate-pulse" />
                <span>Transmit Message</span>
              </h3>

              {success ? (
                <div className="bg-[#122312] border border-green-500/35 p-6 text-center space-y-3 rounded-none text-green-300 animate-zoom-in my-auto h-full flex flex-col justify-center">
                  <Check className="w-8 h-8 text-green-500 mx-auto bg-green-500/10 p-1.5 rounded-full border border-green-500/20" />
                  <h4 className="font-bold text-white uppercase tracking-wide text-xs">TRANSMITTED TO WORKSHOP OFFICE</h4>
                  <p className="text-[11px] leading-relaxed text-green-400">
                    Your inquiry message has been compiled on the Harare station servers. We will callback within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[9px] font-mono text-industrial-steel uppercase tracking-widest mb-1">CONTRACTOR NAME / FIRM *</label>
                    <input 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zim-Build Civil Engineers"
                      className="w-full bg-industrial-dark border border-industrial-steel/20 text-white text-xs px-3 py-2 focus:outline-none focus:border-industrial-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-industrial-steel uppercase tracking-widest mb-1">EMAIL INDEX</label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="myemail@company.co.zw"
                      className="w-full bg-industrial-dark border border-industrial-steel/20 text-white text-xs px-3 py-2 focus:outline-none focus:border-industrial-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-industrial-steel uppercase tracking-widest mb-1">SUBJECT MATTER</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-industrial-dark border border-industrial-steel/20 text-white text-xs px-3 py-2 focus:outline-none focus:border-industrial-orange"
                    >
                      <option value="Door Frame Orders">Bulk Door Frame Processing</option>
                      <option value="Bending & Cutting">Press Bending & Guillotine Cutting</option>
                      <option value="Custom Silos/Hopper">Heavy Custom Fabrication</option>
                      <option value="General Inquiries">Other/General Price Checks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono text-industrial-steel uppercase tracking-widest mb-1">MESSAGE DETAILS *</label>
                    <textarea 
                      required
                      rows={3}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="State length specifications, dimensions, quantities required..."
                      className="w-full bg-industrial-dark border border-industrial-steel/20 text-white text-xs px-3 py-2 focus:outline-none focus:border-industrial-orange resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full text-center py-3 bg-gradient-to-r from-industrial-orange to-red-600 hover:brightness-110 border-b-2 border-red-800 text-white font-mono text-[10px] uppercase font-bold tracking-widest mt-4 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Lodge Message Sheet</span>
                    <span>→</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-industrial-steel/10 mt-4 text-[10px] font-mono text-industrial-steel text-center">
              Direct connection protected by SABS verification protocols.
            </div>
          </div>

          {/* Column 3: Custom CAD drawing Workington layout Map */}
          <div className="lg:col-span-4 bg-[#0b141e] border border-industrial-steel/20 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
            {/* Map blueprint lines */}
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none"></div>

            {/* Drawing Metadata Header */}
            <div className="p-4 bg-industrial-blue/30 border-b border-industrial-steel/15 flex justify-between items-center text-[9px] font-mono text-industrial-steel z-10 relative">
              <span>CAD SECTION: HARARE-WORKINGTON</span>
              <span>DWG NO: RVS-M09</span>
            </div>

            {/* Custom Vector Blueprint Map */}
            <div className="relative flex-1 p-6 flex items-center justify-center z-10">
              <svg viewBox="0 0 160 140" className="w-full h-full text-industrial-steel max-w-[280px]">
                {/* Horizontal main axis: Bristol Rd */}
                <line x1="10" y1="70" x2="150" y2="70" stroke="#134074" strokeWidth="12" strokeLinecap="round" />
                <line x1="10" y1="70" x2="150" y2="70" stroke="#0b141e" strokeWidth="0.5" strokeDasharray="3,3" />
                <text x="75" y="72" fill="#8da9c4" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">BRISTOL ROAD</text>

                {/* Vertical intersecting track Lyton Road */}
                <line x1="30" y1="10" x2="30" y2="130" stroke="#134074" strokeWidth="10" strokeLinecap="round" />
                <text x="21" y="45" fill="#8da9c4" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold" transform="rotate(-90, 21, 45)">LYTON ROAD</text>

                {/* Sub-streets Plymouth Road */}
                <line x1="95" y1="10" x2="95" y2="130" stroke="#134074" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                <text x="101" y="110" fill="#8da9c4" fontSize="4.5" fontFamily="monospace" opacity="0.6">PLYMOUTH RD</text>

                {/* Surrounding warehouse quadrants */}
                <rect x="50" y="25" width="25" height="15" fill="rgba(19, 64, 116, 0.15)" stroke="#134074" strokeWidth="0.5" />
                <text x="62.5" y="34" fill="#134074" fontSize="4" fontFamily="serif" textAnchor="middle">IND GRID</text>

                <rect x="50" y="100" width="25" height="15" fill="rgba(19, 64, 116, 0.15)" stroke="#134074" strokeWidth="0.5" />
                <text x="62.5" y="109" fill="#134074" fontSize="4" fontFamily="serif" textAnchor="middle">DEPOT 12</text>

                {/* Rivasos Plant Warehouse Location at 15 Bristol Rd */}
                <rect x="75" y="80" width="35" height="20" fill="rgba(242, 100, 25, 0.12)" stroke="#f26419" strokeWidth="1" strokeDasharray="1,1" />
                <text x="92.5" y="90" fill="#f26419" fontSize="5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RIVASOS HQ</text>
                <text x="92.5" y="96" fill="#f26419" fontSize="3.5" fontFamily="monospace" textAnchor="middle">15 BRISTOL RD</text>

                {/* Custom glowing location pin */}
                <g transform="translate(92.5, 76)">
                  <circle cx="0" cy="0" r="4" fill="#f26419" className="animate-ping" />
                  <ellipse cx="0" cy="0" rx="3" ry="3" fill="#f26419" stroke="#ffffff" strokeWidth="0.5" />
                </g>

                {/* Scale & compass watermarks */}
                <g transform="translate(135, 25)" opacity="0.6">
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="#8da9c4" strokeWidth="0.5" />
                  <line x1="-8" y1="0" x2="8" y2="0" stroke="#8da9c4" strokeWidth="0.5" />
                  <text x="0" y="-10" fill="#8da9c4" fontSize="5" textAnchor="middle" fontFamily="monospace">N</text>
                </g>
              </svg>
            </div>

            {/* Operating Times Section with industrial lock icon details */}
            <div className="p-4 bg-industrial-dark border-t border-industrial-steel/15 text-[10px] sm:text-xs font-sans text-gray-300">
              <strong className="text-white block uppercase mb-1 flex items-center space-x-1.5 font-mono text-[9px] text-[#29b6f6]">
                <Clock className="w-3.5 h-3.5 text-industrial-orange" />
                <span>OFFICE ACCESS GATES HOURS</span>
              </strong>
              <div className="flex justify-between font-mono text-[10px] text-industrial-steel leading-none">
                <span>Mon — Fri:</span>
                <span className="text-white font-bold">07:30 — 17:00</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-industrial-steel leading-none mt-1.5">
                <span>Saturday:</span>
                <span className="text-white font-bold">08:00 — 13:00</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
