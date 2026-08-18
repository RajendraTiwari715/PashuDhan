import React, { useState } from 'react';
import { Bluetooth, CheckCircle2, AlertCircle, RefreshCw, X, Radio } from 'lucide-react';

export const BluetoothRFIDModal = ({ isOpen, onClose, onTagDetected }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanningBT, setIsScanningBT] = useState(false);
  const [lastScannedTag, setLastScannedTag] = useState(null);

  if (!isOpen) return null;

  const handlePairBluetooth = () => {
    setIsScanningBT(true);
    setTimeout(() => {
      setIsScanningBT(false);
      setIsConnected(true);
    }, 1500);
  };

  const handleSimulateTagDetection = (tagId) => {
    setLastScannedTag(tagId);
    if (onTagDetected) {
      onTagDetected(tagId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
            <Bluetooth className="w-6 h-6" />
          </div>
          <div>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
              134.2 kHz FDX-B / HDX
            </span>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">
              ब्लूटूथ RFID / NFC रीडर
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">रीडर कनेक्टिविटी:</span>
            {isConnected ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                कनेक्टेड (PashuDhan Stick-88)
              </span>
            ) : (
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-slate-400" />
                डिस्कनेक्टेड
              </span>
            )}
          </div>

          {!isConnected ? (
            <button
              onClick={handlePairBluetooth}
              disabled={isScanningBT}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              {isScanningBT ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>ब्लूटूथ रीडर खोजा जा रहा है...</span>
                </>
              ) : (
                <>
                  <Bluetooth className="w-4 h-4" />
                  <span>हैंडहेल्ड रीडर से पेयर करें</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold block">
                परीक्षण हेतु निकटवर्ती RFID चिप स्कैन करें:
              </span>
              <div className="flex flex-wrap gap-2">
                {['TAG-8821', 'TAG-9932', 'TAG-1102'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSimulateTagDetection(tag)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-mono font-bold text-xs px-3 py-1.5 rounded-lg border border-blue-200 transition-colors flex items-center gap-1"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {lastScannedTag && (
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>टैग स्कैन सफल: {lastScannedTag}</span>
          </div>
        )}
      </div>
    </div>
  );
};