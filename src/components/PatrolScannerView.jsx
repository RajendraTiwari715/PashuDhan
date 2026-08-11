import React, { useState } from 'react';
import { getAnimalByTagId, issueOffenseNotice } from '../services/storage';

import { Radio, ShieldAlert, CheckCircle2, AlertTriangle, MapPin, Search, RefreshCw } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






export const PatrolScannerView = ({ onScanResultProcessed }) => {
  const [tagInput, setTagInput] = useState('TAG-1002');
  const [distanceInput, setDistanceInput] = useState(1.2);
  const [isQuerying, setIsQuerying] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleExecutePatrolScan = () => {
    setIsQuerying(true);
    setScanResult(null);

    setTimeout(() => {
      setIsQuerying(false);
      const cleanTag = tagInput.trim().toUpperCase();
      const animal = getAnimalByTagId(cleanTag);
      const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

      let decisionCase = 'CASE_A_SAFE_ON_PREMISES';
      let systemAction = 'स्वामित्‍व ऑन-प्रिमाइसेस। कोई कार्रवाई आवश्यक नहीं।';

      if (!animal) {
        // Case C: Unowned stray cattle
        decisionCase = 'CASE_C_UNOWNED_STRAY_RESCUE';
        systemAction = 'असुरक्षित / अनारक्षित आवारा पशु पहचाना गया! गोशाला एवं रेस्क्यू टीम को अलर्ट भेजा गया।';
      } else if (animal.geoFence.isOutsideFence || animal.geoFence.lastCheckedDistanceMeters > animal.geoFence.radiusMeters) {
        // Case B: Auto Flag Violator
        decisionCase = 'CASE_B_AUTO_FLAG_VIOLATOR';
        const newNotice = issueOffenseNotice(animal.id);
        systemAction = `ऑटो-फ्लैग जारी! पशुपालक (${animal.owner.name}) हेतु ${newNotice.noticeType} प्रेषित किया गया।`;
      }

      const result = {
        scanId: `PSCAN-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: nowStr,
        tagId: cleanTag,
        animal,
        scanDistanceMeters: distanceInput,
        currentGPS: {
          lat: 23.2599,
          lng: 77.4126,
          addressName: 'राष्ट्रीय राजमार्ग 44, भोपाल (NH-44 Patrol Spot)',
          city: 'भोपाल',
          state: 'मध्य प्रदेश',
          pincode: '462011'
        },
        decisionCase,
        systemAction,
        evidencePhotos: [
        animal?.fourPhotos.front || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80']

      };

      setScanResult(result);
      if (onScanResultProcessed) onScanResultProcessed(result);
    }, 1200);
  };

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "max-w-4xl mx-auto px-4 py-6 space-y-6", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-cyan-500/30", children: /*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center", children: /*#__PURE__*/
            _jsxDEV(Radio, { className: "w-6 h-6 text-cyan-400 animate-pulse" }, void 0, false) }, void 0, false
          ), /*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("h3", { className: "text-xl font-bold text-white", children: "गश्त एवं 1-2m लांग-रेंज स्कैनिंग (Patrol Squad)" }, void 0, false), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "पेट्रोलिंग टीम हेतु सर्वर लाइव क्वेरी एवं ऑटो-डिसिजन लॉजिक इंजन" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-slate-700 space-y-4", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "sm:col-span-2", children: [/*#__PURE__*/
            _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "स्कैन किए गए पशु का QR / RFID टैग कोड:" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("div", { className: "flex gap-2", children: [/*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: tagInput,
                onChange: (e) => setTagInput(e.target.value),
                placeholder: "e.g. TAG-1002",
                className: "flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm uppercase placeholder-slate-600 focus:outline-none focus:border-cyan-500" }, void 0, false
              ), /*#__PURE__*/
              _jsxDEV("button", {
                type: "button",
                onClick: handleExecutePatrolScan,
                disabled: isQuerying,
                className: "bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors", children: [

                isQuerying ? /*#__PURE__*/_jsxDEV(RefreshCw, { className: "w-4 h-4 animate-spin" }, void 0, false) : /*#__PURE__*/_jsxDEV(Search, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { children: isQuerying ? 'क्वेरी जारी...' : 'स्कैन एवं जांचें' }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "स्कैनर दूरी (1-2m Long-Range):" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("select", {
              value: distanceInput,
              onChange: (e) => setDistanceInput(Number(e.target.value)),
              className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs", children: [/*#__PURE__*/

              _jsxDEV("option", { value: 1.2, children: "1.2 मीटर (Standard RFID)" }, void 0, false), /*#__PURE__*/
              _jsxDEV("option", { value: 1.8, children: "1.8 मीटर (Long-Range Tag)" }, void 0, false), /*#__PURE__*/
              _jsxDEV("option", { value: 2.5, children: "2.5 मीटर (High Power Scan)" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "pt-2 border-t border-slate-800 flex items-center gap-2 flex-wrap text-xs text-slate-400", children: [/*#__PURE__*/
          _jsxDEV("span", { children: "परीक्षण केस चुनें:" }, void 0, false), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => {setTagInput('TAG-1001');handleExecutePatrolScan();},
            className: "px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold", children:
            "Case A (Safe On-Premises)" }, void 0, false

          ), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => {setTagInput('TAG-1002');handleExecutePatrolScan();},
            className: "px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold", children:
            "Case B (Auto-Flag Offense)" }, void 0, false

          ), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => {setTagInput('TAG-9999');handleExecutePatrolScan();},
            className: "px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-semibold", children:
            "Case C (Unowned Rescue Alert)" }, void 0, false

          )] }, void 0, true
        )] }, void 0, true
      ),


      scanResult && /*#__PURE__*/
      _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-slate-700 space-y-6 animate-fadeIn", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("span", { className: "font-mono text-xs text-cyan-400 font-bold bg-cyan-500/20 px-2.5 py-0.5 rounded-lg border border-cyan-500/30", children: ["Scan ID: ",
              scanResult.scanId] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: ["समय: ", scanResult.timestamp] }, void 0, true)] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { children: [
            scanResult.decisionCase === 'CASE_A_SAFE_ON_PREMISES' && /*#__PURE__*/
            _jsxDEV("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5", children: [/*#__PURE__*/
              _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "Case A: स्वामित्‍व ऑन-प्रिमाइसेस (No Action)" }, void 0, false)] }, void 0, true
            ),

            scanResult.decisionCase === 'CASE_B_AUTO_FLAG_VIOLATOR' && /*#__PURE__*/
            _jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 animate-pulse", children: [/*#__PURE__*/
              _jsxDEV(AlertTriangle, { className: "w-4 h-4 text-amber-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "Case B: ऑटो-फ्लैग (Notice Issued)" }, void 0, false)] }, void 0, true
            ),

            scanResult.decisionCase === 'CASE_C_UNOWNED_STRAY_RESCUE' && /*#__PURE__*/
            _jsxDEV("span", { className: "bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 animate-bounce", children: [/*#__PURE__*/
              _jsxDEV(ShieldAlert, { className: "w-4 h-4 text-rose-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "Case C: अनपेक्षित / आवारा (Rescue Team Dispatched)" }, void 0, false)] }, void 0, true
            )] }, void 0, true

          )] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "w-full h-44 rounded-2xl overflow-hidden border border-slate-700 relative", children: [/*#__PURE__*/
            _jsxDEV("img", { src: scanResult.evidencePhotos[0], alt: "Evidence", className: "w-full h-full object-cover" }, void 0, false), /*#__PURE__*/
            _jsxDEV("div", { className: "absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono", children: ["1-2m Scan Distance: ",
              scanResult.scanDistanceMeters, "m"] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("div", { className: "md:col-span-2 space-y-3 text-xs", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/90 border border-slate-800 font-semibold text-slate-200", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "text-slate-400 block text-[10px] uppercase", children: "सिस्टम स्वचालित निर्णय एवं कार्रवाई:" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "text-emerald-400 leading-relaxed block mt-1", children: scanResult.systemAction }, void 0, false)] }, void 0, true
            ),

            scanResult.animal && /*#__PURE__*/
            _jsxDEV("div", { className: "grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-300", children: [/*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-400 block", children: "पशु मालिक:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-bold text-white", children: scanResult.animal.owner.name }, void 0, false)] }, void 0, true
              ), /*#__PURE__*/
              _jsxDEV("div", { children: [/*#__PURE__*/
                _jsxDEV("span", { className: "text-slate-400 block", children: "संपर्क मोबाइल:" }, void 0, false), /*#__PURE__*/
                _jsxDEV("span", { className: "font-mono text-cyan-400", children: scanResult.animal.owner.phone }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/


            _jsxDEV("div", { className: "flex items-center gap-2 text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800", children: [/*#__PURE__*/
              _jsxDEV(MapPin, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: ["साक्ष्य GPS स्थान: ", scanResult.currentGPS.addressName] }, void 0, true)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true

      )] }, void 0, true


    ));

};