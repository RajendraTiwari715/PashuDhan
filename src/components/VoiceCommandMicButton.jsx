import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { VoiceCommandSearchEngine } from '../services/voiceCommandSearch';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";










export const VoiceCommandMicButton = ({
  onSearchTag,
  onOpenScanner,
  onOpenLinkTag,
  onNavigateHome,
  onNavigateAdmin
}) => {
  const [isListening, setIsListening] = useState(false);

  const handleMicToggle = () => {
    const engine = new VoiceCommandSearchEngine({
      onSearchTag,
      onOpenScanner,
      onOpenLinkTag,
      onNavigateHome,
      onNavigateAdmin
    });

    if (isListening) {
      engine.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      engine.startListening();
      setTimeout(() => setIsListening(false), 7000);
    }
  };

  return (/*#__PURE__*/
    _jsxDEV("button", {
      onClick: handleMicToggle,
      className: `p-2 rounded-xl border transition-all flex items-center gap-1.5 ${
      isListening ?
      'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse shadow-glow-rose' :
      'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'}`,

      title: "माइक वॉयस कमांड दबाएं (उदा. \"टैग 1001\" या \"स्कैन करो\")", children:

      isListening ? /*#__PURE__*/
      _jsxDEV(_Fragment, { children: [/*#__PURE__*/
        _jsxDEV(Mic, { className: "w-4 h-4 text-rose-400 animate-bounce" }, void 0, false), /*#__PURE__*/
        _jsxDEV("span", { className: "text-[10px] font-bold font-mono text-rose-300 hidden sm:inline", children: "सुन रहा है..." }, void 0, false)] }, void 0, true
      ) : /*#__PURE__*/

      _jsxDEV(Mic, { className: "w-4 h-4 text-amber-400" }, void 0, false) }, void 0, false

    ));

};