import React from 'react';

import { MessageSquare, ExternalLink, X } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";









export const WhatsAppNoticeModal = ({
  isOpen,
  onClose,
  animal,
  notice
}) => {
  if (!isOpen) return null;

  const ownerPhoneClean = animal.owner.phone.replace(/\D/g, '');
  const noticeId = notice ? notice.id : 'NTC-8891';
  const offenseLevel = notice ? notice.offenseLevel : 1;

  const whatsappMessage = encodeURIComponent(
    `🚨 *राष्ट्रीय पशु-धन डिजिटल ई-नोटिस विधिक सूचना*\n\n` +
    `प्रिय पशुपालक श्री ${animal.owner.name},\n` +
    `आपके रजिस्टर्ड गोवंश (टैग ID: ${animal.tagId}, नस्ल: ${animal.breed}) का 500m जिओ-फेंस उल्लंघन पाया गया है।\n\n` +
    `⚠️ *उल्लंघन स्तर*: ${offenseLevel}st Warning E-Notice (${noticeId})\n` +
    `⏱️ *समाधान सीमा*: 48 घंटे के भीतर पशु को ऑन-प्रिमाइसेस (घर/डेयरी) लाएं।\n\n` +
    `ऑनलाइन नोटिस एवं जिओ-लोकेशन देखने के लिए लिंक पर क्लिक करें:\n` +
    `https://pashudhan.gov.in/notice/${noticeId}`
  );

  const whatsappUrl = `https://wa.me/91${ownerPhoneClean}?text=${whatsappMessage}`;

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn", children: /*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-emerald-500/40", children: [/*#__PURE__*/


        _jsxDEV("button", {
          onClick: onClose,
          className: "absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors", children: /*#__PURE__*/

          _jsxDEV(X, { className: "w-5 h-5" }, void 0, false) }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "flex items-center gap-3 mb-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/20", children: /*#__PURE__*/
            _jsxDEV(MessageSquare, { className: "w-6 h-6 text-white" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold", children: "WhatsApp & SMS Gateway Dispatcher" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("h3", { className: "text-xl font-bold text-white mt-0.5", children: "💬 व्हाट्सएप ई-नोटिस प्रेषक (WhatsApp E-Notice)" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex justify-between items-center border-b border-slate-800 pb-2 text-emerald-400 font-bold", children: [/*#__PURE__*/
            _jsxDEV("span", { children: ["[ई-नोटिस आईडी: ", noticeId, "]"] }, void 0, true), /*#__PURE__*/
            _jsxDEV("span", { className: "text-amber-400", children: ["उल्लंघन: स्तर ", offenseLevel] }, void 0, true)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "space-y-1", children: [/*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/_jsxDEV("span", { className: "text-slate-400", children: "पशुपालक:" }, void 0, false), " ", animal.owner.name] }, void 0, true), /*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/_jsxDEV("span", { className: "text-slate-400", children: "व्हाट्सएप नंबर:" }, void 0, false), " +91 ", animal.owner.phone] }, void 0, true), /*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/_jsxDEV("span", { className: "text-slate-400", children: "पशु टैग कोड:" }, void 0, false), " ", animal.tagId, " (", animal.breed, ")"] }, void 0, true), /*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/_jsxDEV("span", { className: "text-slate-400", children: "समाधान समय:" }, void 0, false), " 48 Hours Countdown"] }, void 0, true)] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("a", {
          href: whatsappUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: onClose,
          className: "mt-6 w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all", children: [/*#__PURE__*/

          _jsxDEV(MessageSquare, { className: "w-5 h-5" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "व्हाट्सएप पर तुरंत ई-नोटिस संदेश भेजें" }, void 0, false), /*#__PURE__*/
          _jsxDEV(ExternalLink, { className: "w-4 h-4 ml-1" }, void 0, false)] }, void 0, true
        )] }, void 0, true

      ) }, void 0, false
    ));

};