import React from 'react';
import { MapPin, Navigation, ShieldCheck, AlertTriangle, Radio } from 'lucide-react';

export const GeoFenceMap = ({ geoFence, currentLocation }) => {
  const isOutside = geoFence ? (geoFence.isOutsideFence || geoFence.lastCheckedDistanceMeters > geoFence.radiusMeters) : false;
  const radius = geoFence?.radiusMeters || 500;
  const currentDist = geoFence?.lastCheckedDistanceMeters || 120;

  return (
    <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-emerald-600 animate-pulse" />
          <h4 className="text-sm font-bold text-slate-800">
            जिओ-फेंस मैपिंग एवं लाइव GPS ट्रैकिंग
          </h4>
        </div>

        <div>
          {isOutside ? (
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              फेंस परिधि से बाहर (Breach Alert)
            </span>
          ) : (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              सुरक्षित परिधि में (Inside Safe Radius)
            </span>
          )}
        </div>
      </div>

      {/* Visual Simulated Satellite Radar */}
      <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 flex items-center justify-center shadow-inner">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Boundary Rings */}
        <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-emerald-400/70 animate-[spin_20s_linear_infinite] flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-emerald-500/30"></div>
        </div>

        {/* Center Base Station */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg shadow-blue-500/50">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <span className="bg-slate-900/90 text-white font-mono text-[9px] px-2 py-0.5 rounded font-bold mt-1 border border-slate-700">
            BASE: {geoFence?.centerLat || '23.25'}, {geoFence?.centerLng || '77.41'}
          </span>
        </div>

        {/* Real-time Animal Position Pin */}
        <div
          className={`absolute z-20 transition-all duration-700 flex flex-col items-center ${
            isOutside ? 'top-6 right-8 animate-bounce' : 'bottom-12 left-16'
          }`}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white ${
              isOutside ? 'bg-rose-600 shadow-rose-500/60' : 'bg-emerald-600 shadow-emerald-500/60'
            }`}
          >
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="bg-slate-900/90 text-slate-100 font-mono text-[8px] px-1.5 py-0.5 rounded font-bold mt-0.5 border border-slate-700">
            गोवंश स्थिति
          </span>
        </div>

        <div className="absolute bottom-3 right-3 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] text-slate-300 font-mono">
          सक्रिय त्रिज्या: {radius}m | दूरी: {currentDist}m
        </div>
      </div>
    </div>
  );
};