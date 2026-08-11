import React, { useState } from 'react';
import { Camera, AlertTriangle, RefreshCw, X, Cpu } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";







export const AICattleVisionModal = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(





    null);

  if (!isOpen) return null;

  const handleStartAIScan = () => {
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setResult({
        breed: 'साहीवाल (Sahiwal Breed)',
        confidence: 98.4,
        diseaseRisk: 'लंपी वायरस त्वचा नोड्यूल्स (Lumpy Disease Alert)',
        diseaseLevel: 'warning',
        recommendation: 'पशु के पीठ पर 12-15% हल्के स्किन नोड्यूल्स (लंपी लक्षण) पाए गए। गोशाला आइसोलेशन एवं पशु चिकित्सक एंटीसेप्टिक लेप की सिफारिश की जाती है।'
      });
    }, 2500);
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn", children: /*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-emerald-500/40", children: [/*#__PURE__*/


        _jsxDEV("button", {
          onClick: onClose,
          className: "absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors", children: /*#__PURE__*/

          _jsxDEV(X, { className: "w-5 h-5" }, void 0, false) }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "flex items-center gap-3 mb-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20", children: /*#__PURE__*/
            _jsxDEV(Cpu, { className: "w-6 h-6 text-white" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold", children: "AI Vision Model v2.4 Active" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("h3", { className: "text-xl font-bold text-white mt-0.5", children: "🤖 AI गोवंश नस्ल एवं लंपी रोग विज़न स्कैनर" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "relative w-full h-64 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-950 flex items-center justify-center shadow-inner", children: [/*#__PURE__*/
          _jsxDEV("img", {
            src: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80",
            alt: "Cattle sample",
            className: "w-full h-full object-cover opacity-80" }, void 0, false
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "absolute inset-8 border-2 border-dashed border-emerald-400 rounded-2xl flex flex-col justify-between p-3 pointer-events-none", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between text-[10px] font-mono font-bold text-emerald-300 bg-slate-950/80 px-2 py-1 rounded border border-emerald-500/40", children: [/*#__PURE__*/
              _jsxDEV("span", { children: "[AI BOUNDING BOX: CATTLE DETECTED]" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "CONFIDENCE: 98.4%" }, void 0, false)] }, void 0, true
            ),
            isScanning && /*#__PURE__*/
            _jsxDEV("div", { className: "w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 animate-scan" }, void 0, false), /*#__PURE__*/

            _jsxDEV("div", { className: "text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-1 rounded self-start border border-cyan-500/40", children: "ANALYZING EPIDERMAL SKIN PATTERNS..." }, void 0, false

            )] }, void 0, true
          ),

          isScanning && /*#__PURE__*/
          _jsxDEV("div", { className: "absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center space-y-2", children: [/*#__PURE__*/
            _jsxDEV(RefreshCw, { className: "w-8 h-8 text-emerald-400 animate-spin" }, void 0, false), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs font-bold text-emerald-300 font-mono", children: "एआई न्यूरल नेटवर्क विश्लेषण जारी है..." }, void 0, false)] }, void 0, true
          )] }, void 0, true

        ),


        !result && !isScanning && /*#__PURE__*/
        _jsxDEV("button", {
          onClick: handleStartAIScan,
          className: "w-full mt-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm", children: [/*#__PURE__*/

          _jsxDEV(Camera, { className: "w-5 h-5" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "AI नस्ल व लंपी रोग स्कैन शुरू करें" }, void 0, false)] }, void 0, true
        ),



        result && /*#__PURE__*/
        _jsxDEV("div", { className: "mt-6 p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-fadeIn", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [/*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono", children: "पहचानी गई नस्ल (Breed):" }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { className: "font-bold text-white text-base", children: result.breed }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-mono font-bold", children: [
              result.confidence, "% मैच"] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-1.5 font-bold text-amber-200", children: [/*#__PURE__*/
              _jsxDEV(AlertTriangle, { className: "w-4 h-4 text-amber-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: ["स्वास्थ्य निदान: ", result.diseaseRisk] }, void 0, true)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("p", { className: "text-amber-300/90 leading-relaxed text-[11px]", children:
              result.recommendation }, void 0, false
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("button", {
            onClick: handleStartAIScan,
            className: "w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-700", children: [/*#__PURE__*/

            _jsxDEV(RefreshCw, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "पुनः स्कैन करें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true


      ) }, void 0, false
    ));

};