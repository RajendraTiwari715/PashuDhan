import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Camera, Sparkles, X, RefreshCw } from 'lucide-react';

export const AadhaarOCRModal = ({ isOpen, onClose, onOCRComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  if (!isOpen) return null;

  const handleStartOCRScan = () => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const mockResult = {
        aadhaarNumber: 'XXXX-XXXX-9482',
        name: 'विक्रम सिंह पटेल (Sahiwal Owner)',
        dob: '15/08/1986',
        address: 'ग्राम पिपरिया, जिला भोपाल, मध्य प्रदेश - 462001',
        isVerified: true
      };
      setScannedResult(mockResult);
    }, 2000);
  };

  const handleConfirmOwnerData = () => {
    if (scannedResult && onOCRComplete) {
      onOCRComplete(scannedResult);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold">
              UIDAI AI OCR v3.1
            </span>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">
              💳 आधार कार्ड AI ऑटो-रीडर
            </h3>
          </div>
        </div>

        {/* Viewfinder scanner area */}
        <div className="relative w-full h-52 rounded-2xl overflow-hidden border-2 border-blue-500/50 bg-slate-900 flex items-center justify-center shadow-inner">
          <div className="absolute inset-4 border-2 border-dashed border-cyan-400 rounded-xl flex flex-col justify-between p-3 pointer-events-none">
            <div className="flex justify-between text-[10px] font-mono font-bold text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/40">
              <span>[ALIGN AADHAAR CARD HERE]</span>
              <span>OCR ACTIVE</span>
            </div>
            <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-pulse"></div>
          </div>

          <div className="text-center p-4 space-y-2 z-10">
            <Camera className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
            <p className="text-xs text-slate-300 font-medium">
              कैमरे के सामने आधार कार्ड रखें
            </p>
          </div>

          {isScanning && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-2">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
              <p className="text-xs font-bold text-cyan-300 font-mono">
                AI आधार टेक्स्ट पढ़ा जा रहा है...
              </p>
            </div>
          )}
        </div>

        {!scannedResult ? (
          <button
            onClick={handleStartOCRScan}
            disabled={isScanning}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>AI आधार स्कैन एवं रीड शुरू करें</span>
          </button>
        ) : (
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                UIDAI सत्यापित आधार डेटा
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-mono font-bold border border-emerald-200">
                100% Match
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div>
                <span className="text-slate-500 font-semibold">नाम: </span>
                <span className="font-bold text-slate-800">{scannedResult.name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">आधार संख्या: </span>
                <span className="font-mono font-bold text-slate-800">{scannedResult.aadhaarNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">पता: </span>
                <span className="text-slate-700 font-medium">{scannedResult.address}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmOwnerData}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>पशुपालक प्रोफ़ाइल में आधार डेटा सेव करें</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};