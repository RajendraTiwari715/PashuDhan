import React, { useEffect } from 'react';
import { sirenEngine } from '../services/geoFenceSiren';
import { Siren, VolumeX, MapPin } from 'lucide-react';

export const SirenAlertModal = ({ isOpen, onClose, animal }) => {
  useEffect(() => {
    if (isOpen) {
      sirenEngine.playSiren();
    } else {
      sirenEngine.stopSiren();
    }
    return () => sirenEngine.stopSiren();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border-2 border-rose-500 text-center space-y-5 animate-pulse">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto border-2 border-rose-300 shadow-lg shadow-rose-500/30">
          <Siren className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-1">
          <span className="bg-rose-100 text-rose-800 text-xs px-3 py-1 rounded-full font-bold border border-rose-300">
            हाईवे व संवेदनशील जोन अलर्ट
          </span>
          <h2 className="text-xl font-black text-rose-700">
            जिओ-फेंस परिधि उल्लंघन सायरन!
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            पशु अपने निर्धारित 500m बाड़े से बाहर निकलकर मुख्य मार्ग पर पहुंच गया है।
          </p>
        </div>

        {animal && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">टैग आईडी:</span>
              <span className="font-mono font-bold text-slate-900">{animal.tagId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">पशुपालक:</span>
              <span className="font-bold text-slate-900">{animal.ownerName || animal.owner?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">स्थान:</span>
              <span className="text-slate-700 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" />
                {animal.locationName || 'भोपाल हाईवे रोड'}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-600/30"
        >
          <VolumeX className="w-4 h-4" />
          <span>सायरन बंद करें एवं स्वीकार करें</span>
        </button>
      </div>
    </div>
  );
};