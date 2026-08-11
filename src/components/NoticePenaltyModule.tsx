import React, { useState } from 'react';
import type { Animal } from '../types';
import { OfficialLegalNoticePDF } from './OfficialLegalNoticePDF';
import { ShieldAlert, Clock, CheckCircle2, Lock, Gavel, Printer } from 'lucide-react';


interface NoticePenaltyModuleProps {
  animal: Animal;
  onNoticeUpdated?: () => void;
}

export const NoticePenaltyModule: React.FC<NoticePenaltyModuleProps> = ({ animal }) => {
  const [isOfficialPdfOpen, setIsOfficialPdfOpen] = useState(false);

  const getOffenseBadge = (level: 1 | 2 | 3) => {
    switch (level) {
      case 1:
        return (
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> प्रथम उल्लंघन (1st Offense Notice)
          </span>
        );
      case 2:
        return (
          <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> द्वितीय उल्लंघन (2nd Offense Notice)
          </span>
        );
      case 3:
        return (
          <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Gavel className="w-3.5 h-3.5 text-purple-400" /> तृतीय उल्लंघन (3rd Offense Seizure)
          </span>
        );
    }
  };

  const currentViolations = animal.priorViolationsCount || 0;
  const activeNotice = animal.activeNotices[0];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl animate-fadeIn">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
              ई-नोटिस व पेनल्टी इंजन (Penalties Engine)
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            उल्लंघन रिकॉर्ड एवं 48-घंटे का समाधान टाइमर
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {getOffenseBadge((Math.min(currentViolations, 3) || 1) as 1 | 2 | 3)}
          
          <button
            onClick={() => setIsOfficialPdfOpen(true)}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>शासकीय विधिक नोटिस PDF</span>
          </button>
        </div>
      </div>

      {/* Offense Level Step Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Level 1: Warning Notice */}
        <div className={`p-5 rounded-2xl border transition-all ${
          currentViolations >= 1
            ? 'bg-amber-950/30 border-amber-500/50 shadow-glow-amber'
            : 'bg-slate-950/50 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-mono text-amber-400">उल्लंघन 1: 1st Offense</span>
            {currentViolations >= 1 && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </div>
          <h4 className="text-sm font-bold text-white mb-1">48-घंटे चेतावनी ई-नोटिस</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            पशु के 500m फेंस पार करने पर एसएमएस व ऐप द्वारा चेतावनी प्रेषित की जाती है। 48 घंटे में समाधान आवश्यक।
          </p>
        </div>

        {/* Level 2: Heavy Violation */}
        <div className={`p-5 rounded-2xl border transition-all ${
          currentViolations >= 2
            ? 'bg-rose-950/30 border-rose-500/50 shadow-glow-rose'
            : 'bg-slate-950/50 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-mono text-rose-400">उल्लंघन 2: 2nd Offense</span>
            {currentViolations >= 2 && <ShieldAlert className="w-4 h-4 text-rose-400" />}
          </div>
          <h4 className="text-sm font-bold text-white mb-1">प्रोफ़ाइल ब्लॉक अंतिम चेतावनी</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            द्वितीय उल्लंघन पर प्रोफ़ाइल ब्लॉक चेतावनी पत्र जारी होता है तथा पुलिस पेट्रोलिंग अलर्ट भेजा जाता है।
          </p>
        </div>

        {/* Level 3: Seizure Order */}
        <div className={`p-5 rounded-2xl border transition-all ${
          currentViolations >= 3
            ? 'bg-purple-950/40 border-purple-500/60 shadow-lg'
            : 'bg-slate-950/50 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-mono text-purple-400">उल्लंघन 3: 3rd Offense</span>
            {currentViolations >= 3 && <Lock className="w-4 h-4 text-purple-400" />}
          </div>
          <h4 className="text-sm font-bold text-white mb-1">स्थायी जब्ती व गोशाला कस्टडी</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            तृतीय बार आवारा पाए जाने पर स्वामित्व समाप्त कर स्थायी रूप से गोशाला स्थानांतरित कर दिया जाता है।
          </p>
        </div>

      </div>

      {/* Official Legal PDF View Modal */}
      <OfficialLegalNoticePDF
        isOpen={isOfficialPdfOpen}
        onClose={() => setIsOfficialPdfOpen(false)}
        animal={animal}
        notice={activeNotice}
      />

    </div>
  );
};
