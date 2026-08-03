import React from 'react';
import { Calendar, Clock, AlertTriangle, CreditCard, Pill, PawPrint, Stethoscope, Sparkles } from 'lucide-react';
import { QUICK_INTENTS } from '../data/faqData';

interface QuickRepliesProps {
  onSelectIntent: (prompt: string) => void;
  disabled?: boolean;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ onSelectIntent, disabled }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar':
        return <Calendar className="w-3.5 h-3.5 shrink-0" />;
      case 'Clock':
        return <Clock className="w-3.5 h-3.5 shrink-0" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-3.5 h-3.5 shrink-0" />;
      case 'CreditCard':
        return <CreditCard className="w-3.5 h-3.5 shrink-0" />;
      case 'Pill':
        return <Pill className="w-3.5 h-3.5 shrink-0" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  const extraIntents = [
    { label: 'Animals treated', prompt: 'What animals do you treat?' },
    { label: 'Our services', prompt: 'What services does Marlin Coast Veterinary Hospital offer?' },
    { label: 'Microchipping & Laws', prompt: 'Do you provide microchipping?' },
    { label: 'Exotic pets', prompt: 'Do you treat exotic pets like birds and reptiles?' },
  ];

  return (
    <div className="py-2 px-1">
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2">
        <Sparkles className="w-3.5 h-3.5 text-[#0B4F6C]" />
        <span>Quick Questions & Common Intents:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_INTENTS.map((intent) => (
          <button
            key={intent.id}
            onClick={() => onSelectIntent(intent.prompt)}
            disabled={disabled}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all shadow-2xs ${
              intent.id === 'emergency'
                ? 'border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white'
                : intent.id === 'book'
                ? 'border-[#10B981] text-[#0e9f6e] bg-emerald-50/60 hover:bg-[#10B981] hover:text-white'
                : 'border-[#0B4F6C] text-[#0B4F6C] bg-white hover:bg-[#0B4F6C] hover:text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            id={`quick-intent-${intent.id}`}
          >
            {getIcon(intent.iconName)}
            <span>{intent.label}</span>
          </button>
        ))}

        {extraIntents.map((intent, idx) => (
          <button
            key={`extra-${idx}`}
            onClick={() => onSelectIntent(intent.prompt)}
            disabled={disabled}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            id={`extra-intent-${idx}`}
          >
            <PawPrint className="w-3.5 h-3.5 shrink-0" />
            <span>{intent.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
