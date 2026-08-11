import React, { useState } from 'react';
import { getAnimalByTagId, getBlankTags } from '../services/storage';
import type { Animal } from '../types';
import { QrCode, Camera, Search, X, AlertCircle } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnimal: (animal: Animal) => void;
  onSelectBlankTag: (tagId: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onSelectAnimal,
  onSelectBlankTag
}) => {
  const [manualTagId, setManualTagId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleProcessTag = (tagId: string) => {
    const clean = tagId.trim().toUpperCase();
    if (!clean) return;

    const animal = getAnimalByTagId(clean);

    if (animal) {
      onSelectAnimal(animal);
      onClose();
      return;
    }

    // Check if it is a blank tag
    const blankTags = getBlankTags();
    const isBlank = blankTags.some(t => t.tagId.toUpperCase() === clean);

    if (isBlank || clean.startsWith('TAG-8') || clean.startsWith('TAG-9')) {
      onSelectBlankTag(clean);
      onClose();
      return;
    }

    setErrorMessage(`QR टैग "${clean}" डेटाबेस में नहीं मिला। कृपया पुनः प्रयास करें।`);
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

        {/* Modal Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <QrCode className="w-6 h-6 text-slate-950" />
          </div>
          <h3 className="text-xl font-bold text-white">पशु कान QR टैग स्कैनर</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            पशु के कान पर लगे QR कोड को कैमरे के सामने रखें
          </p>
        </div>

        {/* Simulated Camera Viewfinder */}
        <div className="relative aspect-square max-w-[280px] mx-auto rounded-3xl overflow-hidden border-2 border-emerald-500/50 shadow-2xl bg-slate-950 flex flex-col items-center justify-center mb-6">
          
          {/* Animated Scan Line */}
          <div className="animate-scan-line"></div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>

          {/* Center target UI */}
          <Camera className="w-12 h-12 text-emerald-400/40 mb-2 animate-bounce" />
          <span className="text-xs text-emerald-300/80 font-mono tracking-wider bg-slate-900/80 px-3 py-1 rounded-full border border-emerald-500/30">
            QR Tag Align Matrix
          </span>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sample Tag Quick Buttons (For Easy Demo & Testing) */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>त्वरित परीक्षण हेतु नमूना QR कोड (Quick Test Tags):</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleProcessTag('TAG-1001')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
            >
              <div className="text-[11px] font-mono text-emerald-400 font-bold group-hover:underline">TAG-1001</div>
              <div className="text-[10px] text-slate-300 truncate">गाय (साहीवाल)</div>
            </button>

            <button
              onClick={() => handleProcessTag('TAG-1002')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
            >
              <div className="text-[11px] font-mono text-emerald-400 font-bold group-hover:underline">TAG-1002</div>
              <div className="text-[10px] text-slate-300 truncate">गाय (गिर नस्ल)</div>
            </button>

            <button
              onClick={() => handleProcessTag('TAG-1003')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
            >
              <div className="text-[11px] font-mono text-emerald-400 font-bold group-hover:underline">TAG-1003</div>
              <div className="text-[10px] text-slate-300 truncate">भैंस (मुर्रा)</div>
            </button>

            <button
              onClick={() => handleProcessTag('TAG-8821')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-500/50 text-left transition-all group col-span-2 sm:col-span-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-300 font-bold">TAG-8821 (Paytm-style Blank Tag)</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded font-semibold">Unlinked</span>
              </div>
              <div className="text-[10px] text-slate-400">अनलिंक्ड नया QR कान टैग (Link in Admin Portal)</div>
            </button>
          </div>
        </div>

        {/* Manual Tag Entry */}
        <div className="pt-2 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            या टैग कोड मैनुअल प्रविष्ट करें (Enter Tag Code):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualTagId}
              onChange={(e) => setManualTagId(e.target.value)}
              placeholder="e.g. TAG-1001"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm uppercase placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleProcessTag(manualTagId)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>खोजें</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
