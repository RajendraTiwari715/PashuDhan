import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { VoiceCommandSearchEngine } from '../services/voiceCommandSearch';

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

    if (!isListening) {
      engine.startListening(
        (transcript) => {
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
      setIsListening(true);
    } else {
      engine.stopListening();
      setIsListening(false);
    }
  };

  return (
    <button
      onClick={handleMicToggle}
      className={`p-2.5 rounded-2xl flex items-center justify-center transition-all ${
        isListening
          ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
      }`}
      title="वॉयस कमांड (उदा. 'टैग खोजो 8821')"
    >
      <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce' : ''}`} />
    </button>
  );
};