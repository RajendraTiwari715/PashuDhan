import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Camera, Sparkles, X, RefreshCw } from 'lucide-react';

interface AadhaarOCRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOCRComplete: (ocrData: {
    scannedName: string;
    aadhaarNo: string;
    dob: string;
    gender: string;
    address: string;
  }) => void;
}

export const AadhaarOCRModal: React.FC<AadhaarOCRModalProps> = ({
  isOpen,
  onClose,
  onOCRComplete
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<{
    scannedName: string;
    aadhaarNo: string;
    dob: string;
    gender: string;
    address: string;
  } | null>(null);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <CreditCard className="w-7 h-7 text-slate-950" />
          </div>
          <h3 className="text-xl font-bold text-white">आधार OCR स्कैनर (Aadhaar Auto-OCR)</h3>
          <p className="text-xs text-slate-400 mt-1">
            पशुपालक के आधार कार्ड से डेटा स्वतः स्कैन एवं सत्यापित करें
          </p>
        </div>

        {/* Scanner Viewfinder Simulation */}
        {!scannedResult && (
          <div className="relative aspect-[1.6/1] max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-dashed border-cyan-500/60 bg-slate-950 flex flex-col items-center justify-center mb-6 p-4 text-center">
            {isScanning ? (
              <div className="space-y-3">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                <span className="text-xs font-mono text-cyan-300 block animate-pulse">
                  AI OCR स्कैनर आधार टेक्स्ट एक्सट्रैक्ट कर रहा है...
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <Camera className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  आधार कार्ड का अगला हिस्सा कैमरे के सामने रखें
                </p>
                <button
                  type="button"
                  onClick={handleStartOCR}
                  className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 mx-auto transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>आधार कार्ड स्कैन करें</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* OCR Result View */}
        {scannedResult && (
          <div className="space-y-4 mb-6 animate-fadeIn">
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>UIDAI सर्वर द्वारा आधार सफलतापूर्वक सत्यापित हुआ!</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">स्कैन किया नाम:</span>
                <span className="font-bold text-white">{scannedResult.scannedName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">आधार संख्या:</span>
                <span className="font-mono text-cyan-400 font-bold">{scannedResult.aadhaarNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">जन्म तिथि:</span>
                <span className="text-slate-200">{scannedResult.dob}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">लिंग:</span>
                <span className="text-slate-200">{scannedResult.gender}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">पता:</span>
                <span className="text-right text-slate-300">{scannedResult.address}</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>यह डेटा प्रयुक्त करें (Use Scanned Aadhaar Data)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
