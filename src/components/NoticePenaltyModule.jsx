import React, { useState } from 'react';
import { OfficialLegalNoticePDF } from './OfficialLegalNoticePDF';
import { ShieldAlert, Clock, CheckCircle2, Lock, Gavel, Printer } from 'lucide-react';

export const NoticePenaltyModule = ({ animal }) => {
  const [isOfficialPdfOpen, setIsOfficialPdfOpen] = useState(false);

  const getOffenseBadge = (level) => {
    switch (level) {
      case 1:
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> प्रथम उल्लंघन (1st Offense Notice)
          </span>
        );
      case 2:
        return (
          <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> द्वितीय उल्लंघन (2nd Offense Notice)
          </span>
        );
      case 3:
        return (
          <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Gavel className="w-3.5 h-3.5 text-purple-600" /> तृतीय उल्लंघन (3rd Offense Seizure)
          </span>
        );
      default:
        return null;
    }
  };

  const currentViolations = animal.priorViolationsCount || 0;
  const activeNotice = animal.activeNotices ? animal.activeNotices[0] : null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
              ई-नोटिस व पेनल्टी इंजन
            </span>
            {getOffenseBadge(currentViolations)}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mt-1">
            उल्लंघन रिकॉर्ड एवं 48-घंटे का समाधान टाइमर
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOfficialPdfOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>शासकीय विधिक नोटिस PDF</span>
          </button>
        </div>
      </div>

      {/* 3 Tier Stages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            currentViolations >= 1
              ? 'bg-amber-50/60 border-amber-300 shadow-sm'
              : 'bg-slate-50 border-slate-100 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-mono text-amber-700">उल्लंघन 1: 1st Offense</span>
            {currentViolations >= 1 && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
          </div>
          <h4 className="text-sm font-bold text-slate-800 mb-1">48-घंटे चेतावनी ई-नोटिस</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            पशु के 500m फेंस पार करने पर एसएमएस व ऐप द्वारा चेतावनी प्रेषित की जाती है। 48 घंटे में समाधान आवश्यक।
          </p>
        </div>

        {/* Tier 2 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            currentViolations >= 2
              ? 'bg-rose-50/60 border-rose-300 shadow-sm'
              : 'bg-slate-50 border-slate-100 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-mono text-rose-700">उल्लंघन 2: 2nd Offense</span>
            {currentViolations >= 2 && <ShieldAlert className="w-4 h-4 text-rose-600" />}
          </div>
          <h4 className="text-sm font-bold text-slate-800 mb-1">प्रोफ़ाइल ब्लॉक अंतिम चेतावनी</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            द्वितीय उल्लंघन पर प्रोफ़ाइल ब्लॉक चेतावनी पत्र जारी होता है तथा पुलिस पेट्रोलिंग अलर्ट भेजा जाता है।
          </p>
        </div>

        {/* Tier 3 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            currentViolations >= 3
              ? 'bg-purple-50/60 border-purple-300 shadow-sm'
              : 'bg-slate-50 border-slate-100 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-mono text-purple-700">उल्लंघन 3: 3rd Offense</span>
            {currentViolations >= 3 && <Lock className="w-4 h-4 text-purple-600" />}
          </div>
          <h4 className="text-sm font-bold text-slate-800 mb-1">स्थायी जब्ती व गोशाला कस्टडी</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            तृतीय बार आवारा पाए जाने पर स्वामित्व समाप्त कर स्थायी रूप से गोशाला स्थानांतरित कर दिया जाता है।
          </p>
        </div>
      </div>

      <OfficialLegalNoticePDF
        isOpen={isOfficialPdfOpen}
        onClose={() => setIsOfficialPdfOpen(false)}
        animal={animal}
      />
    </div>
  );
};