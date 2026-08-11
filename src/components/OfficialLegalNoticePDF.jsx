import React from 'react';

import { QRCodeSVG } from 'qrcode.react';
import { ShieldAlert, Printer, X, MapPin } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";









export const OfficialLegalNoticePDF = ({
  isOpen,
  onClose,
  animal,
  notice
}) => {
  if (!isOpen) return null;

  const noticeId = notice ? notice.id : 'NTC-8891';
  const offenseLevel = notice ? notice.offenseLevel : 1;

  const handlePrintDocument = () => {
    window.print();
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn", children: /*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-amber-500/40 text-slate-900 bg-white", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "flex justify-between items-center mb-6 print:hidden border-b pb-4 border-slate-200", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-2", children: /*#__PURE__*/
            _jsxDEV("span", { className: "bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold border border-amber-300", children: "शासकीय विधिक नोटिस पूर्वावलोकन (Official Legal E-Notice)" }, void 0, false

            ) }, void 0, false
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "flex items-center gap-2", children: [/*#__PURE__*/
            _jsxDEV("button", {
              onClick: handlePrintDocument,
              className: "bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md", children: [/*#__PURE__*/

              _jsxDEV(Printer, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "नोटिस PDF प्रिंट / सेव करें" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: onClose,
              className: "p-2 rounded-full text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors", children: /*#__PURE__*/

              _jsxDEV(X, { className: "w-5 h-5" }, void 0, false) }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "relative p-6 sm:p-10 border-4 border-double border-slate-900 rounded-2xl bg-white text-slate-900 space-y-6 shadow-inner overflow-hidden", children: [/*#__PURE__*/


          _jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-[-30deg]", children: /*#__PURE__*/
            _jsxDEV("div", { className: "text-center font-black text-6xl text-slate-900 uppercase", children: ["मध्य प्रदेश शासन", /*#__PURE__*/
              _jsxDEV("br", {}, void 0, false), "पशु चिकित्सा सेवा", /*#__PURE__*/_jsxDEV("br", {}, void 0, false), "राजपत्रित विधिक ई-नोटिस"] }, void 0, true
            ) }, void 0, false
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "text-center space-y-1 border-b-2 border-slate-900 pb-4", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "font-bold text-xs uppercase tracking-widest text-slate-700", children: "मध्य प्रदेश शासन - पशुपालन एवं डेयरी विभाग | पुलिस नियंत्रण कक्ष" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-wide", children: "राष्ट्रीय डिजिटल गोवंश ई-नोटिस व चेतावनी पत्र" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("div", { className: "text-xs font-mono font-bold text-red-700", children: "(म.प्र. गोवंश वध प्रतिषेध अधिनियम एवं पशु क्रूरता निवारण धारा 1962 के अंतर्गत प्रेषित)" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-300 font-mono text-xs", children: [/*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/_jsxDEV("span", { className: "font-bold text-slate-700", children: "विधिक नोटिस संख्या:" }, void 0, false), " ", /*#__PURE__*/_jsxDEV("span", { className: "font-bold text-slate-950", children: noticeId }, void 0, false)] }, void 0, true), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/_jsxDEV("span", { className: "font-bold text-slate-700", children: "जारी तिथि:" }, void 0, false), " ", new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })] }, void 0, true)] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "border-2 border-red-700 text-red-700 font-black text-xs px-3 py-1.5 rounded-lg transform -rotate-2 uppercase tracking-wider text-center", children: ["🚨 OFFENSE LEVEL ",
              offenseLevel, " NOTICE", /*#__PURE__*/_jsxDEV("br", {}, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px]", children: "48 HOURS RESOLUTION TIMER" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "space-y-2 text-xs", children: [/*#__PURE__*/
            _jsxDEV("h4", { className: "font-bold text-slate-900 uppercase border-b border-slate-400 pb-1", children: "1. पशुपालक एवं पंजीकृत गोवंश विवरण" }, void 0, false), /*#__PURE__*/

            _jsxDEV("div", { className: "grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200", children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-600 block text-[11px]", children: "पशुपालक का नाम:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-bold text-slate-950", children: animal.owner.name }, void 0, false)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-600 block text-[11px]", children: "पंजीकृत मोबाइल नंबर:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-mono font-bold text-slate-950", children: ["+91 ", animal.owner.phone] }, void 0, true)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-600 block text-[11px]", children: "15-Digit ISO QR Tag ID:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-mono font-bold text-emerald-800 text-sm", children: animal.tagId }, void 0, false)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-600 block text-[11px]", children: "पशु श्रेणी व नस्ल:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-bold text-slate-950", children: [animal.category, " - ", animal.breed] }, void 0, true)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "space-y-2 text-xs", children: [/*#__PURE__*/
            _jsxDEV("h4", { className: "font-bold text-slate-900 uppercase border-b border-slate-400 pb-1", children: "2. 500m जिओ-फेंस उल्लंघन साक्ष्य एवं जीपीएस लोकेशन" }, void 0, false), /*#__PURE__*/

            _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200", children: [/*#__PURE__*/
                _jsxDEV("div", { className: "font-semibold text-slate-800 flex items-center gap-1", children: [/*#__PURE__*/
                  _jsxDEV(MapPin, { className: "w-3.5 h-3.5 text-red-600" }, void 0, false), "जीपीएस लोकेशन साक्ष्य:"] }, void 0, true

                ), /*#__PURE__*/
                _jsxDEV("div", { className: "text-[11px] text-slate-700 leading-relaxed", children: [
                  animal.location.addressName, ", ", animal.location.city, " (", animal.location.pincode, ")"] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("div", { className: "font-mono text-[10px] text-slate-500", children: ["अक्षांश: ",
                  animal.location.lat, ", देशांतर: ", animal.location.lng] }, void 0, true
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { className: "flex justify-center items-center bg-white p-2 border border-slate-300 rounded-xl", children: /*#__PURE__*/
                _jsxDEV(QRCodeSVG, { value: `PASHUDHAN_NOTICE:${noticeId}`, size: 80 }, void 0, false) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs space-y-1", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "font-bold flex items-center gap-1", children: [/*#__PURE__*/
              _jsxDEV(ShieldAlert, { className: "w-4 h-4 text-amber-700" }, void 0, false), "वैधानिक चेतावनी निर्देश:"] }, void 0, true

            ), /*#__PURE__*/
            _jsxDEV("p", { className: "text-[11px] leading-relaxed", children: "आपको सूचित किया जाता है कि आगामी 48 घंटे के भीतर उक्त गोवंश को 500 मीटर फेंस के भीतर (अपने डेयरी फार्म/घर) लाएं। नियत समय में समाधान न होने पर पशुपालक की प्रोफ़ाइल ब्लॉक कर जब्ती आदेश प्रेषित किया जाएगा।" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "flex justify-between items-end pt-6 border-t-2 border-slate-900 text-xs", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "text-center space-y-1", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "w-20 h-20 rounded-full border-2 border-emerald-800 flex items-center justify-center font-bold text-[9px] text-emerald-800 uppercase mx-auto p-1 text-center", children: ["शासकीय मुहर", /*#__PURE__*/
                _jsxDEV("br", {}, void 0, false), "पशुपालन विभाग"] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "font-bold text-slate-800", children: "पशु कल्याण अधिकारी" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "text-center space-y-1", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "w-20 h-20 rounded-full border-2 border-red-800 flex items-center justify-center font-bold text-[9px] text-red-800 uppercase mx-auto p-1 text-center", children: ["पुलिस मुहर", /*#__PURE__*/
                _jsxDEV("br", {}, void 0, false), "कंट्रोल रूम"] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "font-bold text-slate-800", children: "प्रभारी निरीक्षक, गौरक्षक दल" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true

        )] }, void 0, true

      ) }, void 0, false
    ));

};