import React from 'react';
import { Globe } from 'lucide-react';
import { LANGUAGE_OPTIONS } from '../services/voiceGuidance';
import { useLanguage } from '../context/LanguageContext';

export const VoiceLanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1 shadow-sm">
      <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <select
        value={language}
        onChange={handleLanguageChange}
        className="bg-transparent text-[11px] font-bold text-slate-200 focus:outline-none cursor-pointer font-mono"
      >
        {LANGUAGE_OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code} className="bg-slate-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};