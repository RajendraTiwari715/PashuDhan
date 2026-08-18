import React from 'react';
import { X, ArrowLeft, Building2, Navigation, Radio } from 'lucide-react';
import { GaushalaLiveTrackingMap } from './GaushalaLiveTrackingMap';

export const GaushalaLiveTrackingModal = ({
  isOpen,
  onClose,
  initialUnitId = 'ALPHA-1'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-6 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>वापस जाएं (Back)</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-bold text-white">गोशाला लाइव जीपीएस नेविगेशन एवं वाहन ट्रैकिंग</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Map Component */}
        <GaushalaLiveTrackingMap
          initialUnitId={initialUnitId}
          onIntakeComplete={() => {
            // Callback when gate intake is confirmed
          }}
        />
      </div>
    </div>
  );
};
