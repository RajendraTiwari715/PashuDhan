import React, { useState } from 'react';

import { QRCodeSVG } from 'qrcode.react';
import { GeoFenceMap } from './GeoFenceMap';
import { NoticePenaltyModule } from './NoticePenaltyModule';
import {
  ShieldCheck,
  User,
  Phone,
  AlertTriangle,
  Calendar,
  Activity,
  ArrowLeft,
  Share2,
  CheckCircle2,
  CreditCard } from
'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";








export const AnimalDetailsPage = ({
  animal,
  onBack,
  onOpenComplaint
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const getCategoryTitle = (cat) => {
    switch (cat) {
      case 'Gay':return 'गाय (Cow)';
      case 'Bail':return 'बैल (Ox / Bull)';
      case 'Bachada':return 'बछड़ा / बछड़ी (Calf)';
      case 'Bhais':return 'भैंस (Buffalo)';
      case 'Bhed/Bakar':return 'भेड़ / बकरी (Sheep/Goat)';
      default:return cat;
    }
  };

  const getHealthBadge = (health) => {
    switch (health) {
      case 'Healthy':
        return /*#__PURE__*/_jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5", children: [/*#__PURE__*/_jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5" }, void 0, false), " पूर्ण स्वस्थ (Healthy)"] }, void 0, true);
      case 'Vaccinated':
        return /*#__PURE__*/_jsxDEV("span", { className: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5", children: [/*#__PURE__*/_jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false), " टीकाकरण संपन्न (Vaccinated)"] }, void 0, true);
      case 'Needs Treatment':
        return /*#__PURE__*/_jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5", children: [/*#__PURE__*/_jsxDEV(Activity, { className: "w-3.5 h-3.5" }, void 0, false), " उपचार आवश्यक"] }, void 0, true);
      case 'Injured':
        return /*#__PURE__*/_jsxDEV("span", { className: "bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5", children: [/*#__PURE__*/_jsxDEV(AlertTriangle, { className: "w-3.5 h-3.5" }, void 0, false), " घायल (Injured)"] }, void 0, true);
    }
  };

  const photoList = [
  { title: 'सामने (Front)', url: animal.fourPhotos?.front || animal.photos[0] },
  { title: 'साइड (Side)', url: animal.fourPhotos?.side || animal.photos[0] },
  { title: 'पीछे (Back)', url: animal.fourPhotos?.back || animal.photos[0] },
  { title: 'टैग (Tag Close-up)', url: animal.fourPhotos?.earTagCloseUp || animal.photos[0] }];


  return (/*#__PURE__*/
    _jsxDEV("div", { className: "max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
        _jsxDEV("button", {
          onClick: onBack,
          className: "flex items-center gap-2 text-slate-400 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 transition-colors text-xs font-medium", children: [/*#__PURE__*/

          _jsxDEV(ArrowLeft, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "वापस जाएं (Back)" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "flex items-center gap-2", children: [/*#__PURE__*/
          _jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: ["ID: ", animal.id] }, void 0, true), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => alert(`QR Tag Code: ${animal.tagId} shared!`),
            className: "p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700", children: /*#__PURE__*/

            _jsxDEV(Share2, { className: "w-4 h-4" }, void 0, false) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" }, void 0, false), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [/*#__PURE__*/


          _jsxDEV("div", { className: "flex flex-col items-center text-center space-y-4", children: [/*#__PURE__*/


            _jsxDEV("div", { className: "w-full aspect-square rounded-2xl overflow-hidden border-2 border-slate-700 shadow-lg relative group", children: [/*#__PURE__*/
              _jsxDEV("img", {
                src: photoList[activePhotoIdx].url,
                alt: animal.breed,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 font-mono font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/40", children:
                animal.tagId }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-200 text-[11px] font-semibold py-1 px-2 rounded-lg", children:
                photoList[activePhotoIdx].title }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "grid grid-cols-4 gap-2 w-full", children:
              photoList.map((p, idx) => /*#__PURE__*/
              _jsxDEV("button", {

                onClick: () => setActivePhotoIdx(idx),
                className: `aspect-square rounded-xl overflow-hidden border transition-all ${
                activePhotoIdx === idx ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'}`, children: /*#__PURE__*/


                _jsxDEV("img", { src: p.url, alt: p.title, className: "w-full h-full object-cover" }, void 0, false) }, idx, false
              )
              ) }, void 0, false
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "w-full p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col items-center", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "bg-white p-2.5 rounded-xl shadow-md mb-2", children: /*#__PURE__*/
                _jsxDEV(QRCodeSVG, {
                  value: `PASHUDHAN:${animal.tagId}`,
                  size: 120,
                  level: "H" }, void 0, false
                ) }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "text-[11px] font-mono text-emerald-400 font-semibold tracking-widest", children: ["EAR-TAG: ",
                animal.tagId] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "text-[10px] text-slate-400 mt-0.5", children: "ISO 18000-6C 15-Digit RFID Standard" }, void 0, false

              )] }, void 0, true
            )] }, void 0, true

          ), /*#__PURE__*/


          _jsxDEV("div", { className: "md:col-span-2 space-y-6", children: [/*#__PURE__*/


            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("div", { className: "flex items-center gap-3 flex-wrap mb-2", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold", children:
                  getCategoryTitle(animal.category) }, void 0, false
                ),
                getHealthBadge(animal.healthStatus)] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("h2", { className: "text-2xl sm:text-3xl font-black text-white", children: ["नस्ल: ",
                animal.breed] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("p", { className: "text-xs text-slate-400 mt-1 flex items-center gap-1.5", children: [/*#__PURE__*/
                _jsxDEV(Calendar, { className: "w-3.5 h-3.5 text-slate-500" }, void 0, false), "पंजीकरण तिथि: ",
                animal.registeredDate] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/60 border border-slate-800", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase font-semibold block", children: "रंग (Color)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "text-xs font-semibold text-slate-200", children: animal.color }, void 0, false)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/60 border border-slate-800", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase font-semibold block", children: "आयु (Age)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "text-xs font-semibold text-slate-200", children: [animal.ageYears, " वर्ष"] }, void 0, true)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/60 border border-slate-800", children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase font-semibold block", children: "लिंग (Gender)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "text-xs font-semibold text-slate-200", children: animal.gender === 'Female' ? 'मादा (Female)' : 'नर (Male)' }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800/60 pb-2", children: [/*#__PURE__*/
                _jsxDEV("h3", { className: "text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2", children: [/*#__PURE__*/
                  _jsxDEV(User, { className: "w-4 h-4 text-emerald-400" }, void 0, false), "पशु मालिक का विवरण (Owner Information)"] }, void 0, true

                ), /*#__PURE__*/
                _jsxDEV("span", { className: "bg-cyan-500/20 text-cyan-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-cyan-500/30 flex items-center gap-1", children: [/*#__PURE__*/
                  _jsxDEV(CreditCard, { className: "w-3 h-3" }, void 0, false), " Aadhaar OCR Verified"] }, void 0, true
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { className: "space-y-2 text-xs", children: [/*#__PURE__*/
                _jsxDEV("div", { className: "flex justify-between items-center py-1 border-b border-slate-800/60", children: [/*#__PURE__*/
                  _jsxDEV("span", { className: "text-slate-400", children: "मालिक का नाम:" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("span", { className: "font-semibold text-slate-200", children: animal.owner.name }, void 0, false)] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("div", { className: "flex justify-between items-center py-1 border-b border-slate-800/60", children: [/*#__PURE__*/
                  _jsxDEV("span", { className: "text-slate-400", children: "आधार संख्या (Aadhaar):" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("span", { className: "font-mono text-slate-300", children: animal.owner.aadhaarNumber }, void 0, false)] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("div", { className: "flex justify-between items-center py-1 border-b border-slate-800/60", children: [/*#__PURE__*/
                  _jsxDEV("span", { className: "text-slate-400", children: "संपर्क मोबाइल (OTP Validated):" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("a", { href: `tel:${animal.owner.phone}`, className: "font-mono text-cyan-400 hover:underline flex items-center gap-1", children: [/*#__PURE__*/
                    _jsxDEV(Phone, { className: "w-3 h-3" }, void 0, false),
                    animal.owner.phone] }, void 0, true
                  )] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("div", { className: "flex justify-between items-start py-1", children: [/*#__PURE__*/
                  _jsxDEV("span", { className: "text-slate-400 shrink-0", children: "पंजीकृत पता:" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("span", { className: "text-right text-slate-300 leading-snug", children: animal.owner.fullAddress }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "pt-2", children: /*#__PURE__*/
              _jsxDEV("button", {
                onClick: () => onOpenComplaint(animal),
                className: "w-full bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-rose-900/30 transition-all transform active:scale-98 flex items-center justify-center gap-3 text-sm sm:text-base border border-amber-400/30", children: [/*#__PURE__*/

                _jsxDEV(AlertTriangle, { className: "w-5 h-5 animate-pulse" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: "लावारिस / सड़क पर घूम रहे पशु की शिकायत दर्ज करें" }, void 0, false)] }, void 0, true
              ) }, void 0, false
            )] }, void 0, true

          )] }, void 0, true

        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV(GeoFenceMap, {
        geoFence: animal.geoFence,
        currentLocation: animal.location }, void 0, false
      ), /*#__PURE__*/


      _jsxDEV(NoticePenaltyModule, {
        animal: animal }, void 0, false
      )] }, void 0, true

    ));

};