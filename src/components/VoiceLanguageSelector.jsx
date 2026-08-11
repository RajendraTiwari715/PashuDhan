import React, { useState } from 'react';
import { Volume2, VolumeX, Globe } from 'lucide-react';
import { LANGUAGE_OPTIONS, speakGuidance } from '../services/voiceGuidance';
import { useLanguage } from '../context/LanguageContext';

export const VoiceLanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    changeLanguage(newLang);
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 4000);
  };

  const handleSpeakClick = () => {
    setIsSpeaking(true);
    speakGuidance('welcome', language);
    setTimeout(() => setIsSpeaking(false), 4000);
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

      <button
        onClick={handleSpeakClick}
        className="p-1 text-emerald-400 hover:text-emerald-300 transition-colors"
        title="आवाज निर्देश सुनें (Voice Guidance)"
      >
        {isSpeaking ? (
          <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>
    </div>
  );
};