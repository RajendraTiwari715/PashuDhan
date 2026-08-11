import React, { useState } from 'react';

import { createComplaint } from '../services/storage';
import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  Camera,
  MapPin,
  Building2,
  ShieldCheck,
  X,
  Navigation,
  Send } from
'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";









export const ComplaintFormModal = ({
  isOpen,
  onClose,
  targetAnimal,
  userPhone = '98765 43210',
  onComplaintSubmitted
}) => {
  const [tagId, setTagId] = useState(targetAnimal?.tagId || '');
  const [category, setCategory] = useState(targetAnimal?.category || 'Gay');
  const [phone, setPhone] = useState(userPhone);
  const [complainantName, setComplainantName] = useState('नागरिक (Citizen)');
  const [description, setDescription] = useState('मुख्य मार्ग पर लावारिस पशु घूम रहा है, जिससे यातायात बाधित हो रहा है।');
  const [photoUrl, setPhotoUrl] = useState(
    targetAnimal?.photos[0] || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
  );
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [cityName, setCityName] = useState('भोपाल, मुख्य मार्ग (NH-44 Highway)');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFetchGPS = () => {
    setIsFetchingLocation(true);
    setTimeout(() => {
      setIsFetchingLocation(false);
      setCityName('भोपाल (Bhopal) - जीपीएस निर्देशांक: 23.2599° N, 77.4126° E');
    }, 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('कृपया शिकायत का संक्षिप्त विवरण दर्ज करें।');
      return;
    }

    const complaint = createComplaint({
      animalTagId: tagId || targetAnimal?.tagId || 'UNTAGGED-STRAY',
      animalCategory: category,
      complainantPhone: phone,
      complainantName,
      photoProofUrl: photoUrl,
      description,
      cityName
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {

      // ignore
    }
    onComplaintSubmitted(complaint);
    onClose();
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn", children: /*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700 my-8", children: [/*#__PURE__*/


        _jsxDEV("button", {
          onClick: onClose,
          className: "absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors", children: /*#__PURE__*/

          _jsxDEV(X, { className: "w-5 h-5" }, void 0, false) }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "text-center mb-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20", children: /*#__PURE__*/
            _jsxDEV(AlertTriangle, { className: "w-7 h-7 text-white animate-bounce" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("h3", { className: "text-xl sm:text-2xl font-black text-white", children: "लावारिस / सड़क पर पशु शिकायत दर्ज करें" }, void 0, false), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "जीपीएस लोकेशन की मदद से निकटतम पशु विभाग एवं पुलिस थाने को स्वतः अलर्ट भेजा जाएगा" }, void 0, false

          )] }, void 0, true
        ),

        error && /*#__PURE__*/
        _jsxDEV("div", { className: "mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-semibold", children:
          error }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-5", children: [/*#__PURE__*/


          _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [/*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "पशु QR टैग कोड (Animal Tag ID)" }, void 0, false

              ), /*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: tagId,
                onChange: (e) => setTagId(e.target.value),
                placeholder: "TAG-1001 या बिना टैग का पशु",
                className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm uppercase placeholder-slate-600 focus:outline-none focus:border-amber-500" }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "पशु प्रकार (Species)" }, void 0, false

              ), /*#__PURE__*/
              _jsxDEV("select", {
                value: category,
                onChange: (e) => setCategory(e.target.value),
                className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500", children: [/*#__PURE__*/

                _jsxDEV("option", { value: "Gay", children: "गाय (Cow)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("option", { value: "Bail", children: "बैल (Ox / Bull)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("option", { value: "Bachada", children: "बछड़ा / बछड़ी (Calf)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("option", { value: "Bhais", children: "भैंस (Buffalo)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("option", { value: "Other", children: "अन्य आवारा पशु (Other)" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between", children: [/*#__PURE__*/
              _jsxDEV("span", { children: "पशु की फोटो प्रमाण संलग्न करें (Photo Proof)" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-amber-400 font-normal", children: "* अनिवार्य" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "w-24 h-24 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-900 flex items-center justify-center relative", children:
                photoUrl ? /*#__PURE__*/
                _jsxDEV("img", { src: photoUrl, alt: "Photo proof", className: "w-full h-full object-cover" }, void 0, false) : /*#__PURE__*/

                _jsxDEV(Camera, { className: "w-8 h-8 text-slate-600" }, void 0, false) }, void 0, false

              ), /*#__PURE__*/

              _jsxDEV("div", { className: "space-y-2 text-center sm:text-left flex-1", children: [/*#__PURE__*/
                _jsxDEV("input", {
                  type: "file",
                  accept: "image/*",
                  onChange: handleFileChange,
                  className: "hidden",
                  id: "photo-proof-file" }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("label", {
                  htmlFor: "photo-proof-file",
                  className: "inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3 py-2 rounded-xl border border-slate-700 text-xs cursor-pointer transition-colors", children: [/*#__PURE__*/

                  _jsxDEV(Camera, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("span", { children: "कैमरा / गैलरी से फोटो चुनें" }, void 0, false)] }, void 0, true
                ), /*#__PURE__*/
                _jsxDEV("p", { className: "text-[10px] text-slate-400", children: "सड़क पर घूम रहे या घायल पशु का स्पष्ट चित्र अपलोड करें" }, void 0, false

                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center justify-between", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "flex items-center gap-2 text-xs font-bold text-slate-200", children: [/*#__PURE__*/
                _jsxDEV(MapPin, { className: "w-4 h-4 text-emerald-400" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: "गूगल मैप्स जीपीएस लोकेशन (Google GPS Auto-Fetch)" }, void 0, false)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("button", {
                type: "button",
                onClick: handleFetchGPS,
                disabled: isFetchingLocation,
                className: "text-[11px] bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors", children: [/*#__PURE__*/

                _jsxDEV(Navigation, { className: `w-3 h-3 text-emerald-400 ${isFetchingLocation ? 'animate-spin' : ''}` }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: isFetchingLocation ? 'फैच हो रहा है...' : 'लोकेशन पुनः फैच करें' }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono", children:
              cityName }, void 0, false
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2", children: [/*#__PURE__*/
                _jsxDEV(Building2, { className: "w-4 h-4 text-cyan-400 shrink-0" }, void 0, false), /*#__PURE__*/
                _jsxDEV("div", { children: [/*#__PURE__*/
                  _jsxDEV("div", { className: "font-semibold text-cyan-300", children: "पशु विभाग (Auto-Matched):" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("div", { className: "text-slate-400 truncate", children: "जिला पशु चिकित्सालय भोपाल" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { className: "p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2", children: [/*#__PURE__*/
                _jsxDEV(ShieldCheck, { className: "w-4 h-4 text-amber-400 shrink-0" }, void 0, false), /*#__PURE__*/
                _jsxDEV("div", { children: [/*#__PURE__*/
                  _jsxDEV("div", { className: "font-semibold text-amber-300", children: "पुलिस थाना (Cattle Patrol):" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("div", { className: "text-slate-400 truncate", children: "एम.पी. नगर थाना भोपाल" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "शिकायत का विवरण (Description / Location Landmark)" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("textarea", {
              rows: 3,
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "पशु की स्थिति एवं लैंडमार्क दर्ज करें...",
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-amber-500" }, void 0, false
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [/*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "आपका नाम (Complainant Name)" }, void 0, false

              ), /*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: complainantName,
                onChange: (e) => setComplainantName(e.target.value),
                className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500" }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "संपर्क मोबाइल नंबर (Contact Phone)" }, void 0, false

              ), /*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-500" }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("button", {
            type: "submit",
            className: "w-full bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-rose-950/40 transition-all flex items-center justify-center gap-2 text-sm border border-amber-400/30", children: [/*#__PURE__*/

            _jsxDEV(Send, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "शिकायत दर्ज करें एवं पशु विभाग को भेजें" }, void 0, false)] }, void 0, true
          )] }, void 0, true

        )] }, void 0, true

      ) }, void 0, false
    ));

};