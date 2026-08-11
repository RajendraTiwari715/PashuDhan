import React, { useState } from 'react';
import { getAnimalByTagId, issueOffenseNotice } from '../services/storage';
import { Radio, ShieldAlert, CheckCircle2, AlertTriangle, MapPin, Search, RefreshCw } from 'lucide-react';

export const PatrolScannerView = ({ onScanResultProcessed }) => {
  const [tagInput, setTagInput] = useState('TAG-1002');
  const [distanceInput, setDistanceInput] = useState(1.2);
  const [isQuerying, setIsQuerying] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [caseHistory, setCaseHistory] = useState({});

  const handleExecutePatrolScan = (forcedCase = null) => {
    setIsQuerying(true);
    setScanResult(null);

    setTimeout(() => {
      setIsQuerying(false);
      const cleanTag = tagInput.trim().toUpperCase();
      const animal = getAnimalByTagId(cleanTag);
      const todayKey = new Date().toISOString().split('T')[0];
      const tagHistoryKey = `${cleanTag}_${todayKey}`;

      let decisionCase = forcedCase || 'CASE_A_SAFE_ON_PREMISES';
      let systemAction = '';
      const existingCases = caseHistory[tagHistoryKey] || [];

      // Check 1 Case per Cattle per Day limit rule
      if (!forcedCase) {
        if (existingCases.includes('CASE_A_SAFE_ON_PREMISES')) {
          decisionCase = 'CASE_B_AUTO_FLAG_VIOLATOR';
        } else if (existingCases.includes('CASE_B_AUTO_FLAG_VIOLATOR')) {
          decisionCase = 'CASE_C_UNOWNED_STRAY_RESCUE';
        } else {
          decisionCase = 'CASE_A_SAFE_ON_PREMISES';
        }
      }

      if (existingCases.length >= 3) {
        alert(`⚠️ इस पशु (${cleanTag}) पर आज के दिन अधिकतम केस दर्ज हो चुके हैं!`);
        return;
      }

      if (decisionCase === 'CASE_A_SAFE_ON_PREMISES') {
        systemAction = 'Case A दर्ज: स्वामित्‍व ऑन-प्रिमाइसेस (परिसर में सुरक्षित)। कोई दंडात्मक कार्रवाई नहीं।';
      } else if (decisionCase === 'CASE_B_AUTO_FLAG_VIOLATOR') {
        if (animal) {
          const newNotice = issueOffenseNotice(animal.id);
          systemAction = `Case B दर्ज: जिओ-फेंस उल्लंघन! मालिक (${animal.owner.name}) को ${newNotice.noticeType} ऑटो-इश्यू किया गया।`;
        } else {
          systemAction = 'Case B दर्ज: जिओ-फेंस उल्लंघन नोटिस प्रेषित।';
        }
      } else if (decisionCase === 'CASE_C_UNOWNED_STRAY_RESCUE') {
        systemAction = 'Case C दर्ज: अनारक्षित/लावारिस पशु अलर्ट! रेस्क्यू वाहन व गोशाला इनटेक टीम रवाना।';
      }

      // Update case history
      setCaseHistory(prev => ({
        ...prev,
        [tagHistoryKey]: [...(prev[tagHistoryKey] || []), decisionCase]
      }));

      const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

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
          animal?.fourPhotos?.front || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
        ]
      };

      setScanResult(result);
      if (onScanResultProcessed) onScanResultProcessed(result);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Radio className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">गश्त एवं 1-2m लांग-रेंज स्कैनिंग (Patrol Squad)</h3>
            <p className="text-xs text-slate-400 mt-0.5">पेट्रोलिंग टीम हेतु केस लॉजिक (Case A ➔ Case B ➔ Case C) व 1 केस प्रति दिन नियम</p>
          </div>
        </div>
      </div>

      {/* Case Trigger Buttons */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-700 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              स्कैन किए गए पशु का QR / RFID टैग कोड:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="e.g. TAG-1002"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm uppercase placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => handleExecutePatrolScan()}
                disabled={isQuerying}
                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
              >
                {isQuerying ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>ऑटो स्कैन (Auto Scan)</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              स्कैनर दूरी (Meters):
            </label>
            <input
              type="number"
              step="0.1"
              value={distanceInput}
              onChange={(e) => setDistanceInput(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-cyan-300 font-mono text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* 3 Explicit Case Selector Buttons */}
        <div className="pt-3 border-t border-slate-800">
          <span className="block text-xs font-bold text-slate-400 mb-2">
            केस प्रकार चुनें (या ऑटो-सीक्वेंस चलाएं - 1 केस/दिन प्रति पशु नियम के साथ):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleExecutePatrolScan('CASE_A_SAFE_ON_PREMISES')}
              className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Case A (Safe On-Premises)</span>
            </button>

            <button
              onClick={() => handleExecutePatrolScan('CASE_B_AUTO_FLAG_VIOLATOR')}
              className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Case B (Auto-Flag Offense)</span>
            </button>

            <button
              onClick={() => handleExecutePatrolScan('CASE_C_UNOWNED_STRAY_RESCUE')}
              className="p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Case C (Unowned Rescue Alert)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Result Display Card */}
      {scanResult && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-700 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-500/20 px-2.5 py-0.5 rounded-lg border border-cyan-500/30">
                Scan ID: {scanResult.scanId}
              </span>
              <p className="text-xs text-slate-400 mt-1">समय: {scanResult.timestamp}</p>
            </div>

            <div>
              {scanResult.decisionCase === 'CASE_A_SAFE_ON_PREMISES' && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Case A: स्वामित्‍व ऑन-प्रिमाइसेस (Safe)</span>
                </span>
              )}

              {scanResult.decisionCase === 'CASE_B_AUTO_FLAG_VIOLATOR' && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 animate-pulse">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Case B: ऑटो-फ्लैग (Violator Notice)</span>
                </span>
              )}

              {scanResult.decisionCase === 'CASE_C_UNOWNED_STRAY_RESCUE' && (
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 animate-bounce">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Case C: लावारिस (Rescue Dispatched)</span>
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-700 relative">
              <img
                src={scanResult.evidencePhotos[0]}
                alt="Evidence"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono">
                Scan Distance: {scanResult.scanDistanceMeters}m
              </div>
            </div>

            <div className="md:col-span-2 space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 font-semibold text-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase">सिस्टम स्वचालित निर्णय एवं कार्रवाई:</span>
                <span className="text-emerald-400 leading-relaxed block mt-1">{scanResult.systemAction}</span>
              </div>

              {scanResult.animal && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-300">
                  <div>
                    <span className="text-slate-400 block">पशु मालिक:</span>
                    <span className="font-bold text-white">{scanResult.animal.owner.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">संपर्क मोबाइल:</span>
                    <span className="font-mono text-cyan-400">{scanResult.animal.owner.phone}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>साक्ष्य GPS स्थान: {scanResult.currentGPS.addressName}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};