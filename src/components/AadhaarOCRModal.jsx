import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Camera, Sparkles, X, RefreshCw } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";













export const AadhaarOCRModal = ({
  isOpen,
  onClose,
  onOCRComplete
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(





    null);

  if (!isOpen) return null;

  const handleStartOCR = () => {
    setIsScanning(true);
    setScannedResult(null);

    // Simulate AI OCR scanning process
    setTimeout(() => {
      setIsScanning(false);
      const result = {
        scannedName: 'रामस्वरूप पटेल (Ramswaroop Patel)',
        aadhaarNo: '4521-8890-1204',
        dob: '15/08/1985',
        gender: 'MALE',
        address: 'मकान नं. 45, ग्राम फंदा, जिला भोपाल, म.प्र. 462030'
      };
      setScannedResult(result);
    }, 1800);
  };

  const handleConfirm = () => {
    if (scannedResult) {
      onOCRComplete(scannedResult);
      onClose();
    }
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn", children: /*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700", children: [/*#__PURE__*/


        _jsxDEV("button", {
          onClick: onClose,
          className: "absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors", children: /*#__PURE__*/

          _jsxDEV(X, { className: "w-5 h-5" }, void 0, false) }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "text-center mb-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20", children: /*#__PURE__*/
            _jsxDEV(CreditCard, { className: "w-7 h-7 text-slate-950" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("h3", { className: "text-xl font-bold text-white", children: "आधार OCR स्कैनर (Aadhaar Auto-OCR)" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "पशुपालक के आधार कार्ड से डेटा स्वतः स्कैन एवं सत्यापित करें" }, void 0, false

          )] }, void 0, true
        ),


        !scannedResult && /*#__PURE__*/
        _jsxDEV("div", { className: "relative aspect-[1.6/1] max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-dashed border-cyan-500/60 bg-slate-950 flex flex-col items-center justify-center mb-6 p-4 text-center", children:
          isScanning ? /*#__PURE__*/
          _jsxDEV("div", { className: "space-y-3", children: [/*#__PURE__*/
            _jsxDEV(RefreshCw, { className: "w-10 h-10 text-cyan-400 animate-spin mx-auto" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-xs font-mono text-cyan-300 block animate-pulse", children: "AI OCR स्कैनर आधार टेक्स्ट एक्सट्रैक्ट कर रहा है..." }, void 0, false

            )] }, void 0, true
          ) : /*#__PURE__*/

          _jsxDEV("div", { className: "space-y-2", children: [/*#__PURE__*/
            _jsxDEV(Camera, { className: "w-10 h-10 text-slate-600 mx-auto" }, void 0, false), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400", children: "आधार कार्ड का अगला हिस्सा कैमरे के सामने रखें" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("button", {
              type: "button",
              onClick: handleStartOCR,
              className: "mt-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 mx-auto transition-colors", children: [/*#__PURE__*/

              _jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "आधार कार्ड स्कैन करें" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ) }, void 0, false

        ),



        scannedResult && /*#__PURE__*/
        _jsxDEV("div", { className: "space-y-4 mb-6 animate-fadeIn", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-semibold", children: [/*#__PURE__*/
            _jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "UIDAI सर्वर द्वारा आधार सफलतापूर्वक सत्यापित हुआ!" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between py-1 border-b border-slate-800", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-400", children: "स्कैन किया नाम:" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-bold text-white", children: scannedResult.scannedName }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between py-1 border-b border-slate-800", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-400", children: "आधार संख्या:" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono text-cyan-400 font-bold", children: scannedResult.aadhaarNo }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between py-1 border-b border-slate-800", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-400", children: "जन्म तिथि:" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-200", children: scannedResult.dob }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between py-1 border-b border-slate-800", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-400", children: "लिंग:" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-200", children: scannedResult.gender }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between py-1", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-400", children: "पता:" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "text-right text-slate-300", children: scannedResult.address }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("button", {
            onClick: handleConfirm,
            className: "w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm", children: [/*#__PURE__*/

            _jsxDEV(CheckCircle2, { className: "w-5 h-5" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "यह डेटा प्रयुक्त करें (Use Scanned Aadhaar Data)" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true


      ) }, void 0, false
    ));

};