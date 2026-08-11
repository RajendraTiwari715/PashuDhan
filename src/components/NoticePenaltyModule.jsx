import React, { useState } from 'react';

import { OfficialLegalNoticePDF } from './OfficialLegalNoticePDF';
import { ShieldAlert, Clock, CheckCircle2, Lock, Gavel, Printer } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";







export const NoticePenaltyModule = ({ animal }) => {
  const [isOfficialPdfOpen, setIsOfficialPdfOpen] = useState(false);

  const getOffenseBadge = (level) => {
    switch (level) {
      case 1:
        return (/*#__PURE__*/
          _jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1", children: [/*#__PURE__*/
            _jsxDEV(Clock, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false), " प्रथम उल्लंघन (1st Offense Notice)"] }, void 0, true
          ));

      case 2:
        return (/*#__PURE__*/
          _jsxDEV("span", { className: "bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1", children: [/*#__PURE__*/
            _jsxDEV(ShieldAlert, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false), " द्वितीय उल्लंघन (2nd Offense Notice)"] }, void 0, true
          ));

      case 3:
        return (/*#__PURE__*/
          _jsxDEV("span", { className: "bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1", children: [/*#__PURE__*/
            _jsxDEV(Gavel, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false), " तृतीय उल्लंघन (3rd Offense Seizure)"] }, void 0, true
          ));

    }
  };

  const currentViolations = animal.priorViolationsCount || 0;
  const activeNotice = animal.activeNotices[0];

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl animate-fadeIn", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4", children: [/*#__PURE__*/
        _jsxDEV("div", { children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-2", children: /*#__PURE__*/
            _jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold", children: "ई-नोटिस व पेनल्टी इंजन (Penalties Engine)" }, void 0, false

            ) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("h3", { className: "text-xl font-bold text-white mt-1", children: "उल्लंघन रिकॉर्ड एवं 48-घंटे का समाधान टाइमर" }, void 0, false

          )] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "flex items-center gap-2", children: [
          getOffenseBadge(Math.min(currentViolations, 3) || 1), /*#__PURE__*/

          _jsxDEV("button", {
            onClick: () => setIsOfficialPdfOpen(true),
            className: "bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md", children: [/*#__PURE__*/

            _jsxDEV(Printer, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "शासकीय विधिक नोटिस PDF" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [/*#__PURE__*/


        _jsxDEV("div", { className: `p-5 rounded-2xl border transition-all ${
          currentViolations >= 1 ?
          'bg-amber-950/30 border-amber-500/50 shadow-glow-amber' :
          'bg-slate-950/50 border-slate-800 opacity-60'}`, children: [/*#__PURE__*/

          _jsxDEV("div", { className: "flex items-center justify-between mb-3", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "text-xs font-bold font-mono text-amber-400", children: "उल्लंघन 1: 1st Offense" }, void 0, false),
            currentViolations >= 1 && /*#__PURE__*/_jsxDEV(CheckCircle2, { className: "w-4 h-4 text-amber-400" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("h4", { className: "text-sm font-bold text-white mb-1", children: "48-घंटे चेतावनी ई-नोटिस" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400 leading-relaxed", children: "पशु के 500m फेंस पार करने पर एसएमएस व ऐप द्वारा चेतावनी प्रेषित की जाती है। 48 घंटे में समाधान आवश्यक।" }, void 0, false

          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: `p-5 rounded-2xl border transition-all ${
          currentViolations >= 2 ?
          'bg-rose-950/30 border-rose-500/50 shadow-glow-rose' :
          'bg-slate-950/50 border-slate-800 opacity-60'}`, children: [/*#__PURE__*/

          _jsxDEV("div", { className: "flex items-center justify-between mb-3", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "text-xs font-bold font-mono text-rose-400", children: "उल्लंघन 2: 2nd Offense" }, void 0, false),
            currentViolations >= 2 && /*#__PURE__*/_jsxDEV(ShieldAlert, { className: "w-4 h-4 text-rose-400" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("h4", { className: "text-sm font-bold text-white mb-1", children: "प्रोफ़ाइल ब्लॉक अंतिम चेतावनी" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400 leading-relaxed", children: "द्वितीय उल्लंघन पर प्रोफ़ाइल ब्लॉक चेतावनी पत्र जारी होता है तथा पुलिस पेट्रोलिंग अलर्ट भेजा जाता है।" }, void 0, false

          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: `p-5 rounded-2xl border transition-all ${
          currentViolations >= 3 ?
          'bg-purple-950/40 border-purple-500/60 shadow-lg' :
          'bg-slate-950/50 border-slate-800 opacity-60'}`, children: [/*#__PURE__*/

          _jsxDEV("div", { className: "flex items-center justify-between mb-3", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "text-xs font-bold font-mono text-purple-400", children: "उल्लंघन 3: 3rd Offense" }, void 0, false),
            currentViolations >= 3 && /*#__PURE__*/_jsxDEV(Lock, { className: "w-4 h-4 text-purple-400" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("h4", { className: "text-sm font-bold text-white mb-1", children: "स्थायी जब्ती व गोशाला कस्टडी" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400 leading-relaxed", children: "तृतीय बार आवारा पाए जाने पर स्वामित्व समाप्त कर स्थायी रूप से गोशाला स्थानांतरित कर दिया जाता है।" }, void 0, false

          )] }, void 0, true
        )] }, void 0, true

      ), /*#__PURE__*/


      _jsxDEV(OfficialLegalNoticePDF, {
        isOpen: isOfficialPdfOpen,
        onClose: () => setIsOfficialPdfOpen(false),
        animal: animal,
        notice: activeNotice }, void 0, false
      )] }, void 0, true

    ));

};