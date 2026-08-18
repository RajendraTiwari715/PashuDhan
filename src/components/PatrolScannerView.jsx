import React, { useState } from 'react';
import { getAnimalByTagId, issueOffenseNotice, createComplaint } from '../services/storage';
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

        // Auto-create complaint tied to owner
        createComplaint({
          animalTagId: cleanTag,
          animalCategory: animal?.category || 'Gay',
          animalBreed: animal?.breed || 'गोवंश',
          complainantPhone: '9826022222',
          complainantName: 'पेट्रोलिंग स्क्वाड (Patrol Squad NH-44)',
          description: `हाईवे गश्त के दौरान पशु परिधि से ${distanceInput} KM बाहर पाया गया। स्वतः ई-नोटिस एवं शिकायत दर्ज।`,
          cityName: 'राष्ट्रीय राजमार्ग 44, भोपाल (NH-44 Patrol Spot)',
          status: 'In Progress (Patrol Notice Issued)'
        });
      } else if (decisionCase === 'CASE_C_UNOWNED_STRAY_RESCUE') {
        systemAction = 'Case C दर्ज: अनारक्षित/लावारिस पशु अलर्ट! रेस्क्यू वाहन व गोशाला इनटेक टीम रवाना।';

        // Auto-create rescue complaint
        createComplaint({
          animalTagId: cleanTag,
          animalCategory: animal?.category || 'Gay',
          animalBreed: animal?.breed || 'लावारिस गोवंश',
          complainantPhone: '9826022222',
          complainantName: 'पेट्रोलिंग स्क्वाड (Patrol Squad NH-44)',
          description: 'सड़क पर लावारिस / घायल अवस्था में पशु मिला। गोशाला रेस्क्यू टीम आवंटित।',
          cityName: 'सीहोर तिराहा, NH-44 भोपाल',
          status: 'Dispatched to Pasu Vibhag'
        });
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
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      
      {/* Case Trigger Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">गश्त एवं 1-2m लांग-रेंज स्कैनिंग (Patrol Scanner)</h3>
            <p className="text-xs text-slate-500 mt-0.5">केस लॉजिक (Case A ➔ Case B ➔ Case C) व 1 केस प्रति दिन नियम</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              स्कैन किए गए पशु का QR / RFID टैग कोड:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="e.g. TAG-1002"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-mono text-xs uppercase placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => handleExecutePatrolScan()}
                disabled={isQuerying}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm shrink-0"
              >
                {isQuerying ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>ऑटो स्कैन (Auto Scan)</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              स्कैनर दूरी (Meters):
            </label>
            <input
              type="number"
              step="0.1"
              value={distanceInput}
              onChange={(e) => setDistanceInput(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-mono text-xs focus:outline-none focus:border-cyan-500 font-bold"
            />
          </div>
        </div>

        {/* 3 Explicit Case Selector Buttons */}
        <div className="pt-3 border-t border-slate-100">
          <span className="block text-xs font-semibold text-slate-600 mb-2">
            केस प्रकार चुनें (या ऑटो-सीक्वेंस चलाएं - 1 केस/दिन प्रति पशु नियम के साथ):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleExecutePatrolScan('CASE_A_SAFE_ON_PREMISES')}
              className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Case A (Safe On-Premises)</span>
            </button>

            <button
              onClick={() => handleExecutePatrolScan('CASE_B_AUTO_FLAG_VIOLATOR')}
              className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Case B (Auto-Flag Offense)</span>
            </button>

            <button
              onClick={() => handleExecutePatrolScan('CASE_C_UNOWNED_STRAY_RESCUE')}
              className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Case C (Unowned Rescue Alert)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Result Display Card */}
      {scanResult && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="font-mono text-xs text-cyan-700 font-bold bg-cyan-50 px-2.5 py-0.5 rounded-lg border border-cyan-200">
                Scan ID: {scanResult.scanId}
              </span>
              <p className="text-xs text-slate-500 mt-1">समय: {scanResult.timestamp}</p>
            </div>

            <div>
              {scanResult.decisionCase === 'CASE_A_SAFE_ON_PREMISES' && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Case A: स्वामित्‍व ऑन-प्रिमाइसेस (Safe)</span>
                </span>
              )}

              {scanResult.decisionCase === 'CASE_B_AUTO_FLAG_VIOLATOR' && (
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Case B: ऑटो-फ्लैग (Violator Notice)</span>
                </span>
              )}

              {scanResult.decisionCase === 'CASE_C_UNOWNED_STRAY_RESCUE' && (
                <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Case C: लावारिस (Rescue Dispatched)</span>
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-200 relative">
              <img
                src={scanResult.evidencePhotos[0]}
                alt="Evidence"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono">
                Scan Distance: {scanResult.scanDistanceMeters}m
              </div>
            </div>

            <div className="md:col-span-2 space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 font-semibold">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">सिस्टम स्वचालित निर्णय एवं कार्रवाई:</span>
                <span className="text-emerald-700 leading-relaxed block mt-1">{scanResult.systemAction}</span>
              </div>

              {scanResult.animal && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700">
                  <div>
                    <span className="text-slate-500 block text-[10px]">पशु मालिक:</span>
                    <span className="font-bold text-slate-800">{scanResult.animal.owner.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">संपर्क मोबाइल:</span>
                    <span className="font-mono text-cyan-700 font-bold">{scanResult.animal.owner.phone}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>साक्ष्य GPS स्थान: {scanResult.currentGPS.addressName}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};