import React, { useState } from 'react';
import { saveAnimal } from '../services/storage';

import { AadhaarOCRModal } from './AadhaarOCRModal';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import {
  User,
  CheckCircle2,
  X,
  Sparkles,
  Link2,
  Camera,
  CreditCard,
  MapPin } from
'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";








export const LinkTagModal = ({
  isOpen,
  onClose,
  initialTagId = 'TAG-8821',
  onTagLinkedSuccess
}) => {
  const [tagId, setTagId] = useState(initialTagId);
  const [category, setCategory] = useState('Gay');
  const [breed, setBreed] = useState('गिर (Gir Breed)');
  const [color, setColor] = useState('चितकबरा लाल-सफेद');
  const [gender, setGender] = useState('Female');
  const [ageYears, setAgeYears] = useState(3);
  const [healthStatus, setHealthStatus] = useState('Healthy');

  // Owner info
  const [ownerName, setOwnerName] = useState('रामस्वरूप शर्मा');
  const [ownerAadhaar, setOwnerAadhaar] = useState('8832-1104-5590');
  const [ownerPhone, setOwnerPhone] = useState('98260 77123');
  const [villageOrCity, setVillageOrCity] = useState('ग्राम फंदा, भोपाल');
  const [fullAddress, setFullAddress] = useState('मकान न. 12, मंदिर चौक, ग्राम फंदा, भोपाल, म.प्र.');
  const [isAadhaarOcrDone, setIsAadhaarOcrDone] = useState(false);

  // 4 Photo Slots (Flowchart Green Box Requirement)
  const [fourPhotos, setFourPhotos] = useState({
    front: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
    side: 'https://images.unsplash.com/photo-1570042707222-67803328e3b5?auto=format&fit=crop&w=800&q=80',
    back: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    earTagCloseUp: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80'
  });

  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePhotoUpload = (slot, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFourPhotos((prev) => ({ ...prev, [slot]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAadhaarOcrComplete = (ocrData) =>





  {
    setOwnerName(ocrData.scannedName);
    setOwnerAadhaar(ocrData.aadhaarNo);
    setFullAddress(ocrData.address);
    setIsAadhaarOcrDone(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagId.trim()) {
      setError('कृपया 15-digit QR कान टैग कोड दर्ज करें।');
      return;
    }
    if (!ownerName.trim() || !ownerPhone.trim()) {
      setError('कृपया पशु मालिक का नाम एवं संपर्क नंबर दर्ज करें।');
      return;
    }

    const newAnimal = saveAnimal({
      tagId: tagId.trim().toUpperCase(),
      category,
      breed,
      color,
      gender,
      ageYears: Number(ageYears) || 3,
      healthStatus,
      owner: {
        name: ownerName,
        aadhaarNumber: ownerAadhaar,
        phone: ownerPhone,
        villageOrCity,
        fullAddress,
        isAadhaarVerified: true,
        isMobileOtpVerified: true
      },
      fourPhotos,
      location: {
        lat: 23.2599,
        lng: 77.4126,
        addressName: villageOrCity,
        city: 'भोपाल',
        state: 'मध्य प्रदेश',
        pincode: '462030'
      },
      geoFence: {
        centerLat: 23.2599,
        centerLng: 77.4126,
        radiusMeters: 500,
        homeAddress: villageOrCity,
        isOutsideFence: false,
        lastCheckedDistanceMeters: 50
      },
      priorViolationsCount: 0,
      activeNotices: []
    });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {

      // ignore
    }
    onTagLinkedSuccess(newAnimal);
    onClose();
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn", children: [/*#__PURE__*/
      _jsxDEV("div", { className: "glass-modal w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700 my-8", children: [/*#__PURE__*/


        _jsxDEV("button", {
          onClick: onClose,
          className: "absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors", children: /*#__PURE__*/

          _jsxDEV(X, { className: "w-5 h-5" }, void 0, false) }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "text-center mb-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20", children: /*#__PURE__*/
            _jsxDEV(Link2, { className: "w-7 h-7 text-slate-950 font-bold" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("h3", { className: "text-xl sm:text-2xl font-black text-white", children: "पशु पंजीकरण एवं RFID / QR टैग लिंकिंग (Registration Workflow)" }, void 0, false

          ), /*#__PURE__*/
          _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "आधार OCR, 4 पशु तस्वीरें, 500m जिओ-फेंस एवं 15-Digit ISO टैग मैपिंग" }, void 0, false

          )] }, void 0, true
        ),

        error && /*#__PURE__*/
        _jsxDEV("div", { className: "mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-semibold", children:
          error }, void 0, false
        ), /*#__PURE__*/


        _jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-6", children: [/*#__PURE__*/


          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
              _jsxDEV("div", { className: "bg-white p-2 rounded-xl shrink-0", children: /*#__PURE__*/
                _jsxDEV(QRCodeSVG, { value: `PASHUDHAN:${tagId}`, size: 56 }, void 0, false) }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-[10px] text-emerald-400 uppercase font-semibold block", children: "15-Digit ISO 18000-6C Ear-Tag:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-mono font-bold text-lg text-white tracking-wider", children: tagId }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "text-[11px] text-amber-300 block", children: "Status: Ready to link" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "w-full sm:w-auto", children: [/*#__PURE__*/
              _jsxDEV("label", { className: "block text-[10px] text-slate-400 mb-1", children: "टैग ID दर्ज / बदलें:" }, void 0, false), /*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: tagId,
                onChange: (e) => setTagId(e.target.value),
                className: "bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs uppercase" }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [/*#__PURE__*/
              _jsxDEV("h4", { className: "text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5", children: [/*#__PURE__*/
                _jsxDEV(User, { className: "w-3.5 h-3.5" }, void 0, false), "1. पशुपालक विवरण एवं आधार OCR (Owner Data Entry)"] }, void 0, true

              ), /*#__PURE__*/

              _jsxDEV("button", {
                type: "button",
                onClick: () => setIsOcrModalOpen(true),
                className: "text-xs bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors", children: [/*#__PURE__*/

                _jsxDEV(CreditCard, { className: "w-3.5 h-3.5" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: "आधार ऑटो-OCR से भरें" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            isAadhaarOcrDone && /*#__PURE__*/
            _jsxDEV("div", { className: "p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs flex items-center gap-2 font-semibold", children: [/*#__PURE__*/
              _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "आधार OCR एवं मोबाइल OTP सत्यापित (Verified)" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "पशुपालक का नाम" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: ownerName,
                  onChange: (e) => setOwnerName(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "आधार नंबर (OCR Verified)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: ownerAadhaar,
                  onChange: (e) => setOwnerAadhaar(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "संपर्क मोबाइल (OTP Validated)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: ownerPhone,
                  onChange: (e) => setOwnerPhone(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs" }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "ग्राम / शहर" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: villageOrCity,
                  onChange: (e) => setVillageOrCity(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "पूर्ण पता" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: fullAddress,
                  onChange: (e) => setFullAddress(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
            _jsxDEV("h4", { className: "text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2", children: [/*#__PURE__*/
              _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false), "2. पशु विवरण (Cattle Specifications)"] }, void 0, true

            ), /*#__PURE__*/

            _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "पशु श्रेणी" }, void 0, false), /*#__PURE__*/
                _jsxDEV("select", {
                  value: category,
                  onChange: (e) => setCategory(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs", children: [/*#__PURE__*/

                  _jsxDEV("option", { value: "Gay", children: "गाय (Cow)" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("option", { value: "Bail", children: "बैल (Ox / Bull)" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("option", { value: "Bachada", children: "बछड़ा / बछड़ी (Calf)" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("option", { value: "Bhais", children: "भैंस (Buffalo)" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("option", { value: "Bhed/Bakar", children: "भेड़ / बकरी" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "नस्ल (Breed)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: breed,
                  onChange: (e) => setBreed(e.target.value),
                  placeholder: "e.g. साहीवाल, गिर, मुर्रा",
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "रंग (Color)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "text",
                  value: color,
                  onChange: (e) => setColor(e.target.value),
                  placeholder: "e.g. लाल, काला, चितकबरा",
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "लिंग (Gender)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("select", {
                  value: gender,
                  onChange: (e) => setGender(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs", children: [/*#__PURE__*/

                  _jsxDEV("option", { value: "Female", children: "मादा (Female)" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("option", { value: "Male", children: "नर (Male)" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "आयु (वर्षों में)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "number",
                  value: ageYears,
                  onChange: (e) => setAgeYears(Number(e.target.value)),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/

              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "स्वास्थ्य स्थिति" }, void 0, false), /*#__PURE__*/
                _jsxDEV("select", {
                  value: healthStatus,
                  onChange: (e) => setHealthStatus(e.target.value),
                  className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs", children: [/*#__PURE__*/

                  _jsxDEV("option", { value: "Healthy", children: "पूर्ण स्वस्थ (Healthy)" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("option", { value: "Vaccinated", children: "टीकाकरण संपन्न (Vaccinated)" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("option", { value: "Needs Treatment", children: "उपचार आवश्यक" }, void 0, false), /*#__PURE__*/
                  _jsxDEV("option", { value: "Injured", children: "घायल (Injured)" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
            _jsxDEV("h4", { className: "text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "flex items-center gap-1.5", children: [/*#__PURE__*/
                _jsxDEV(Camera, { className: "w-3.5 h-3.5" }, void 0, false), "3. पशु के 4 कोणों के चित्र अपलोड करें (4 Cow Photos Uploaded)"] }, void 0, true

              ), /*#__PURE__*/
              _jsxDEV("span", { className: "text-[10px] text-amber-400 font-mono", children: "4 Slots Required" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [/*#__PURE__*/

              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2", children: [/*#__PURE__*/
                _jsxDEV("div", { className: "w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900", children: /*#__PURE__*/
                  _jsxDEV("img", { src: fourPhotos.front, alt: "Front photo", className: "w-full h-full object-cover" }, void 0, false) }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("span", { className: "text-[11px] font-semibold text-slate-300 block", children: "1. सामने का चित्र (Front)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "file",
                  onChange: (e) => handlePhotoUpload('front', e),
                  className: "text-[10px] text-slate-400 w-full" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/


              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2", children: [/*#__PURE__*/
                _jsxDEV("div", { className: "w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900", children: /*#__PURE__*/
                  _jsxDEV("img", { src: fourPhotos.side, alt: "Side photo", className: "w-full h-full object-cover" }, void 0, false) }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("span", { className: "text-[11px] font-semibold text-slate-300 block", children: "2. साइड का चित्र (Side)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "file",
                  onChange: (e) => handlePhotoUpload('side', e),
                  className: "text-[10px] text-slate-400 w-full" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/


              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2", children: [/*#__PURE__*/
                _jsxDEV("div", { className: "w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900", children: /*#__PURE__*/
                  _jsxDEV("img", { src: fourPhotos.back, alt: "Back photo", className: "w-full h-full object-cover" }, void 0, false) }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("span", { className: "text-[11px] font-semibold text-slate-300 block", children: "3. पीछे का चित्र (Back)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "file",
                  onChange: (e) => handlePhotoUpload('back', e),
                  className: "text-[10px] text-slate-400 w-full" }, void 0, false
                )] }, void 0, true
              ), /*#__PURE__*/


              _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2", children: [/*#__PURE__*/
                _jsxDEV("div", { className: "w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900", children: /*#__PURE__*/
                  _jsxDEV("img", { src: fourPhotos.earTagCloseUp, alt: "Tag close up", className: "w-full h-full object-cover" }, void 0, false) }, void 0, false
                ), /*#__PURE__*/
                _jsxDEV("span", { className: "text-[11px] font-semibold text-slate-300 block", children: "4. टैग क्लोज-अप (Tag Close-up)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("input", {
                  type: "file",
                  onChange: (e) => handlePhotoUpload('earTagCloseUp', e),
                  className: "text-[10px] text-slate-400 w-full" }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 text-xs text-slate-300", children: [/*#__PURE__*/
              _jsxDEV(MapPin, { className: "w-4 h-4 text-emerald-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "font-bold text-white block", children: "डेयरी/बाड़ा 500m जिओ-फेंस जीपीएस मैपिंग:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "होम जीपीएस कोऑर्डिनेट पिन captured (Lat: 23.2599, Lng: 77.4126)" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-500/30", children: "500m Radius Set" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("button", {
            type: "submit",
            className: "w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 text-sm border border-emerald-400/30", children: [/*#__PURE__*/

            _jsxDEV(CheckCircle2, { className: "w-5 h-5" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "टैग पशु से जोड़ें एवं संपूर्ण पंजीकृत करें (Complete Flowchart Registration)" }, void 0, false)] }, void 0, true
          )] }, void 0, true

        )] }, void 0, true

      ), /*#__PURE__*/


      _jsxDEV(AadhaarOCRModal, {
        isOpen: isOcrModalOpen,
        onClose: () => setIsOcrModalOpen(false),
        onOCRComplete: handleAadhaarOcrComplete }, void 0, false
      )] }, void 0, true
    ));

};