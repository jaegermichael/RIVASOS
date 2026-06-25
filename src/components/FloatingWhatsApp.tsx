import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/industrialData';

export default function FloatingWhatsApp() {
  // Strip spaces from hotline1 to generate valid WhatsApp link
  const cleanNumber = COMPANY_DETAILS.hotline1.replace(/\s+/g, '');
  // Format for Zimbabwe code +263 (assuming local numbers start with 0)
  const formattedNumber = cleanNumber.startsWith('0') ? `263${cleanNumber.substring(1)}` : cleanNumber;
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=Hello%20Rivasos%20Enterprises,%20I%20would%20like%20to%20make%20an%20inquiry.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group border-2 border-white/20"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-industrial-dark border border-industrial-steel/20 text-white text-[10px] font-mono px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
        Chat with Workshop
      </span>
    </a>
  );
}
