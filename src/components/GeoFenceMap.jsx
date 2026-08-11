import React from 'react';

import { MapPin, Navigation, ShieldCheck, AlertTriangle, Radio } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






export const GeoFenceMap = ({ geoFence, currentLocation }) => {
  const isOutside = geoFence.isOutsideFence || geoFence.lastCheckedDistanceMeters > geoFence.radiusMeters;

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center gap-2", children: [/*#__PURE__*/
          _jsxDEV(Radio, { className: "w-5 h-5 text-emerald-400 animate-pulse" }, void 0, false), /*#__PURE__*/
          _jsxDEV("h4", { className: "text-sm font-bold text-white", children: "जिओ-फेंस मैपिंग एवं लाइव GPS ट्रैकिंग" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { children:
          isOutside ? /*#__PURE__*/
          _jsxDEV("span", { className: "bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 animate-pulse", children: [/*#__PURE__*/
            _jsxDEV(AlertTriangle, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "Case B: फेंस के बाहर (Stray Cattle Alert)" }, void 0, false)] }, void 0, true
          ) : /*#__PURE__*/

          _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5", children: [/*#__PURE__*/
            _jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "Case A: स्वामित्‍व ऑन-प्रिमाइसेस (Safe)" }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "relative aspect-[2/1] w-full rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center", children: [/*#__PURE__*/

        _jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /*#__PURE__*/
          _jsxDEV("div", { className: "w-56 h-56 rounded-full border-2 border-emerald-500/30 bg-emerald-500/5 animate-pulse flex items-center justify-center", children: /*#__PURE__*/
            _jsxDEV("div", { className: "w-32 h-32 rounded-full border border-emerald-400/40 bg-emerald-500/10" }, void 0, false) }, void 0, false
          ) }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "relative z-10 flex flex-col items-center", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/40", children: /*#__PURE__*/
            _jsxDEV(MapPin, { className: "w-5 h-5" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("span", { className: "text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded mt-1 border border-emerald-500/30", children: ["Home: ",
            geoFence.homeAddress] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", {
          className: `absolute transition-all duration-700 flex flex-col items-center ${
          isOutside ? 'top-4 right-8' : 'bottom-8 left-1/3'}`, children: [/*#__PURE__*/


          _jsxDEV("div", { className: `w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg text-white ${
            isOutside ? 'bg-rose-600 animate-bounce shadow-rose-600/50' : 'bg-cyan-500 shadow-cyan-500/40'}`, children: /*#__PURE__*/

            _jsxDEV(Navigation, { className: "w-3.5 h-3.5" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("span", { className: `text-[9px] font-mono px-2 py-0.5 rounded mt-1 border ${
            isOutside ? 'bg-rose-950/90 text-rose-300 border-rose-500/40' : 'bg-slate-950/80 text-cyan-300 border-cyan-500/30'}`, children: [
            "Live GPS (",
            geoFence.lastCheckedDistanceMeters, "m distance)"] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-900 border border-slate-800", children: [/*#__PURE__*/
          _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "जिओ-फेंस दायरा" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: "font-mono font-bold text-white", children: [geoFence.radiusMeters, " मीटर Radius"] }, void 0, true)] }, void 0, true
        ), /*#__PURE__*/
        _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-900 border border-slate-800", children: [/*#__PURE__*/
          _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "डेयरी केंद्र से दूरी" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: `font-mono font-bold ${isOutside ? 'text-rose-400' : 'text-emerald-400'}`, children: [
            geoFence.lastCheckedDistanceMeters, " मीटर"] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/
        _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1", children: [/*#__PURE__*/
          _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "वर्तमान लोकेशन" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: "text-slate-200 truncate block", children: currentLocation.addressName }, void 0, false)] }, void 0, true
        )] }, void 0, true
      )] }, void 0, true

    ));

};