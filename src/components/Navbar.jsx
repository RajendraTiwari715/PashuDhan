import React, { useState, useEffect } from 'react';

import { isOnline } from '../services/offlineSync';
import { VoiceLanguageSelector } from './VoiceLanguageSelector';
import { VoiceCommandMicButton } from './VoiceCommandMicButton';
import { ShieldAlert, QrCode, LogIn, LogOut, Tag, Radio, User, Building2, Cpu, MessageSquare, Bluetooth, Wifi, WifiOff } from 'lucide-react';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";















export const Navbar = ({
  session,
  onOpenLogin,
  onLogout,
  onOpenScanner,
  onOpenAIVision,
  onOpenWhatsApp,
  onOpenBluetooth,
  onSearchTag,
  onOpenLinkTagModal,
  setActiveTab
}) => {
  const [onlineState, setOnlineState] = useState(true);

  useEffect(() => {
    setOnlineState(isOnline());
    const handleOnline = () => setOnlineState(true);
    const handleOffline = () => setOnlineState(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return (/*#__PURE__*/
          _jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1", children: [/*#__PURE__*/
            _jsxDEV(ShieldAlert, { className: "w-3 h-3 text-amber-400" }, void 0, false), " एडमिन"] }, void 0, true
          ));

      case 'tagging_agent':
        return (/*#__PURE__*/
          _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1", children: [/*#__PURE__*/
            _jsxDEV(Tag, { className: "w-3 h-3 text-emerald-400" }, void 0, false), " टैगिंग एजेंट"] }, void 0, true
          ));

      case 'patrol_squad':
        return (/*#__PURE__*/
          _jsxDEV("span", { className: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1", children: [/*#__PURE__*/
            _jsxDEV(Radio, { className: "w-3 h-3 text-cyan-400" }, void 0, false), " पेट्रोल स्क्वाड"] }, void 0, true
          ));

      case 'pashu_malik':
        return (/*#__PURE__*/
          _jsxDEV("span", { className: "bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1", children: [/*#__PURE__*/
            _jsxDEV(User, { className: "w-3 h-3 text-blue-400" }, void 0, false), " पशुपालक"] }, void 0, true
          ));

      case 'gaushala_manager':
        return (/*#__PURE__*/
          _jsxDEV("span", { className: "bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1", children: [/*#__PURE__*/
            _jsxDEV(Building2, { className: "w-3 h-3 text-rose-400" }, void 0, false), " गोशाला"] }, void 0, true
          ));

      default:
        return null;
    }
  };

  return (/*#__PURE__*/
    _jsxDEV(_Fragment, { children: /*#__PURE__*/

      _jsxDEV("header", { className: "sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl", children: /*#__PURE__*/
        _jsxDEV("div", { className: "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8", children: /*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center justify-between h-16 sm:h-20", children: [/*#__PURE__*/


            _jsxDEV("div", {
              className: "flex items-center gap-2.5 cursor-pointer group",
              onClick: () => setActiveTab('home'), children: [/*#__PURE__*/

              _jsxDEV("div", { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300", children: /*#__PURE__*/
                _jsxDEV("div", { className: "w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center", children: /*#__PURE__*/
                  _jsxDEV("span", { className: "text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-cyan-300", children: "पशु" }, void 0, false

                  ) }, void 0, false
                ) }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("div", { className: "flex items-center gap-1.5", children: [/*#__PURE__*/
                  _jsxDEV("h1", { className: "text-lg sm:text-xl font-black text-white tracking-wide", children: ["पशु-धन ", /*#__PURE__*/
                    _jsxDEV("span", { className: "text-emerald-400 font-normal text-xs sm:text-sm", children: "PashuDhan" }, void 0, false)] }, void 0, true
                  ), /*#__PURE__*/
                  _jsxDEV("div", { className: "hidden sm:block", children: session && getRoleBadge(session.role) }, void 0, false)] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("p", { className: "text-[11px] text-slate-400 hidden md:block", children: "राष्ट्रीय सनातनी गोवंश रक्षा, QR टैगिंग एवं डिजिटल गवर्नेंस पोर्टल" }, void 0, false

                )] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [/*#__PURE__*/


              _jsxDEV(VoiceCommandMicButton, {
                onSearchTag: onSearchTag,
                onOpenScanner: onOpenScanner,
                onOpenLinkTag: onOpenLinkTagModal,
                onNavigateHome: () => setActiveTab('home'),
                onNavigateAdmin: () => setActiveTab('admin') }, void 0, false
              ), /*#__PURE__*/


              _jsxDEV(VoiceLanguageSelector, {}, void 0, false), /*#__PURE__*/


              _jsxDEV("div", {
                className: `flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full border ${
                onlineState ?
                'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'}`,

                title: onlineState ? 'ऑनलाइन सर्वर सिंक एक्टिव' : 'ऑफलाइन मोड active - डेटा लोकल सेव होगा', children: [

                onlineState ? /*#__PURE__*/_jsxDEV(Wifi, { className: "w-3 h-3 text-emerald-400" }, void 0, false) : /*#__PURE__*/_jsxDEV(WifiOff, { className: "w-3 h-3 text-amber-400" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "hidden sm:inline", children: onlineState ? 'Online' : 'Offline Mode' }, void 0, false)] }, void 0, true
              ), /*#__PURE__*/


              _jsxDEV("button", {
                onClick: onOpenAIVision,
                className: "p-2 rounded-xl bg-slate-800 hover:bg-emerald-500/20 text-emerald-300 border border-slate-700 hover:border-emerald-500/40 transition-colors",
                title: "AI गोवंश नस्ल व लंपी रोग स्कैनर", children: /*#__PURE__*/

                _jsxDEV(Cpu, { className: "w-4 h-4 text-emerald-400" }, void 0, false) }, void 0, false
              ), /*#__PURE__*/


              _jsxDEV("button", {
                onClick: onOpenWhatsApp,
                className: "p-2 rounded-xl bg-slate-800 hover:bg-green-500/20 text-green-300 border border-slate-700 hover:border-green-500/40 transition-colors",
                title: "व्हाट्सएप ई-नोटिस प्रेषक", children: /*#__PURE__*/

                _jsxDEV(MessageSquare, { className: "w-4 h-4 text-green-400" }, void 0, false) }, void 0, false
              ), /*#__PURE__*/


              _jsxDEV("button", {
                onClick: onOpenBluetooth,
                className: "p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors",
                title: "ब्लूटूथ RFID रीडर पेयरिंग", children: /*#__PURE__*/

                _jsxDEV(Bluetooth, { className: "w-4 h-4 text-cyan-400" }, void 0, false) }, void 0, false
              ), /*#__PURE__*/


              _jsxDEV("button", {
                onClick: onOpenScanner,
                className: "flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-md transition-all text-xs", children: [/*#__PURE__*/

                _jsxDEV(QrCode, { className: "w-3.5 h-3.5" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "hidden xs:inline", children: "QR स्कैन" }, void 0, false)] }, void 0, true
              ),


              session ? /*#__PURE__*/
              _jsxDEV("button", {
                onClick: onLogout,
                className: "p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors",
                title: "लॉगआउट", children: /*#__PURE__*/

                _jsxDEV(LogOut, { className: "w-4 h-4" }, void 0, false) }, void 0, false
              ) : /*#__PURE__*/

              _jsxDEV("button", {
                onClick: onOpenLogin,
                className: "flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs", children: [/*#__PURE__*/

                _jsxDEV(LogIn, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: "लॉगिन" }, void 0, false)] }, void 0, true
              )] }, void 0, true


            )] }, void 0, true

          ) }, void 0, false
        ) }, void 0, false
      ) }, void 0, false
    ));

};