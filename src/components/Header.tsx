import React from 'react';
import { Phone, Calendar, MapPin, HeartHandshake } from 'lucide-react';
import { CLINIC_INFO } from '../data/faqData';

interface HeaderProps {
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInfo }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Main header banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <img
            src={CLINIC_INFO.logoUrl}
            alt="Marlin Coast Veterinary Hospital Logo"
            className="h-14 md:h-16 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="hidden sm:block h-10 w-px bg-slate-200" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#0B4F6C] flex items-center justify-center md:justify-start gap-2">
              <span>Marlin Coast</span>
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">
              Veterinary Hospital
            </p>
          </div>
        </div>

        {/* Quick persistent actions */}
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-end">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
              Emergency & Bookings
            </p>
            <a
              href={`tel:${CLINIC_INFO.phoneClean}`}
              className="text-base md:text-lg font-bold text-[#0B4F6C] hover:text-[#10B981] transition-colors flex items-center justify-end gap-1.5"
              id="header-call-btn"
            >
              <Phone className="w-4 h-4 text-[#10B981]" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
          </div>

          <button
            onClick={onOpenInfo}
            className="px-3.5 py-2.5 text-xs font-semibold text-[#0B4F6C] bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-full transition-colors flex items-center gap-1.5"
            title="Clinic details & trading hours"
            id="clinic-info-btn"
          >
            <HeartHandshake className="w-4 h-4 text-[#0B4F6C]" />
            <span>Clinic Details</span>
          </button>

          <a
            href={CLINIC_INFO.links.bookOnline}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#10B981] hover:bg-[#0ea371] text-white px-5 py-2.5 rounded-full font-semibold text-xs md:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            id="header-book-appointment-link"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </a>
        </div>
      </div>
    </header>
  );
};
