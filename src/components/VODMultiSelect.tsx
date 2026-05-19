import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckSquare, Square } from 'lucide-react';

const vodList = [
  "APPLE+",
  "DISNEY+",
  "ENGLISH 4K, MOVIES & Series",
  "NETFLIX 4K, VOD",
  "TOP 500 IMDB",
  "AFRICA",
  "ALBANIA",
  "ARABIC VOD",
  "BRASIL",
  "BULGARIA",
  "CHINESE",
  "DENMARK VOD",
  "FINLAND VOD",
  "FRANCE 4K,MOVIS & SERIES",
  "GERMANY MOVIES & SERIES",
  "GREECE VOD",
  "HUNGARY",
  "INDIA VOD",
  "IRAN VOD",
  "ISRAEL",
  "ITALY 4K & MOVIES",
  "JAPANESE SUB",
  "MALTA",
  "NETHERLANDS 4K, VOD",
  "NORWAY VOD",
  "PAKISTAN",
  "PHILIPPINES",
  "POLISH VOD",
  "PORTUGAL VOD",
  "QUEBEC",
  "ROMANIA",
  "RUSSIA VOD",
  "SCANDINAVIA MULTI-SUB",
  "SOMALIA",
  "SPAIN VOD",
  "SWEDEN VOD,SERIES & MUSIC",
  "TURKISH VOD",
  "YUGOSLAVIA VOD",
  "SPORT VOD",
  "ADULT VOD"
];

interface VODMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export const VODMultiSelect = React.memo(({ selected, onChange, error }: VODMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected.length === vodList.length) {
      onChange([]);
    } else {
      onChange([...vodList]);
    }
  };

  const handleSelect = (e: React.MouseEvent, vod: string) => {
    e.stopPropagation();
    if (selected.includes(vod)) {
      onChange(selected.filter(c => c !== vod));
    } else {
      onChange([...selected, vod]);
    }
  };

  const isAllSelected = selected.length === vodList.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`w-full bg-black/40 border rounded-xl px-5 py-4 cursor-pointer flex justify-between items-center transition-colors ${
          error ? 'border-red-500 bg-red-500/5' : 'border-white/10 hover:border-white/20'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="truncate text-slate-200">
          {selected.length === 0 ? <span className="text-slate-700">Select VOD & Series Packages...</span> : 
           selected.length === vodList.length ? "All Packages Selected" : 
           selected.length > 2 ? `${selected.length} packages selected` : selected.join(', ')}
        </div>
        <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-[#0c0c0e] border border-white/10 rounded-xl max-h-64 overflow-y-auto shadow-2xl py-2"
          >
            <div 
              className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5"
              onClick={handleSelectAll}
            >
              {isAllSelected ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4 text-slate-500" />}
              <span className="text-sm font-semibold text-slate-200">Select All</span>
            </div>
            {vodList.map(vod => {
              const isSelected = selected.includes(vod);
              return (
                <div 
                  key={vod}
                  className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={(e) => handleSelect(e, vod)}
                >
                  {isSelected ? <CheckSquare className="h-4 w-4 text-primary shrink-0" /> : <Square className="h-4 w-4 text-slate-500 shrink-0" />}
                  <span className="text-sm text-slate-300">{vod}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
