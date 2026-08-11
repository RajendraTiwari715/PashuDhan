import React, { useState } from 'react';

import { getBlankTags, getAnimals, generateNewBlankTag } from '../services/storage';
import { QRCodeSVG } from 'qrcode.react';
import { Tag, PlusCircle, Sparkles, UserCheck, Link2, Printer, Target, Download, CheckCircle2 } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";







export const TaggingAgentDashboard = ({
  onOpenLinkTagModal,
  onSelectAnimal
}) => {
  const [blankTags, setBlankTags] = useState(getBlankTags());
  const [animals, setAnimals] = useState(getAnimals());
  const [batchCount, setBatchCount] = useState(5);
  const [printedSheet, setPrintedSheet] = useState(null);

  const refresh = () => {
    setBlankTags(getBlankTags());
    setAnimals(getAnimals());
  };

  const handleGenerateNewTag = () => {
    const newTag = generateNewBlankTag();
    refresh();
    alert(`नया ISO 15-Digit QR कान टैग "${newTag.tagId}" जारी हुआ!`);
  };

  const handleGenerateBatchPrint = () => {
    const generated = [];
    for (let i = 0; i < batchCount; i++) {
      generated.push(generateNewBlankTag());
    }
    refresh();
    setPrintedSheet(generated);
  };

  const dailyTarget = 15;
  const completedToday = animals.length;
  const progressPercent = Math.min(Math.round(completedToday / dailyTarget * 100), 100);
  const totalIncentiveEarned = completedToday * 50;

  const unlinkedTags = blankTags.filter((t) => !t.isLinked);

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-glow-emerald relative overflow-hidden", children: /*#__PURE__*/
        _jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20", children: /*#__PURE__*/
              _jsxDEV(Tag, { className: "w-7 h-7 text-white" }, void 0, false) }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("div", { className: "flex items-center gap-2", children: /*#__PURE__*/
                _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold", children: "टैगिंग एजेंट डैशबोर्ड (Tagging Agent Panel)" }, void 0, false

                ) }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("h2", { className: "text-2xl sm:text-3xl font-black text-white mt-1", children: "डोरस्टेप पशु पंजीकरण एवं Paytm-Style QR टैगिंग" }, void 0, false

              ), /*#__PURE__*/
              _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "खाली QR कान टैग जनरेट करें, आधार OCR द्वारा सत्यापित करें तथा 4-फ़ोटो समेत पशु टैगिंग पूरा करें" }, void 0, false

              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("button", {
            onClick: handleGenerateNewTag,
            className: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all shrink-0", children: [/*#__PURE__*/

            _jsxDEV(PlusCircle, { className: "w-5 h-5" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "+ नया Paytm-Style QR टैग जनरेट करें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-glow-cyan space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-cyan-300 font-bold text-sm", children: [/*#__PURE__*/
              _jsxDEV(Printer, { className: "w-5 h-5 text-cyan-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "1. बल्क QR कान टैग प्रिंट एवं शीट एक्सपोर्टर" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold", children: "Bulk Export Tool" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("p", { className: "text-xs text-slate-400", children: "मात्रा में खाली QR कान टैग जनरेट करें तथा पशुपालकों को वितरण हेतु प्रिंट शीट डाउनलोड करें।" }, void 0, false

          ), /*#__PURE__*/

          _jsxDEV("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
            _jsxDEV("select", {
              value: batchCount,
              onChange: (e) => setBatchCount(Number(e.target.value)),
              className: "bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono", children: [/*#__PURE__*/

              _jsxDEV("option", { value: 5, children: "5 QR टैग शीट" }, void 0, false), /*#__PURE__*/
              _jsxDEV("option", { value: 10, children: "10 QR टैग शीट" }, void 0, false), /*#__PURE__*/
              _jsxDEV("option", { value: 20, children: "20 QR टैग शीट" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: handleGenerateBatchPrint,
              className: "bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors", children: [/*#__PURE__*/

              _jsxDEV(Download, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "बल्क PDF शीट प्रिंट करें" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),

          printedSheet && /*#__PURE__*/
          _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "text-[11px] text-cyan-400 font-semibold flex items-center gap-1", children: [/*#__PURE__*/
              _jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5" }, void 0, false),
              printedSheet.length, " नए ISO QR कान टैग प्रिंट हेतु तैयार हैं!"] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "flex gap-2 overflow-x-auto py-1", children:
              printedSheet.map((t) => /*#__PURE__*/
              _jsxDEV("div", { className: "p-1.5 bg-white rounded-lg text-slate-950 text-center font-mono text-[9px] font-bold shrink-0 shadow-md", children: [/*#__PURE__*/
                _jsxDEV(QRCodeSVG, { value: `PASHUDHAN:${t.tagId}`, size: 48 }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: t.tagId }, void 0, false)] }, t.tagId, true
              )
              ) }, void 0, false
            )] }, void 0, true
          )] }, void 0, true

        ), /*#__PURE__*/


        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-emerald-500/30 shadow-glow-emerald space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-emerald-300 font-bold text-sm", children: [/*#__PURE__*/
              _jsxDEV(Target, { className: "w-5 h-5 text-emerald-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "2. दैनिक टैगिंग लक्ष्य एवं इंसेंटिव रिपोर्ट" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold", children: "₹50/Tag Incentive" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "space-y-2", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between text-xs font-semibold", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-300", children: ["दैनिक लक्ष्य (Target: ", dailyTarget, " टैग)"] }, void 0, true), /*#__PURE__*/
              _jsxDEV("span", { className: "text-emerald-400 font-mono", children: [completedToday, " / ", dailyTarget, " पूर्ण (", progressPercent, "%)"] }, void 0, true)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800", children: /*#__PURE__*/
              _jsxDEV("div", {
                className: "h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700",
                style: { width: `${progressPercent}%` } }, void 0, false
              ) }, void 0, false
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "grid grid-cols-2 gap-3 text-xs pt-1", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "आज का कुल इंसेंटिव" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-sm", children: ["₹", totalIncentiveEarned] }, void 0, true)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "मासिक अनुमानित आय" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-cyan-400 text-sm", children: ["₹", totalIncentiveEarned * 25] }, void 0, true)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true

      ), /*#__PURE__*/


      _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
          _jsxDEV("h3", { className: "text-lg font-bold text-white flex items-center gap-2", children: [/*#__PURE__*/
            _jsxDEV(Sparkles, { className: "w-5 h-5 text-amber-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: ["3D Paytm-Style QR Ear-Tag Bank (", unlinkedTags.length, ")"] }, void 0, true)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("span", { className: "text-xs text-slate-400", children: "टैग पर क्लिक करके पशुपालक से लिंक करें" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children:
          unlinkedTags.map((tag) => /*#__PURE__*/
          _jsxDEV("div", {

            className: "glass-panel p-5 rounded-3xl border border-amber-500/40 hover:border-amber-400 transition-all flex flex-col justify-between space-y-4 shadow-glow-amber relative overflow-hidden group", children: [/*#__PURE__*/


            _jsxDEV("div", { className: "absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-400 to-amber-600 rounded-bl-3xl opacity-90 flex items-center justify-center text-slate-950 font-black text-[10px]", children: "ISO" }, void 0, false

            ), /*#__PURE__*/

            _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] font-mono text-slate-400", children: ["जारी: ", tag.generatedDate] }, void 0, true), /*#__PURE__*/
              _jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold", children: "Blank Tag" }, void 0, false

              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "bg-white p-3 rounded-2xl self-center shadow-lg group-hover:scale-105 transition-transform", children: /*#__PURE__*/
              _jsxDEV(QRCodeSVG, { value: `PASHUDHAN:${tag.tagId}`, size: 110 }, void 0, false) }, void 0, false
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "text-center", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "font-mono text-lg font-black text-white", children: tag.tagId }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { className: "text-[11px] text-slate-400", children: "Paytm-style Blank QR Tag" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: () => onOpenLinkTagModal(tag.tagId),
              className: "w-full bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md", children: [/*#__PURE__*/

              _jsxDEV(Link2, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "आधार OCR व पशु से लिंक करें" }, void 0, false)] }, void 0, true
            )] }, tag.tagId, true
          )
          ) }, void 0, false
        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between", children: /*#__PURE__*/
          _jsxDEV("h3", { className: "text-lg font-bold text-white flex items-center gap-2", children: [/*#__PURE__*/
            _jsxDEV(UserCheck, { className: "w-5 h-5 text-emerald-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "आपके द्वारा पंजीकृत पशु एवं क्यूआर कोड" }, void 0, false)] }, void 0, true
          ) }, void 0, false
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children:
          animals.map((animal) => /*#__PURE__*/
          _jsxDEV("div", {

            onClick: () => onSelectAnimal(animal),
            className: "glass-panel p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 shadow-lg", children: /*#__PURE__*/

            _jsxDEV("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
              _jsxDEV("img", { src: animal.photos[0], alt: animal.breed, className: "w-14 h-14 rounded-xl object-cover border border-slate-700" }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-xs", children: animal.tagId }, void 0, false), /*#__PURE__*/
                _jsxDEV("div", { className: "font-bold text-white text-sm", children: animal.breed }, void 0, false), /*#__PURE__*/
                _jsxDEV("div", { className: "text-xs text-slate-400", children: ["मालिक: ", animal.owner.name] }, void 0, true)] }, void 0, true
              )] }, void 0, true
            ) }, animal.id, false
          )
          ) }, void 0, false
        )] }, void 0, true
      )] }, void 0, true

    ));

};