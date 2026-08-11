import React, { useState } from 'react';
import { Volume2, VolumeX, Globe } from 'lucide-react';
import { LANGUAGE_OPTIONS, speakGuidance } from '../services/voiceGuidance';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";


export const VoiceLanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('hi');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLang(newLang);
    setIsSpeaking(true);
    speakGuidance('welcome', newLang);
    setTimeout(() => setIsSpeaking(false), 4000);
  };

  const handleSpeakClick = () => {
    setIsSpeaking(true);
    speakGuidance('welcome', selectedLang);
    setTimeout(() => setIsSpeaking(false), 4000);
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1", children: [/*#__PURE__*/
      _jsxDEV(Globe, { className: "w-3.5 h-3.5 text-amber-400 shrink-0" }, void 0, false), /*#__PURE__*/
      _jsxDEV("select", {
        value: selectedLang,
        onChange: handleLanguageChange,
        className: "bg-transparent text-[11px] font-bold text-slate-200 focus:outline-none cursor-pointer font-mono", children:

        LANGUAGE_OPTIONS.map((opt) => /*#__PURE__*/
        _jsxDEV("option", { value: opt.code, className: "bg-slate-900 text-white", children:
          opt.label }, opt.code, false
        )
        ) }, void 0, false
      ), /*#__PURE__*/

      _jsxDEV("button", {
        onClick: handleSpeakClick,
        className: "p-1 text-emerald-400 hover:text-emerald-300 transition-colors",
        title: "आवाज निर्देश सुनें (Voice Guidance)", children:

        isSpeaking ? /*#__PURE__*/
        _jsxDEV(Volume2, { className: "w-3.5 h-3.5 text-emerald-400 animate-pulse" }, void 0, false) : /*#__PURE__*/

        _jsxDEV(VolumeX, { className: "w-3.5 h-3.5 text-slate-400" }, void 0, false) }, void 0, false

      )] }, void 0, true
    ));

};