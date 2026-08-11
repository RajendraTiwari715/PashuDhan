import React, { useState } from 'react';

import { Building2, Navigation, Truck, QrCode, ShieldCheck, HeartPulse, PlusCircle, Utensils } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";







export const GaushalaModule = ({ animals }) => {
  const gaushalaAnimals = animals.filter((a) => a.gaushalaRecord || a.priorViolationsCount >= 2);
  const [selectedAnimal, setSelectedAnimal] = useState(gaushalaAnimals[0] || animals[3]);
  const [newFeedType, setNewFeedType] = useState('हरा चारा (Napier Grass)');
  const [newFeedQty, setNewFeedQty] = useState(12);
  const [newDocName, setNewDocName] = useState('डॉ. आर.के. शर्मा');
  const [newDiagnosis, setNewDiagnosis] = useState('नियमित स्वास्थ्य जांच, तापमान सामान्य (38.5°C)।');

  const record = selectedAnimal?.gaushalaRecord;

  const handleAddFeedLog = () => {
    if (!record) return;
    const todayStr = new Date().toISOString().split('T')[0];
    record.dailyFeedDetails.unshift({
      date: todayStr,
      feedType: newFeedType,
      quantityKg: newFeedQty
    });
    alert('दैनिक आहार विवरण गोशाला रजिस्टर में दर्ज हुआ!');
  };

  const handleAddHealthLog = () => {
    if (!record) return;
    const todayStr = new Date().toISOString().split('T')[0];
    record.healthLogs.unshift({
      date: todayStr,
      doctorName: newDocName,
      diagnosis: newDiagnosis
    });
    alert('स्वास्थ्य जांच एवं मेडिकल लॉग दर्ज हुआ!');
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 relative overflow-hidden", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: /*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/20", children: /*#__PURE__*/
              _jsxDEV(Building2, { className: "w-7 h-7 text-white" }, void 0, false) }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("h2", { className: "text-2xl sm:text-3xl font-black text-white", children: "गोशाला प्रबंधन एवं कस्टडी ट्रांसफर मॉड्यूल" }, void 0, false

              ), /*#__PURE__*/
              _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "रेस्क्यू नेविगेशन, गोशाला इनटेक स्कैन, 30-दिवसीय क्वारंटीन एवं दैनिक फीड लॉग" }, void 0, false

              )] }, void 0, true
            )] }, void 0, true
          ) }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-800 text-xs", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
            _jsxDEV(Navigation, { className: "w-4 h-4 text-cyan-400 mx-auto mb-1" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "font-bold text-slate-200 block text-[11px]", children: "1. रेस्क्यू नेविगेशन" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[9px] text-slate-400", children: "GPS Pin Route" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
            _jsxDEV(Truck, { className: "w-4 h-4 text-amber-400 mx-auto mb-1" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "font-bold text-slate-200 block text-[11px]", children: "2. लोडिंग व ट्रांसपोर्ट" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[9px] text-slate-400", children: "Vehicle Tracking" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
            _jsxDEV(QrCode, { className: "w-4 h-4 text-emerald-400 mx-auto mb-1" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "font-bold text-slate-200 block text-[11px]", children: "3. इनटेक QR स्कैन" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[9px] text-slate-400", children: "Gate Tag Scan" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center", children: [/*#__PURE__*/
            _jsxDEV(ShieldCheck, { className: "w-4 h-4 text-purple-400 mx-auto mb-1" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "font-bold text-slate-200 block text-[11px]", children: "4. कस्टडी ट्रांसफर" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[9px] text-slate-400", children: "Gaushala Custody" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center col-span-2 sm:col-span-1", children: [/*#__PURE__*/
            _jsxDEV(HeartPulse, { className: "w-4 h-4 text-rose-400 mx-auto mb-1" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "font-bold text-slate-200 block text-[11px]", children: "5. क्वारंटीन व फीड" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[9px] text-slate-400", children: "30-Day Feed Log" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
          _jsxDEV("h3", { className: "text-sm font-bold text-white uppercase tracking-wider", children: "गोशाला में भर्ती एवं कस्टडी पशु सूची" }, void 0, false

          ), /*#__PURE__*/

          _jsxDEV("div", { className: "space-y-3", children:
            gaushalaAnimals.map((animal) => /*#__PURE__*/
            _jsxDEV("div", {

              onClick: () => setSelectedAnimal(animal),
              className: `p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedAnimal?.id === animal.id ?
              'bg-rose-950/40 border-rose-500/60 shadow-lg' :
              'bg-slate-950/60 border-slate-800 hover:border-slate-700'}`, children: [/*#__PURE__*/


              _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "font-mono text-xs font-bold text-emerald-400", children: animal.tagId }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded-full font-bold", children: "Gaushala Custody" }, void 0, false

                )] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "text-sm font-bold text-white mt-1", children: animal.breed }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { className: "text-xs text-slate-400", children: ["पूर्व मालिक: ", animal.owner.name] }, void 0, true)] }, animal.id, true
            )
            ) }, void 0, false
          )] }, void 0, true
        ),


        selectedAnimal && /*#__PURE__*/
        _jsxDEV("div", { className: "md:col-span-2 space-y-6", children: [/*#__PURE__*/


          _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-slate-700 space-y-4", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4", children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("h3", { className: "text-xl font-bold text-white", children: [
                  selectedAnimal.breed, " (TAG: ", selectedAnimal.tagId, ")"] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: ["कस्टडी ट्रांसफर स्टेटस: ", /*#__PURE__*/
                  _jsxDEV("span", { className: "text-emerald-400 font-bold font-mono", children: "'Violator' → 'Gaushala Custody'" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { className: "text-right", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-xs text-slate-400 block font-mono", children: "30-दिवसीय आइसोलेशन" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "text-lg font-black text-rose-400 font-mono", children: [
                  record?.quarantineDaysRemaining || 29, " दिन शेष"] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-400 block", children: "गोशाला संस्थान:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-bold text-white", children: record?.gaushalaName || 'श्री गोपाल गोशाला भोपाल' }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "text-cyan-400 font-mono block", children: ["फोन: ", record?.gaushalaPhone] }, void 0, true)] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-400 block", children: "रेस्क्यू वाहन संख्या:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-mono font-bold text-amber-400 text-sm", children:
                  record?.transportVehicleNo || 'MP-04-GAU-9012' }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-400 block", children: "गेट इनटेक स्कैन: Verified" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-slate-700 space-y-4", children: [/*#__PURE__*/
            _jsxDEV("h4", { className: "text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2", children: [/*#__PURE__*/
              _jsxDEV(Utensils, { className: "w-4 h-4 text-emerald-400" }, void 0, false), "दैनिक आहार एवं पोषण लॉग (Daily Feed Log as per state rules)"] }, void 0, true

            ), /*#__PURE__*/

            _jsxDEV("div", { className: "flex flex-col sm:flex-row gap-3", children: [/*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: newFeedType,
                onChange: (e) => setNewFeedType(e.target.value),
                placeholder: "आहार प्रकार (e.g. हरा चारा + भूसा)",
                className: "flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("input", {
                type: "number",
                value: newFeedQty,
                onChange: (e) => setNewFeedQty(Number(e.target.value)),
                placeholder: "मात्रा (Kg)",
                className: "w-24 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono" }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("button", {
                onClick: handleAddFeedLog,
                className: "bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shrink-0", children: [/*#__PURE__*/

                _jsxDEV(PlusCircle, { className: "w-3.5 h-3.5" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: "आहार जोड़ें" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "space-y-2", children:
              record?.dailyFeedDetails.map((f, i) => /*#__PURE__*/
              _jsxDEV("div", { className: "flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-300", children: f.feedType }, void 0, false), /*#__PURE__*/
                _jsxDEV("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
                  _jsxDEV("span", { className: "font-mono font-bold text-emerald-400", children: [f.quantityKg, " Kg"] }, void 0, true), /*#__PURE__*/
                  _jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: f.date }, void 0, false)] }, void 0, true
                )] }, i, true
              )
              ) }, void 0, false
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-slate-700 space-y-4", children: [/*#__PURE__*/
            _jsxDEV("h4", { className: "text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2", children: [/*#__PURE__*/
              _jsxDEV(HeartPulse, { className: "w-4 h-4 text-cyan-400" }, void 0, false), "30-दिवसीय स्वास्थ्य एवं चिकित्सा लॉग (Quarantine Medical Log)"] }, void 0, true

            ), /*#__PURE__*/

            _jsxDEV("div", { className: "space-y-3", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [/*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: newDocName,
                  onChange: (e) => setNewDocName(e.target.value),
                  placeholder: "चिकित्सक का नाम",
                  className: "bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: newDiagnosis,
                  onChange: (e) => setNewDiagnosis(e.target.value),
                  placeholder: "स्वास्थ्य टिप्पणी / निदान",
                  className: "bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("button", {
                onClick: handleAddHealthLog,
                className: "bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1", children: [/*#__PURE__*/

                _jsxDEV(PlusCircle, { className: "w-3.5 h-3.5" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: "मेडिकल चेकअप लॉग करें" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "space-y-2", children:
              record?.healthLogs.map((h, i) => /*#__PURE__*/
              _jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1", children: [/*#__PURE__*/
                _jsxDEV("div", { className: "flex justify-between font-semibold text-cyan-300", children: [/*#__PURE__*/
                  _jsxDEV("span", { children: h.doctorName }, void 0, false), /*#__PURE__*/
                  _jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: h.date }, void 0, false)] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("p", { className: "text-slate-300 leading-relaxed", children: h.diagnosis }, void 0, false)] }, i, true
              )
              ) }, void 0, false
            )] }, void 0, true
          )] }, void 0, true

        )] }, void 0, true


      )] }, void 0, true

    ));

};