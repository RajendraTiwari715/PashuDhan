import React, { useState } from 'react';

import { setUserSession, getRoleForPhone } from '../services/storage';
import { Phone, KeyRound, CheckCircle2, ArrowRight, X } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";








export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    const clean = phone.trim().replace(/\D/g, '');
    if (clean.length < 8) {
      setError('कृपया सही मोबाइल नंबर दर्ज करें।');
      return;
    }

    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('कृपया सही OTP दर्ज करें।');
      return;
    }

    const clean = phone.trim().replace(/\D/g, '');
    const assignedRole = getRoleForPhone(clean);

    const session = {
      phone: clean,
      role: assignedRole,
      isLoggedIn: true
    };

    setUserSession(session);
    onLoginSuccess(session);
    onClose();
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn", children: /*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700/80", children: [/*#__PURE__*/


        _jsxDEV("button", {
          onClick: onClose,
          className: "absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors", children: /*#__PURE__*/

          _jsxDEV(X, { className: "w-5 h-5" }, void 0, false) }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "text-center mb-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20", children: /*#__PURE__*/
            _jsxDEV(Phone, { className: "w-7 h-7 text-white" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("h2", { className: "text-2xl font-bold text-white", children: "पशु-धन पोर्टल लॉगिन" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "पंजीकृत मोबाइल नंबर एवं OTP द्वारा सत्यापित करें" }, void 0, false

          )] }, void 0, true
        ),

        error && /*#__PURE__*/
        _jsxDEV("div", { className: "mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium", children:
          error }, void 0, false
        ),


        step === 'phone' ? /*#__PURE__*/
        _jsxDEV("form", { onSubmit: handleSendOtp, className: "space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5", children: "मोबाइल नंबर (Mobile Number)" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("div", { className: "relative", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "absolute left-3.5 top-3.5 text-sm font-semibold text-slate-400", children: "+91" }, void 0, false

              ), /*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "आपका मोबाइल नंबर दर्ज करें",
                className: "w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-14 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-sm",
                autoFocus: true }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("button", {
            type: "submit",
            className: "w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2", children: [/*#__PURE__*/

            _jsxDEV("span", { children: "OTP प्राप्त करें (Send OTP)" }, void 0, false), /*#__PURE__*/
            _jsxDEV(ArrowRight, { className: "w-4 h-4" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ) : /*#__PURE__*/

        _jsxDEV("form", { onSubmit: handleVerifyOtp, className: "space-y-4", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center justify-between mb-1.5", children: /*#__PURE__*/
              _jsxDEV("label", { className: "text-xs font-semibold text-slate-300", children: "6-अंकों का OTP दर्ज करें" }, void 0, false

              ) }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "relative", children: [/*#__PURE__*/
              _jsxDEV(KeyRound, { className: "absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                maxLength: 6,
                value: otp,
                onChange: (e) => setOtp(e.target.value),
                placeholder: "OTP दर्ज करें",
                className: "w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white tracking-widest font-mono text-lg placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-center",
                autoFocus: true }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1", children: ["प्रमाणन कोड नंबर ", /*#__PURE__*/
              _jsxDEV("span", { className: "font-mono text-slate-200", children: phone }, void 0, false), " पर भेजा गया है"] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "flex gap-2", children: [/*#__PURE__*/
            _jsxDEV("button", {
              type: "button",
              onClick: () => setStep('phone'),
              className: "w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-xl border border-slate-700 text-xs", children:
              "नंबर बदलें" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("button", {
              type: "submit",
              className: "w-2/3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 text-sm", children: [/*#__PURE__*/

              _jsxDEV("span", { children: "सत्यापित करें एवं लॉगिन करें" }, void 0, false), /*#__PURE__*/
              _jsxDEV(CheckCircle2, { className: "w-4 h-4" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true


      ) }, void 0, false
    ));

};