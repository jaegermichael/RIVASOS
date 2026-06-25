import React, { useState, useEffect } from "react";
import { Phone, Mail, Clock, ShieldAlert, Menu, X, ArrowRight } from "lucide-react";
import { COMPANY_DETAILS } from "../data/industrialData";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [harareTime, setHarareTime] = useState("");

  // Update Harare Time (UTC+2)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Harare is in CAT (Central Africa Time), UTC+2
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const harareOffset = 2; // Hours
      const hDate = new Date(utc + 3600000 * harareOffset);
      
      const timeString = hDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setHarareTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "gallery", label: "Work Showcase" },
    { id: "quote", label: "Estimate & Quote" },
    { id: "contact", label: "Contact Us" },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // offset for sticky navbar
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-industrial-dark border-b border-industrial-light-blue/40 text-gray-300 py-2 px-4 md:px-8 text-xs font-mono hidden md:flex justify-between items-center bg-opacity-95 backdrop-blur-md">
        <div className="flex items-center space-x-6">
          <a href={`tel:${COMPANY_DETAILS.hotline1}`} className="flex items-center space-x-2 hover:text-industrial-orange transition-colors">
            <Phone className="w-3.5 h-3.5 text-industrial-orange" />
            <span>HQ Call Centre: {COMPANY_DETAILS.hotline1}</span>
          </a>
          <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center space-x-2 hover:text-industrial-orange transition-colors">
            <Mail className="w-3.5 h-3.5 text-industrial-steel" />
            <span>{COMPANY_DETAILS.email}</span>
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-industrial-steel">
            <Clock className="w-3.5 h-3.5 text-industrial-orange" />
            <span>Harare Office Local Time: <strong className="text-white font-mono">{harareTime || "08:00"}</strong> (CAT)</span>
          </div>
          <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-green-500/10 text-green-400 rounded-sm text-[10px] uppercase font-bold tracking-wider animate-pulse border border-green-500/20">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>Workshop Online</span>
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <nav className={`transition-all duration-300 py-3 px-4 md:px-8 flex justify-between items-center ${scrolled ? "bg-industrial-dark/95 backdrop-blur-md border-b border-industrial-steel/20 shadow-lg py-3" : "bg-industrial-blue/90 md:bg-industrial-blue/40 backdrop-blur-sm border-b border-white/5 py-4"}`}>
        {/* Logo Section modeled after card blueprint */}
        <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => scrollTo("home")} id="nav-logo">
          {/* Stylized geometric metallic steel panels logo */}
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-industrial-blue to-industrial-dark border border-industrial-steel/40 shadow-inner overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent"></div>
            {/* 4 parallel steel layers modeled after Rivasos brand card, combining blue, steel, and orange fold slats */}
            <div className="flex items-end space-x-[2px] h-6">
              <div className="w-[4px] h-3 bg-industrial-steel border border-white/10 rounded-xs shadow-xs transform skew-y-12"></div>
              <div className="w-[4px] h-5 bg-industrial-light-blue border border-white/10 rounded-xs shadow-xs transform -skew-y-12"></div>
              <div className="w-[4px] h-6 bg-industrial-orange rounded-xs shadow-xs transform skew-y-12"></div>
              <div className="w-[4px] h-4 bg-industrial-gold rounded-xs shadow-xs transform -skew-y-12"></div>
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-1 leading-none">
              <span className="font-sans font-bold text-lg md:text-xl text-white tracking-tight uppercase">Rivasos</span>
              <span className="font-sans font-medium text-xs text-industrial-orange uppercase tracking-widest font-mono">Pvt Ltd</span>
            </div>
            <p className="text-[9px] font-mono tracking-widest text-industrial-steel uppercase block leading-none mt-0.5">Sheet Metal Fabrication</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-1 font-sans text-sm font-medium">
          {navItems.map((item) => {
            const isContact = item.id === "contact";
            const isActive = activeSection === item.id;
            
            if (isContact) return null; // handle separately at the end

            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`py-2 px-3.5 cursor-pointer relative transition-all duration-200 uppercase tracking-wider text-xs ${isActive ? "text-industrial-orange font-bold font-sans" : "text-gray-300 hover:text-white"}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-industrial-orange"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button for Contact and Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => scrollTo("quote")}
            className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-industrial-orange to-red-600 hover:from-industrial-orange hover:to-orange-500 text-white font-sans text-xs font-semibold uppercase tracking-wider py-2 px-4 shadow-md border-b-2 border-red-800 active:translate-y-[1px] cursor-pointer"
          >
            <span>Request Fast Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={() => scrollTo("contact")}
            className="hidden lg:flex items-center space-x-1.5 border border-industrial-steel/40 hover:border-industrial-orange text-white text-xs uppercase tracking-wider py-2 px-3.5 transition-colors cursor-pointer"
          >
            <span>Talk to MD</span>
          </button>

          {/* Hamburger Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white bg-industrial-dark/50 border border-industrial-steel/20 rounded-xs cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden fixed left-0 right-0 top-[70px] md:top-[103px] bg-industrial-dark/95 backdrop-blur-lg border-b border-industrial-steel/20 shadow-2xl py-6 px-4 animate-fade-in z-45 max-h-[calc(100vh-100px)] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left py-3 px-4 border-l-2 transition-colors uppercase font-sans text-xs tracking-wider cursor-pointer ${isActive ? "border-industrial-orange bg-industrial-orange/10 text-industrial-orange font-bold" : "border-transparent text-gray-300 hover:text-white"}`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-industrial-steel/10 flex flex-col space-y-4">
              <a href={`tel:${COMPANY_DETAILS.hotline1}`} className="flex items-center space-x-3 text-xs text-industrial-steel px-4">
                <Phone className="w-4 h-4 text-industrial-orange" />
                <span>Call {COMPANY_DETAILS.hotline1}</span>
              </a>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center space-x-3 text-xs text-industrial-steel px-4">
                <Mail className="w-4 h-4 text-industrial-orange" />
                <span>{COMPANY_DETAILS.email}</span>
              </a>
              <button 
                onClick={() => scrollTo("quote")}
                className="w-full text-center bg-industrial-orange text-white text-xs uppercase tracking-widest py-3 font-semibold shadow-md active:translate-y-[1px] cursor-pointer"
              >
                Launch Quote Calculator
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
