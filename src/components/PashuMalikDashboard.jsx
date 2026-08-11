import React, { useState } from 'react';

import { getAnimalsByOwnerPhone } from '../services/storage';
import { GeoFenceMap } from './GeoFenceMap';
import { QRCodeSVG } from 'qrcode.react';
import { User, AlertTriangle, ArrowRight, Milk, CalendarCheck, Stethoscope, CheckCircle2 } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";








export const PashuMalikDashboard = ({
  userPhone,
  onSelectAnimal,
  onOpenComplaint
}) => {
  const ownedAnimals = getAnimalsByOwnerPhone(userPhone);
  const primaryAnimal = ownedAnimals[0];

  const [dailyMilkLiters, setDailyMilkLiters] = useState(14);
  const [vetBooked, setVetBooked] = useState(false);
  const [doctorDate, setDoctorDate] = useState('2026-08-15');

  const greenFodderKg = Math.round(15 + dailyMilkLiters * 1.2);
  const dryFodderKg = 5;
  const concentrateKg = Math.round((1.5 + dailyMilkLiters * 0.4) * 10) / 10;

  const weeklyMilkYield = [
  { day: 'सोम', yield: 13.5 },
  { day: 'मंगल', yield: 14.0 },
  { day: 'बुध', yield: 14.2 },
  { day: 'गुरु', yield: 13.8 },
  { day: 'शुक्र', yield: 14.5 },
  { day: 'शनि', yield: 15.0 },
  { day: 'रवि', yield: 14.8 }];


  const handleBookVet = (e) => {
    e.preventDefault();
    setVetBooked(true);
    alert(`पशु चिकित्सक अपॉइंटमेंट ${doctorDate} के लिए सफलतापूर्वक बुक की गई! डॉ. राजेश शर्मा (पशु चिकित्सालय भोपाल) को एसएमएस भेज दिया गया है।`);
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 shadow-glow-cyan relative overflow-hidden", children: /*#__PURE__*/
        _jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20", children: /*#__PURE__*/
              _jsxDEV(User, { className: "w-7 h-7 text-white" }, void 0, false) }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("div", { className: "flex items-center gap-2", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold", children: "पशुपालक डैशबोर्ड (Cattle Owner Portal)" }, void 0, false

                ), /*#__PURE__*/
                _jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: ["मोबाइल: ", userPhone] }, void 0, true)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("h2", { className: "text-2xl sm:text-3xl font-black text-white mt-1", children:
                primaryAnimal ? primaryAnimal.owner.name : 'पशुपालक प्रोफ़ाइल' }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "आपके पंजीकृत पशुओं की सुरक्षा, 500m जिओ-फेंस जीपीएस ट्रैकिंग एवं स्वास्थ्य रिकॉर्ड" }, void 0, false

              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("button", {
            onClick: () => onOpenComplaint(primaryAnimal),
            className: "bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm shrink-0", children: [/*#__PURE__*/

            _jsxDEV(AlertTriangle, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "गुमशुदा / लावारिस पशु रिपोर्ट करें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-teal-500/30 shadow-glow-emerald space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-teal-300 font-bold text-sm", children: [/*#__PURE__*/
              _jsxDEV(Milk, { className: "w-5 h-5 text-teal-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "1. दुग्ध उत्पादन एवं संतुलित चारा पोषण कैलकुलेटर" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono font-bold", children: "Feed Nutrition AI" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
            _jsxDEV("label", { className: "text-xs text-slate-300 font-semibold", children: "दैनिक दूध उत्पादन:" }, void 0, false), /*#__PURE__*/
            _jsxDEV("input", {
              type: "number",
              value: dailyMilkLiters,
              onChange: (e) => setDailyMilkLiters(Math.max(1, Number(e.target.value))),
              className: "w-24 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-center font-bold text-sm" }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-xs text-slate-400 font-bold", children: "लीटर / दिन" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "p-3 bg-slate-950/80 rounded-2xl border border-slate-900 space-y-2", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between text-[11px] font-semibold text-slate-400", children: [/*#__PURE__*/
              _jsxDEV("span", { children: "साप्ताहिक उत्पादन ग्राफ (Liters/day):" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "text-teal-400 font-mono", children: "औसत: 14.3 L" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "grid grid-cols-7 gap-1.5 items-end h-20 pt-2", children:
              weeklyMilkYield.map((m, i) => /*#__PURE__*/
              _jsxDEV("div", { className: "flex flex-col items-center gap-1", children: [/*#__PURE__*/
                _jsxDEV("div", {
                  className: "w-full bg-gradient-to-t from-teal-600 to-emerald-400 rounded-t",
                  style: { height: `${m.yield / 16 * 100}%` },
                  title: `${m.yield} L` }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("span", { className: "text-[9px] text-slate-400", children: m.day }, void 0, false)] }, i, true
              )
              ) }, void 0, false
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "grid grid-cols-3 gap-2 text-xs pt-1", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "हरा चारा" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-sm", children: [greenFodderKg, " Kg"] }, void 0, true)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "सूखा भूसा" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-amber-400 text-sm", children: [dryFodderKg, " Kg"] }, void 0, true)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-slate-400 block", children: "दाना मिश्रण" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-cyan-400 text-sm", children: [concentrateKg, " Kg"] }, void 0, true)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-blue-500/30 shadow-glow-cyan space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-blue-300 font-bold text-sm", children: [/*#__PURE__*/
              _jsxDEV(Stethoscope, { className: "w-5 h-5 text-blue-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "2. टीकाकरण अनुसूची व पशु चिकित्सक अपॉइंटमेंट" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono font-bold", children: "Vet Tele-Health" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center", children: [/*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-400 block text-[10px]", children: "आगामी मुँहपका-खुरपका (FMD) टीका:" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-bold text-amber-300", children: "25 अगस्त 2026 (निशुल्क)" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV(CalendarCheck, { className: "w-5 h-5 text-amber-400" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("form", { onSubmit: handleBookVet, className: "flex gap-2", children: [/*#__PURE__*/
            _jsxDEV("input", {
              type: "date",
              value: doctorDate,
              onChange: (e) => setDoctorDate(e.target.value),
              className: "bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("button", {
              type: "submit",
              className: "flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md", children: [/*#__PURE__*/

              _jsxDEV(Stethoscope, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "डॉक्टर अपॉइंटमेंट बुक करें" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),

          vetBooked && /*#__PURE__*/
          _jsxDEV("div", { className: "p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 font-semibold border border-emerald-500/40", children: [/*#__PURE__*/
            _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: ["डॉक्टर अपॉइंटमेंट ", doctorDate, " के लिए कन्फर्म है!"] }, void 0, true)] }, void 0, true
          )] }, void 0, true

        )] }, void 0, true

      ), /*#__PURE__*/


      _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
        _jsxDEV("h3", { className: "text-lg font-bold text-white", children: ["आपके पंजीकृत पशु (", ownedAnimals.length, ")"] }, void 0, true),

        ownedAnimals.length === 0 ? /*#__PURE__*/
        _jsxDEV("div", { className: "glass-panel p-8 rounded-3xl text-center space-y-2 border border-slate-800", children: [/*#__PURE__*/
          _jsxDEV(User, { className: "w-10 h-10 text-slate-600 mx-auto" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-sm font-semibold text-slate-300", children: "आपके मोबाइल नंबर से कोई पशु पंजीकृत नहीं मिला।" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400", children: "पशु टैगिंग एजेंट (9826011111) या एडमिन (940778182) से संपर्क करें।" }, void 0, false)] }, void 0, true
        ) : /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children:
          ownedAnimals.map((animal) => /*#__PURE__*/
          _jsxDEV("div", {

            className: "glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4 shadow-xl", children: [/*#__PURE__*/

            _jsxDEV("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
              _jsxDEV("img", { src: animal.photos[0], alt: animal.breed, className: "w-20 h-20 rounded-2xl object-cover border border-slate-700 shadow-md" }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { className: "flex-1", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30", children:
                  animal.category }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("h4", { className: "text-lg font-bold text-white mt-1", children: animal.breed }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-mono text-xs text-amber-400 font-bold block", children: ["EAR-TAG: ",
                  animal.tagId] }, void 0, true
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { className: "bg-white p-2 rounded-xl shadow", children: /*#__PURE__*/
                _jsxDEV(QRCodeSVG, { value: `PASHUDHAN:${animal.tagId}`, size: 64 }, void 0, false) }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV(GeoFenceMap, { geoFence: animal.geoFence, currentLocation: animal.location }, void 0, false), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: () => onSelectAnimal(animal),
              className: "w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-700", children: [/*#__PURE__*/

              _jsxDEV("span", { children: "संपूर्ण स्वास्थ्य एवं नोटिस विवरण देखें" }, void 0, false), /*#__PURE__*/
              _jsxDEV(ArrowRight, { className: "w-4 h-4" }, void 0, false)] }, void 0, true
            )] }, animal.id, true
          )
          ) }, void 0, false
        )] }, void 0, true

      )] }, void 0, true

    ));

};