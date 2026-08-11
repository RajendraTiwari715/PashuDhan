import React, { useState } from 'react';

import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  AlertTriangle,
  Award,
  Siren,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  BarChart3,
  Activity,
  Building2 } from
'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";










export const UserDashboard = ({
  onOpenScanner,
  onOpenComplaintForm,
  onSelectAnimal,
  complaints,
  animals
}) => {
  const [sosDispatched, setSosDispatched] = useState(false);

  const handleSosAmbulanceDispatch = () => {
    setSosDispatched(true);
    alert('🚨 पशु आपातकालीन 1962 एम्बुलेंस को जीपीएस लोकेशन (भोपाल मुख्य मार्ग) स्वतः डिस्पैच कर दी गई है! 10 मिनट में निकटतम मोबाइल मेडिकल वैन पहुँचेगी।');
    setTimeout(() => setSosDispatched(false), 6000);
  };

  const sampleTags = ['TAG-1001', 'TAG-1002', 'TAG-1003', 'TAG-1004'];

  const leaderboard = [
  { rank: 1, name: 'गौरक्षक राहुल राजपूत (भोपाल)', points: 450, badge: '🏆 जीव रक्षा रत्न' },
  { rank: 2, name: 'श्रीमती नीलम पांडे (इंदौर)', points: 380, badge: '🥇 गो-सेवा शिरोमणि' },
  { rank: 3, name: 'सचिन वर्मा (उज्जैन)', points: 290, badge: '🥈 गौरक्षक मित्र' }];


  const weeklyAnalytics = [
  { day: 'सोम', rescued: 14, tagLinked: 28 },
  { day: 'मंगल', rescued: 19, tagLinked: 34 },
  { day: 'बुध', rescued: 12, tagLinked: 22 },
  { day: 'गुरु', rescued: 25, tagLinked: 45 },
  { day: 'शुक्र', rescued: 22, tagLinked: 38 },
  { day: 'शनि', rescued: 30, tagLinked: 52 },
  { day: 'रवि', rescued: 18, tagLinked: 31 }];


  return (/*#__PURE__*/
    _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 shadow-glow-emerald", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" }, void 0, false), /*#__PURE__*/
        _jsxDEV("div", { className: "absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" }, void 0, false), /*#__PURE__*/

        _jsxDEV("div", { className: "relative z-10 max-w-3xl space-y-6", children: [/*#__PURE__*/

          _jsxDEV("div", { className: "inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-md", children: [/*#__PURE__*/
            _jsxDEV(Sparkles, { className: "w-4 h-4 text-amber-400 animate-pulse" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "राष्ट्रीय सनातनी गोवंश रक्षा एवं Paytm-Style QR टैगिंग पोर्टल" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("h1", { className: "text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight", children: ["पशु-धन ", /*#__PURE__*/
            _jsxDEV("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-cyan-300", children: "PashuDhan" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("p", { className: "text-sm sm:text-base text-slate-300 leading-relaxed", children: "सड़क पर घूम रहे किसी भी गोवंश के कान पर लगे **QR/RFID Tag** को स्कैन करें। पशु के मालिक की जानकारी, जिओ-फेंस एवं अलर्ट तुरंत प्राप्त करें या घायल/लावारिस पशु की शिकायत सीधे पुलिस व पशु विभाग को भेजें।" }, void 0, false

          ), /*#__PURE__*/

          _jsxDEV("div", { className: "flex flex-wrap items-center gap-4 pt-2", children: [/*#__PURE__*/
            _jsxDEV("button", {
              onClick: onOpenScanner,
              className: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black px-7 py-4 rounded-2xl shadow-glow-emerald flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base", children: [/*#__PURE__*/

              _jsxDEV(QrCode, { className: "w-5 h-5 animate-pulse" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "पशु का QR कोड स्कैन करें" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: () => onOpenComplaintForm(),
              className: "bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-bold px-6 py-4 rounded-2xl transition-all flex items-center gap-2.5 text-sm", children: [/*#__PURE__*/

              _jsxDEV(AlertTriangle, { className: "w-5 h-5 text-amber-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "आवारा पशु शिकायत दर्ज करें" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true

        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "glass-panel p-5 rounded-3xl border border-emerald-500/30 shadow-glow-emerald space-y-1", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex justify-between items-center text-xs text-slate-400 font-semibold", children: [/*#__PURE__*/
            _jsxDEV("span", { children: "कुल पंजीकृत गोवंश" }, void 0, false), /*#__PURE__*/
            _jsxDEV(Activity, { className: "w-4 h-4 text-emerald-400" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "text-3xl font-black text-emerald-400 font-mono", children: "1,420" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: "text-[10px] text-emerald-300/80 font-mono", children: "↑ 12% इस सप्ताह" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "glass-panel p-5 rounded-3xl border border-cyan-500/30 shadow-glow-cyan space-y-1", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex justify-between items-center text-xs text-slate-400 font-semibold", children: [/*#__PURE__*/
            _jsxDEV("span", { children: "सक्रिय पेट्रोलिंग टीम" }, void 0, false), /*#__PURE__*/
            _jsxDEV(ShieldAlert, { className: "w-4 h-4 text-cyan-400" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "text-3xl font-black text-cyan-400 font-mono", children: "48" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: "text-[10px] text-cyan-300/80 font-mono", children: "24x7 हाईवे गश्त" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "glass-panel p-5 rounded-3xl border border-amber-500/30 shadow-glow-amber space-y-1", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex justify-between items-center text-xs text-slate-400 font-semibold", children: [/*#__PURE__*/
            _jsxDEV("span", { children: "जिओ-फेंस ऑन-प्रिमाइसेस" }, void 0, false), /*#__PURE__*/
            _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-amber-400" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "text-3xl font-black text-amber-400 font-mono", children: "94%" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: "text-[10px] text-amber-300/80 font-mono", children: "सुरक्षित बाड़ के अंदर" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "glass-panel p-5 rounded-3xl border border-rose-500/30 shadow-glow-rose space-y-1", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex justify-between items-center text-xs text-slate-400 font-semibold", children: [/*#__PURE__*/
            _jsxDEV("span", { children: "संबद्ध पंजीकृत गोशालाएं" }, void 0, false), /*#__PURE__*/
            _jsxDEV(Building2, { className: "w-4 h-4 text-rose-400" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "text-3xl font-black text-rose-400 font-mono", children: "112" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: "text-[10px] text-rose-300/80 font-mono", children: "30-दिन क्वारंटीन शेड" }, void 0, false)] }, void 0, true
        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-2 text-white font-bold text-base", children: [/*#__PURE__*/
            _jsxDEV(BarChart3, { className: "w-5 h-5 text-emerald-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "साप्ताहिक गोवंश रेस्क्यू एवं QR टैगिंग विश्लेषण चार्ट" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: "लाइव अपडेटेड" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-7 gap-2 items-end h-40 pt-4 px-2 bg-slate-950/80 rounded-2xl border border-slate-900", children:
          weeklyAnalytics.map((item, idx) => /*#__PURE__*/
          _jsxDEV("div", { className: "flex flex-col items-center gap-2 group", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "w-full flex justify-center items-end gap-1 h-28", children: [/*#__PURE__*/

              _jsxDEV("div", {
                className: "w-3 rounded-t-lg bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:scale-y-105 transition-transform",
                style: { height: `${item.rescued / 52 * 100}%` },
                title: `रेस्क्यू: ${item.rescued}` }, void 0, false
              ), /*#__PURE__*/

              _jsxDEV("div", {
                className: "w-3 rounded-t-lg bg-gradient-to-t from-amber-600 to-yellow-400 group-hover:scale-y-105 transition-transform",
                style: { height: `${item.tagLinked / 52 * 100}%` },
                title: `टैग लिंक्ड: ${item.tagLinked}` }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[11px] text-slate-400 font-bold", children: item.day }, void 0, false)] }, idx, true
          )
          ) }, void 0, false
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "flex items-center justify-center gap-6 text-xs font-semibold pt-1", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-2 text-emerald-400", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "w-3 h-3 rounded-full bg-emerald-500" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "गोवंश रेस्क्यू संख्या" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-2 text-amber-400", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "w-3 h-3 rounded-full bg-amber-500" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "QR Ear-Tag मैपिंग" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-rose-500/40 shadow-glow-rose space-y-4 relative overflow-hidden", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-rose-300 font-bold text-sm", children: [/*#__PURE__*/
              _jsxDEV(Siren, { className: "w-5 h-5 text-rose-400 animate-pulse" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "SOS आपातकालीन पशु एम्बुलेंस (1962) जीपीएस डिस्पैच" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[10px] bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full font-mono font-bold", children: "GPS Ambulance" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("p", { className: "text-xs text-slate-400", children: "गंभीर घायल या एक्सीडेंट ग्रस्त गोवंश मिलने पर 1-क्लिक इमरजेंसी जीपीएस एम्बुलेंस बुलाएं।" }, void 0, false

          ), /*#__PURE__*/

          _jsxDEV("button", {
            onClick: handleSosAmbulanceDispatch,
            className: "w-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl border border-amber-400/30 transform active:scale-95", children: [/*#__PURE__*/

            _jsxDEV(Siren, { className: "w-5 h-5 animate-bounce text-amber-300" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "🚨 1-CLICK SOS: 1962 पशु एम्बुलेंस जीपीएस बुलाएं" }, void 0, false)] }, void 0, true
          ),

          sosDispatched && /*#__PURE__*/
          _jsxDEV("div", { className: "p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 font-semibold border border-emerald-500/40 animate-fadeIn", children: [/*#__PURE__*/
            _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "आपातकालीन एम्बुलेंस जीपीएस अलर्ट प्रेषित! वैन चालक आपसे संपर्क कर रहा है।" }, void 0, false)] }, void 0, true
          )] }, void 0, true

        ), /*#__PURE__*/


        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-amber-500/30 shadow-glow-amber space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-amber-300 font-bold text-sm", children: [/*#__PURE__*/
              _jsxDEV(Award, { className: "w-5 h-5 text-amber-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "गौरक्षक समुदाय लीडरबोर्ड एवं सम्मान पत्र" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-mono font-bold", children: "Citizen Hero" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "space-y-2", children:
            leaderboard.map((user) => /*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "flex items-center gap-2", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold font-mono text-[11px]", children: ["#",
                  user.rank] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("div", { children: [/*#__PURE__*/
                  _jsxDEV("span", { className: "font-bold text-white block", children: user.name }, void 0, false), /*#__PURE__*/
                  _jsxDEV("span", { className: "text-[10px] text-amber-400 font-semibold", children: user.badge }, void 0, false)] }, void 0, true
                )] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono font-bold text-emerald-400 text-xs", children: [user.points, " अंक"] }, void 0, true)] }, user.rank, true
            )
            ) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true

      ),


      complaints.length > 0 && /*#__PURE__*/
      _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
        _jsxDEV("h3", { className: "text-lg font-bold text-white flex items-center gap-2", children: [/*#__PURE__*/
          _jsxDEV(TrendingUp, { className: "w-5 h-5 text-cyan-400" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: ["लाइव शिकायत ट्रैकिंग एवं स्टेटस (", complaints.length, ")"] }, void 0, true)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children:
          complaints.slice(0, 2).map((c) => /*#__PURE__*/
          _jsxDEV("div", { className: "glass-panel p-5 rounded-3xl border border-slate-800 space-y-3 shadow-lg", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between items-center", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "font-mono text-xs font-bold text-cyan-400", children: c.id }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30", children:
                c.status }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "text-xs text-slate-300 font-medium line-clamp-2", children: c.description }, void 0, false), /*#__PURE__*/
            _jsxDEV("div", { className: "text-[10px] text-slate-400 font-mono", children: ["स्थान: ", c.location.addressName] }, void 0, true)] }, c.id, true
          )
          ) }, void 0, false
        )] }, void 0, true
      ), /*#__PURE__*/



      _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
          _jsxDEV("h3", { className: "text-lg font-bold text-white", children: "नमूना QR कान टैग (Sample Ear Tags)" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { className: "text-xs text-slate-400", children: "स्कैन करने हेतु क्लिक करें" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children:
          sampleTags.map((tagId) => {
            const animalMatch = animals.find((a) => a.tagId === tagId);
            return (/*#__PURE__*/
              _jsxDEV("div", {

                onClick: () => animalMatch && onSelectAnimal(animalMatch),
                className: "glass-panel p-4 rounded-3xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all text-center space-y-2 group shadow-xl hover:shadow-glow-emerald", children: [/*#__PURE__*/

                _jsxDEV("div", { className: "bg-white p-2.5 rounded-2xl inline-block group-hover:scale-105 transition-transform shadow-md", children: /*#__PURE__*/
                  _jsxDEV(QRCodeSVG, { value: `PASHUDHAN:${tagId}`, size: 84 }, void 0, false) }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("div", { className: "font-mono text-xs font-bold text-amber-400", children: tagId }, void 0, false), /*#__PURE__*/
                _jsxDEV("div", { className: "text-[11px] text-slate-300 truncate", children:
                  animalMatch ? animalMatch.breed : 'नमूना टैग' }, void 0, false
                )] }, tagId, true
              ));

          }) }, void 0, false
        )] }, void 0, true
      )] }, void 0, true

    ));

};