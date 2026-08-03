import React from 'react';
import { Dog, Cat, Feather, Sparkles, Heart } from 'lucide-react';
import { PetContext } from '../types';

interface PetSelectorProps {
  selectedPet: string | null;
  onSelectPet: (petType: string | null) => void;
}

export const PET_OPTIONS: PetContext[] = [
  { type: 'dog', label: 'Dogs', icon: 'Dog' },
  { type: 'cat', label: 'Cats', icon: 'Cat' },
  { type: 'exotic', label: 'Birds & Reptiles', icon: 'Feather' },
  { type: 'pocket', label: 'Pocket Pets', icon: 'Heart' },
];

export const PetSelector: React.FC<PetSelectorProps> = ({ selectedPet, onSelectPet }) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 text-xs">
      <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-[#0B4F6C]" />
        <span>Pet:</span>
      </span>

      <button
        onClick={() => onSelectPet(null)}
        className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all shrink-0 ${
          selectedPet === null
            ? 'bg-[#0B4F6C] text-white shadow-2xs'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
        id="pet-tag-all"
      >
        All Animals
      </button>

      {PET_OPTIONS.map((pet) => (
        <button
          key={pet.type}
          onClick={() => onSelectPet(selectedPet === pet.type ? null : pet.type)}
          className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
            selectedPet === pet.type
              ? 'bg-[#0B4F6C] text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          id={`pet-tag-${pet.type}`}
        >
          {pet.type === 'dog' && <Dog className="w-3 h-3" />}
          {pet.type === 'cat' && <Cat className="w-3 h-3" />}
          {pet.type === 'exotic' && <Feather className="w-3 h-3" />}
          {pet.type === 'pocket' && <Heart className="w-3 h-3" />}
          <span>{pet.label}</span>
        </button>
      ))}
    </div>
  );
};
