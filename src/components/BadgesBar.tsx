import React from 'react';
import { ShieldCheck, CreditCard, Award, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/faqData';

export const BadgesBar: React.FC = () => {
  return (
    <div className="bg-[#F0F7FA] border-y border-slate-200 py-2.5 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-2 text-xs text-slate-700">
        <div className="flex items-center gap-1.5 font-medium text-[#004A68]">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Gold Standard Caring & Gentle Pet Care</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {CLINIC_INFO.badges.map((badge, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-full border border-slate-200 text-slate-800 shadow-2xs text-[11px] font-medium"
              id={`badge-item-${idx}`}
            >
              {badge.type === 'payment' ? (
                <CreditCard className="w-3 h-3 text-[#00A3C4]" />
              ) : badge.label.includes('PennHIP') ? (
                <Award className="w-3 h-3 text-amber-500" />
              ) : (
                <ShieldCheck className="w-3 h-3 text-blue-600" />
              )}
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
