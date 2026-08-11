import React, { useState } from 'react';

import { GaushalaModule } from './GaushalaModule';
import { Building2, Heart, Layers, PlusCircle, CheckCircle2 } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






export const GaushalaManagerDashboard = ({ animals }) => {
  const [donorName, setDonorName] = useState('');
  const [donorAmount, setDonorAmount] = useState(1100);
  const [donations, setDonations] = useState([
  { name: 'श्री जगदीश अग्रवाल', amount: 5100, item: '10 क्विंटल हरा चारा', date: '2026-08-10', badge: '🥇 स्वर्ण दानदाता' },
  { name: 'श्रीमती संगीता शर्मा', amount: 2100, item: 'गो-सेवा गोद ग्रहण (सप्ताह)', date: '2026-08-11', badge: '🥈 रजत दानदाता' }]
  );
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleAddDonation = (e) => {
    e.preventDefault();
    if (!donorName.trim()) return;
    const dateToday = new Date().toISOString().split('T')[0];
    setDonations((prev) => [
    { name: donorName, amount: donorAmount, item: 'चारा एवं दाना सेवा सहयोग', date: dateToday, badge: '🏆 गो-सेवक' },
    ...prev]
    );
    setDonationSuccess(true);
    setDonorName('');
    setTimeout(() => setDonationSuccess(false), 4000);
  };

  const totalCapacity = 500;
  const currentRescuedCount = 320 + animals.length;
  const availableShedSpace = totalCapacity - currentRescuedCount;
  const occupancyPercent = Math.round(currentRescuedCount / totalCapacity * 100);

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-rose-500/30 shadow-glow-rose", children: /*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20", children: /*#__PURE__*/
            _jsxDEV(Building2, { className: "w-7 h-7 text-white" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2", children: /*#__PURE__*/
              _jsxDEV("span", { className: "bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold", children: "गोशाला मैनेजर डैशबोर्ड (Gaushala Manager Portal)" }, void 0, false

              ) }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("h2", { className: "text-2xl sm:text-3xl font-black text-white mt-1", children: "गोशाला इनटेक, कस्टडी ट्रांसफर एवं 30-दिवसीय आइसोलेशन" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "रेस्क्यू वाहन ट्रैकिंग, गेट पर QR इनटेक स्कैन, कस्टडी ट्रांसफर तथा दैनिक आहार एवं मेडिकल रजिस्टर" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-amber-500/30 shadow-glow-amber space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-amber-300 font-bold text-sm", children: [/*#__PURE__*/
              _jsxDEV(Layers, { className: "w-5 h-5 text-amber-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "1. गोशाला कुल क्षमता एवं शेड सूचकांक" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold", children: "Capacity Meter" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "space-y-2", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between text-xs font-semibold", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-300", children: ["कुल क्षमता (Total Capacity: ", totalCapacity, " गोवंश)"] }, void 0, true), /*#__PURE__*/
              _jsxDEV("span", { className: "text-amber-400 font-mono", children: [currentRescuedCount, " / ", totalCapacity, " (", occupancyPercent, "%)"] }, void 0, true)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800", children: /*#__PURE__*/
              _jsxDEV("div", {
                className: "h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 transition-all duration-700",
                style: { width: `${occupancyPercent}%` } }, void 0, false
              ) }, void 0, false
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "grid grid-cols-3 gap-2 text-xs pt-1", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "शेड A (नंदिनी शेड)" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-sm", children: "120 (85%)" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "शेड B (कामधेनु शेड)" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-cyan-400 text-sm", children: "200 (65%)" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "उपलब्ध स्थान" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-amber-300 text-sm", children: [availableShedSpace, " स्थान"] }, void 0, true)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-rose-500/30 shadow-glow-rose space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-rose-300 font-bold text-sm", children: [/*#__PURE__*/
              _jsxDEV(Heart, { className: "w-5 h-5 text-rose-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "2. गो-सेवा गोद लें एवं चारा/दाना दान पंजीबद्धीकरण" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono font-bold", children: "Go-Seva Registry" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("form", { onSubmit: handleAddDonation, className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: [/*#__PURE__*/
            _jsxDEV("input", {
              type: "text",
              value: donorName,
              onChange: (e) => setDonorName(e.target.value),
              placeholder: "दानदाता का नाम",
              className: "bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("input", {
              type: "number",
              value: donorAmount,
              onChange: (e) => setDonorAmount(Number(e.target.value)),
              placeholder: "राशि (₹)",
              className: "bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono" }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("button", {
              type: "submit",
              className: "bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md shrink-0", children: [/*#__PURE__*/

              _jsxDEV(PlusCircle, { className: "w-3.5 h-3.5" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "दान पंजीकृत करें" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),

          donationSuccess && /*#__PURE__*/
          _jsxDEV("div", { className: "p-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-1.5 font-semibold border border-emerald-500/40", children: [/*#__PURE__*/
            _jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "गो-सेवा दान सफलतापूर्वक पंजीकृत! डिजिटल रसीद जारी की गई।" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "space-y-1.5 max-h-24 overflow-y-auto", children:
            donations.map((d, i) => /*#__PURE__*/
            _jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] flex justify-between items-center", children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "font-bold text-white flex items-center gap-1", children: [
                  d.name, " ", /*#__PURE__*/_jsxDEV("span", { className: "text-[9px] text-amber-400 font-normal", children: ["(", d.badge, ")"] }, void 0, true)] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("span", { className: "text-[10px] text-slate-400", children: d.item }, void 0, false)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-xs", children: ["₹", d.amount] }, void 0, true)] }, i, true
            )
            ) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true

      ), /*#__PURE__*/

      _jsxDEV(GaushalaModule, { animals: animals }, void 0, false)] }, void 0, true
    ));

};