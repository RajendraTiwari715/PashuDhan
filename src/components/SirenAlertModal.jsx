import React, { useEffect } from 'react';

import { sirenEngine } from '../services/geoFenceSiren';
import { Siren, VolumeX, MapPin } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";








export const SirenAlertModal = ({
  isOpen,
  onClose,
  animal
}) => {
  useEffect(() => {
    if (isOpen) {
      sirenEngine.playSiren();
    } else {
      sirenEngine.stopSiren();
    }
    return () => sirenEngine.stopSiren();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMuteAndClose = () => {
    sirenEngine.stopSiren();
    onClose();
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/90 backdrop-blur-xl animate-pulse", children: /*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-lg rounded-3xl p-6 sm:p-8 border-4 border-red-500 shadow-glow-rose space-y-6 text-center text-white relative", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "w-20 h-20 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center mx-auto animate-bounce shadow-glow-rose", children: /*#__PURE__*/
          _jsxDEV(Siren, { className: "w-10 h-10 text-red-400 animate-pulse" }, void 0, false) }, void 0, false
        ), /*#__PURE__*/

        _jsxDEV("div", { children: [/*#__PURE__*/
          _jsxDEV("span", { className: "bg-red-500/20 text-red-300 border border-red-500/40 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider font-mono", children: "🚨 500m Geo-Fence Breach Emergency Siren" }, void 0, false

          ), /*#__PURE__*/
          _jsxDEV("h2", { className: "text-2xl font-black text-white mt-3", children: "सावधान! गोवंश जिओ-फेंस बाड़ से बाहर पाया गया!" }, void 0, false

          ), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-red-200 mt-1", children: "पशु कल्याण अधिनियम धारा 1962 - स्वतः अलार्म एवं जीपीएस सायरन सक्रिय" }, void 0, false

          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/80 border border-red-500/40 text-left space-y-2 text-xs", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex justify-between items-center", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "font-mono text-amber-400 font-bold", children: ["15-Digit Tag: ", animal.tagId] }, void 0, true), /*#__PURE__*/
            _jsxDEV("span", { className: "bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold text-[10px]", children:
              animal.breed }, void 0, false
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("span", { className: "text-slate-400 block text-[10px]", children: "पशुपालक:" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "font-bold text-white", children: [animal.owner.name, " (+91 ", animal.owner.phone, ")"] }, void 0, true)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "flex items-center gap-1.5 text-red-300 font-semibold pt-1", children: [/*#__PURE__*/
            _jsxDEV(MapPin, { className: "w-3.5 h-3.5 text-red-400 shrink-0" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: ["वर्तमान जीपीएस स्थान: ", animal.location.addressName, " (500m सीमा पार)"] }, void 0, true)] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "flex gap-3 pt-2", children: /*#__PURE__*/
          _jsxDEV("button", {
            onClick: handleMuteAndClose,
            className: "w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 border border-slate-700", children: [/*#__PURE__*/

            _jsxDEV(VolumeX, { className: "w-4 h-4 text-amber-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "सायरन बंद करें व सूचना स्वीकारें" }, void 0, false)] }, void 0, true
          ) }, void 0, false
        )] }, void 0, true

      ) }, void 0, false
    ));

};