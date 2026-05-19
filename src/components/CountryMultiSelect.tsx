import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckSquare, Square } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { CHANNEL_CATEGORIES } from '../constants';

const countriesList = [
  "United States of America", "Canada", "United Kingdom", "Afghanistan", "Africa", "Albania", "Arabic", "Armenia", "Australia", 
  "Azerbaijan", "Belgium", "Brazil", "Bulgaria", "Caribbean", "China/HK", "Czech", "Estonia", "France", "Georgia/Kazach", 
  "Germany", "Greece", "Hungary", "India", "India Punjab", "Indonesia", "Iran", "Israel", "Italy", "Japan", "Korea", 
  "Kurdistan", "Latino", "Latvia", "Lithuania", "Malaysia", "Malta", "Myanmar", "Netherlands", "New Zealand", "Pakistan", 
  "Philippines", "Poland", "Portugal", "Romania", "Russia", "SCA - Denmark", "SCA - Finland", "SCA - Iceland", "SCA - Norway", 
  "SCA - Sweden", "Singapore", "Slovenia", "Spain", "Suriname", "Swiss/Austria", "Taiwan", "Tajikistan", "Thailand", 
  "Turkey", "Ukraine", "Uzbekistan", "Vietnam", "Yugoslavia"
];

interface CountryMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export const CountryMultiSelect = React.memo(({ selected, onChange, error }: CountryMultiSelectProps) => {
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
    if (selected.length === countriesList.length) {
      onChange([]);
    } else {
      onChange([...countriesList]);
    }
  };

  const handleSelect = (e: React.MouseEvent, country: string) => {
    e.stopPropagation();
    if (selected.includes(country)) {
      onChange(selected.filter(c => c !== country));
    } else {
      onChange([...selected, country]);
    }
  };

  const isAllSelected = selected.length === countriesList.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`w-full bg-black/40 border rounded-xl px-5 py-4 cursor-pointer flex justify-between items-center transition-colors ${
          error ? 'border-red-500 bg-red-500/5' : 'border-white/10 hover:border-white/20'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="truncate text-slate-200">
          {selected.length === 0 ? <span className="text-slate-700">Select countries...</span> : 
           selected.length === countriesList.length ? "All Countries Selected" : 
           selected.length > 2 ? `${selected.length} countries selected` : selected.join(', ')}
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
            {countriesList.map(country => {
              const isSelected = selected.includes(country);
              // Find country flag from CHANNEL_CATEGORIES
              let flagOrIcon = null;
              for (const cat of CHANNEL_CATEGORIES) {
                const found = cat.channels.find(c => c.name === country);
                if (found) {
                  flagOrIcon = 'flag' in found ? found.flag : found.icon;
                  break;
                }
              }
              
              let flagContent = null;
              if (flagOrIcon) {
                if (typeof flagOrIcon === 'string') {
                  const chars = [...flagOrIcon];
                  if (chars.length === 2) {
                    const c1 = chars[0].codePointAt(0);
                    const c2 = chars[1].codePointAt(0);
                    if (c1 && c2 && c1 >= 127462 && c1 <= 127487 && c2 >= 127462 && c2 <= 127487) {
                      const code = (String.fromCharCode(c1 - 127397) + String.fromCharCode(c2 - 127397));
                      flagContent = <ReactCountryFlag countryCode={code.toUpperCase()} svg style={{ width: '0.8em', height: '0.8em' }} />;
                    }
                  }
                }
                if (!flagContent) {
                  flagContent = <span className="text-[20px] leading-none">{flagOrIcon}</span>;
                }
              }

              return (
                <div 
                  key={country}
                  className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={(e) => handleSelect(e, country)}
                >
                  {isSelected ? <CheckSquare className="h-4 w-4 text-primary shrink-0" /> : <Square className="h-4 w-4 text-slate-500 shrink-0" />}
                  {flagContent && <div className="flex items-center justify-center w-7">{flagContent}</div>}
                  <span className="text-sm text-slate-300">{country}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
