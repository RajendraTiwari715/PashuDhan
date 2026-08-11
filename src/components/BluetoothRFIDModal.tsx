import React, { useState } from 'react';
import { Bluetooth, CheckCircle2, AlertCircle, RefreshCw, X, Radio } from 'lucide-react';


interface BluetoothRFIDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTagDetected?: (tagId: string) => void;
}

export const BluetoothRFIDModal: React.FC<BluetoothRFIDModalProps> = ({
  isOpen,
  onClose,
  onTagDetected
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanningBT, setIsScanningBT] = useState(false);
  const [lastScannedTag, setLastScannedTag] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePairBluetooth = () => {
    setIsScanningBT(true);
    setTimeout(() => {
      setIsScanningBT(false);
      setIsConnected(true);
    }, 2000);
  };

  const handleSimulateTagProximity = () => {
    const demoTags = ['TAG-1001', 'TAG-1002', 'TAG-8821', 'TAG-9402'];
    const randomTag = demoTags[Math.floor(Math.random() * demoTags.length)];
    setLastScannedTag(randomTag);
    if (onTagDetected) onTagDetected(randomTag);
    alert(`📡 ब्लूटूथ RFID रीडर ने 15-अंकीय ISO टैग "${randomTag}" डिटेक्ट किया!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-cyan-500/40">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Bluetooth className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold">
              Web Bluetooth BLE API
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              📡 ब्लूटूथ RFID रीडर पेयरिंग
            </h3>
          </div>
        </div>

        {/* Bluetooth Device Connection Status */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold">स्टॉक RFID रीडर:</span>
            {isConnected ? (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> कनेक्टेड (BT-900)
              </span>
            ) : (
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-400" /> डिस्कनेक्टेड
              </span>
            )}
          </div>

          {isConnected && (
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>डिवाइस:</span>
                <span className="text-cyan-400 font-bold">PashuDhan RFID Stick Reader BT-900</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>सिग्नल RSSI:</span>
                <span className="text-emerald-400 font-bold">-54 dBm (उत्कृष्ट)</span>
              </div>
            </div>
          )}
        </div>

        {/* Pairing Actions */}
        {!isConnected ? (
          <button
            onClick={handlePairBluetooth}
            disabled={isScanningBT}
            className="mt-6 w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-slate-950 font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all"
          >
            {isScanningBT ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>ब्लूटूथ डिवाइस खोज रहे हैं...</span>
              </>
            ) : (
              <>
                <Bluetooth className="w-5 h-5" />
                <span>ब्लूटूथ RFID रीडर से पेयर करें</span>
              </>
            )}
          </button>
        ) : (
          <div className="space-y-3 mt-6">
            <button
              onClick={handleSimulateTagProximity}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <Radio className="w-5 h-5 animate-pulse" />
              <span>15-अंकीय ISO Tag ऑटो-स्कैन बीप सिमुलेट करें</span>
            </button>

            {lastScannedTag && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-mono font-bold animate-fadeIn">
                अंतिम स्कैन किया गया टैग: {lastScannedTag}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
