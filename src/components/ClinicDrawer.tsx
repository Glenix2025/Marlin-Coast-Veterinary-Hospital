import React from 'react';
import { X, Phone, Mail, MapPin, Clock, Calendar, ShieldCheck, Heart, UserCheck, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../data/faqData';

interface ClinicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicDrawer: React.FC<ClinicDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 text-slate-800"
        id="clinic-info-modal"
      >
        {/* Modal Header */}
        <div className="bg-[#0B4F6C] text-white p-5 flex items-start justify-between relative">
          <div className="flex items-center gap-3">
            <img
              src={CLINIC_INFO.logoUrl}
              alt="Marlin Coast Vet Logo"
              className="h-10 bg-white p-1 rounded-md"
            />
            <div>
              <h2 className="text-lg font-bold leading-snug">{CLINIC_INFO.name}</h2>
              <p className="text-xs text-sky-200">Trinity Beach, Far North Queensland</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            id="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* About section */}
          <div className="bg-sky-50/70 rounded-xl p-3.5 border border-sky-100 flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#0B4F6C] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-semibold text-[#0B4F6C]">Family Owned & Locally Operated: </span>
              Led by <strong className="text-slate-900">{CLINIC_INFO.owners}</strong>, serving Trinity Beach, Cairns and the Northern Beaches community with a gold standard of care and a caring, gentle approach.
            </div>
          </div>

          {/* Quick contact info */}
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#0B4F6C] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Hospital Address</div>
                <div>{CLINIC_INFO.location}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#0B4F6C] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Trading Hours</div>
                <div>{CLINIC_INFO.tradingHours}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Phone & After Hours Emergency</div>
                <a
                  href={`tel:${CLINIC_INFO.phoneClean}`}
                  className="text-[#0B4F6C] font-bold hover:text-[#10B981] transition-colors"
                >
                  {CLINIC_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#0B4F6C] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Email Address</div>
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="text-[#0B4F6C] hover:underline font-medium"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Accreditation Badges */}
          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-900 mb-2">Accreditations & Payment Options</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CLINIC_INFO.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center gap-2 text-[11px] font-medium text-slate-700"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B4F6C] shrink-0" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={CLINIC_INFO.links.bookOnline}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#10B981] hover:bg-[#0ea371] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Online</span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto" />
            </a>

            <a
              href={CLINIC_INFO.links.orderOnline}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <span>Order Medication or Prescription Food Online</span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
