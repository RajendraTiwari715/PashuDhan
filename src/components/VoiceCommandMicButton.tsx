import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { VoiceCommandSearchEngine } from '../services/voiceCommandSearch';


interface VoiceCommandMicButtonProps {
  onSearchTag: (tagId: string) => void;
  onOpenScanner: () => void;
  onOpenLinkTag: () => void;
  onNavigateHome: () => void;
  onNavigateAdmin: () => void;
}

export const VoiceCommandMicButton: React.FC<VoiceCommandMicButtonProps> = ({
  onSearchTag,
  onOpenScanner,
  onOpenLinkTag,
  onNavigateHome,
  onNavigateAdmin,
}) => {
  const [isListening, setIsListening] = useState(false);

  const handleMicToggle = () => {
    const engine = new VoiceCommandSearchEngine({
      onSearchTag,
      onOpenScanner,
      onOpenLinkTag,
      onNavigateHome,
      onNavigateAdmin,
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

  return (
    <button
      onClick={handleMicToggle}
      className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 ${
        isListening
          ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse shadow-glow-rose'
          : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
      }`}
      title='माइक वॉयस कमांड दबाएं (उदा. "टैग 1001" या "स्कैन करो")'
    >
      {isListening ? (
        <>
          <Mic className="w-4 h-4 text-rose-400 animate-bounce" />
          <span className="text-[10px] font-bold font-mono text-rose-300 hidden sm:inline">सुन रहा है...</span>
        </>
      ) : (
        <Mic className="w-4 h-4 text-amber-400" />
      )}
    </button>
  );
};
