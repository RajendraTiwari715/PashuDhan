import React, { useState } from 'react';
import { getAnimalByTagId, getBlankTags } from '../services/storage';

import { QrCode, Camera, Search, X, AlertCircle, ArrowLeft } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";








export const QRScannerModal = ({
  isOpen,
  onClose,
  onSelectAnimal,
  onSelectBlankTag
}) => {
  const [manualTagId, setManualTagId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleProcessTag = (tagId) => {
    const clean = tagId.trim().toUpperCase();
    if (!clean) return;

    const animal = getAnimalByTagId(clean);

    if (animal) {
      onSelectAnimal(animal);
      onClose();
      return;
    }

    // Check if it is a blank tag
    const blankTags = getBlankTags();
    const isBlank = blankTags.some((t) => t.tagId.toUpperCase() === clean);

    if (isBlank || clean.startsWith('TAG-8') || clean.startsWith('TAG-9')) {
      onSelectBlankTag(clean);
      onClose();
      return;
    }

    setErrorMessage(`QR टैग "${clean}" डेटाबेस में नहीं मिला। कृपया पुनः प्रयास करें।`);
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn", children: /*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700", children: [/*#__PURE__*/

        _jsxDEV("div", { className: "flex items-center justify-between mb-4 border-b border-slate-800 pb-3", children: [/*#__PURE__*/
          _jsxDEV("button", {
            onClick: onClose,
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors", children: [/*#__PURE__*/
            _jsxDEV(ArrowLeft, { className: "w-4 h-4 text-amber-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "वापस जाएं (Back)" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: onClose,
            className: "p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors", children: /*#__PURE__*/
            _jsxDEV(X, { className: "w-5 h-5" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "text-center mb-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20", children: /*#__PURE__*/
            _jsxDEV(QrCode, { className: "w-6 h-6 text-slate-950" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("h3", { className: "text-xl font-bold text-white", children: "पशु कान QR टैग स्कैनर" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "पशु के कान पर लगे QR कोड को कैमरे के सामने रखें" }, void 0, false

          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "relative aspect-square max-w-[280px] mx-auto rounded-3xl overflow-hidden border-2 border-emerald-500/50 shadow-2xl bg-slate-950 flex flex-col items-center justify-center mb-6", children: [/*#__PURE__*/


          _jsxDEV("div", { className: "animate-scan-line" }, void 0, false), /*#__PURE__*/


          _jsxDEV("div", { className: "absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" }, void 0, false), /*#__PURE__*/
          _jsxDEV("div", { className: "absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" }, void 0, false), /*#__PURE__*/
          _jsxDEV("div", { className: "absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" }, void 0, false), /*#__PURE__*/
          _jsxDEV("div", { className: "absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" }, void 0, false), /*#__PURE__*/


          _jsxDEV(Camera, { className: "w-12 h-12 text-emerald-400/40 mb-2 animate-bounce" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: "text-xs text-emerald-300/80 font-mono tracking-wider bg-slate-900/80 px-3 py-1 rounded-full border border-emerald-500/30", children: "QR Tag Align Matrix" }, void 0, false

          )] }, void 0, true
        ),

        errorMessage && /*#__PURE__*/
        _jsxDEV("div", { className: "mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 font-medium", children: [/*#__PURE__*/
          _jsxDEV(AlertCircle, { className: "w-4 h-4 text-rose-400 shrink-0" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: errorMessage }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/



        _jsxDEV("div", { className: "mb-5", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between text-xs text-slate-400 mb-2 font-medium", children: /*#__PURE__*/
            _jsxDEV("span", { children: "त्वरित परीक्षण हेतु नमूना QR कोड (Quick Test Tags):" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: [/*#__PURE__*/
            _jsxDEV("button", {
              onClick: () => handleProcessTag('TAG-1001'),
              className: "p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group", children: [/*#__PURE__*/

              _jsxDEV("div", { className: "text-[11px] font-mono text-emerald-400 font-bold group-hover:underline", children: "TAG-1001" }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { className: "text-[10px] text-slate-300 truncate", children: "गाय (साहीवाल)" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: () => handleProcessTag('TAG-1002'),
              className: "p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group", children: [/*#__PURE__*/

              _jsxDEV("div", { className: "text-[11px] font-mono text-emerald-400 font-bold group-hover:underline", children: "TAG-1002" }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { className: "text-[10px] text-slate-300 truncate", children: "गाय (गिर नस्ल)" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: () => handleProcessTag('TAG-1003'),
              className: "p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group", children: [/*#__PURE__*/

              _jsxDEV("div", { className: "text-[11px] font-mono text-emerald-400 font-bold group-hover:underline", children: "TAG-1003" }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { className: "text-[10px] text-slate-300 truncate", children: "भैंस (मुर्रा)" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: () => handleProcessTag('TAG-8821'),
              className: "p-2.5 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-500/50 text-left transition-all group col-span-2 sm:col-span-3", children: [/*#__PURE__*/

              _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-[11px] font-mono text-amber-300 font-bold", children: "TAG-8821 (Paytm-style Blank Tag)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "text-[9px] bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded font-semibold", children: "Unlinked" }, void 0, false)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "text-[10px] text-slate-400", children: "अनलिंक्ड नया QR कान टैग (Link in Admin Portal)" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "pt-2 border-t border-slate-800", children: [/*#__PURE__*/
          _jsxDEV("label", { className: "block text-xs font-semibold text-slate-400 mb-1", children: "या टैग कोड मैनुअल प्रविष्ट करें (Enter Tag Code):" }, void 0, false

          ), /*#__PURE__*/
          _jsxDEV("div", { className: "flex gap-2", children: [/*#__PURE__*/
            _jsxDEV("input", {
              type: "text",
              value: manualTagId,
              onChange: (e) => setManualTagId(e.target.value),
              placeholder: "e.g. TAG-1001",
              className: "flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm uppercase placeholder-slate-600 focus:outline-none focus:border-emerald-500" }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("button", {
              onClick: () => handleProcessTag(manualTagId),
              className: "bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors", children: [/*#__PURE__*/

              _jsxDEV(Search, { className: "w-3.5 h-3.5" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "खोजें" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true

      ) }, void 0, false
    ));

};