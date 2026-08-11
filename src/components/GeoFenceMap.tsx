import React from 'react';
import type { GeoFence, LocationCoords } from '../types';
import { MapPin, Navigation, ShieldCheck, AlertTriangle, Radio } from 'lucide-react';

interface GeoFenceMapProps {
  geoFence: GeoFence;
  currentLocation: LocationCoords;
}

export const GeoFenceMap: React.FC<GeoFenceMapProps> = ({ geoFence, currentLocation }) => {
  const isOutside = geoFence.isOutsideFence || geoFence.lastCheckedDistanceMeters > geoFence.radiusMeters;

  return (
    <div className="p-5 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl">
      
      {/* Geo-fence Header & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h4 className="text-sm font-bold text-white">जिओ-फेंस मैपिंग एवं लाइव GPS ट्रैकिंग</h4>
        </div>

        <div>
          {isOutside ? (
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Case B: फेंस के बाहर (Stray Cattle Alert)</span>
            </span>
          ) : (
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Case A: स्वामित्‍व ऑन-प्रिमाइसेस (Safe)</span>
            </span>
          )}
        </div>
      </div>

      {/* Map Radar Visualizer */}
      <div className="relative aspect-[2/1] w-full rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Concentric Geo-fence circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-56 rounded-full border-2 border-emerald-500/30 bg-emerald-500/5 animate-pulse flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-emerald-400/40 bg-emerald-500/10"></div>
          </div>
        </div>

        {/* Center Home GPS Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/40">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded mt-1 border border-emerald-500/30">
            Home: {geoFence.homeAddress}
          </span>
        </div>

        {/* Live Cattle Position Marker */}
        <div 
          className={`absolute transition-all duration-700 flex flex-col items-center ${
            isOutside ? 'top-4 right-8' : 'bottom-8 left-1/3'
          }`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg text-white ${
            isOutside ? 'bg-rose-600 animate-bounce shadow-rose-600/50' : 'bg-cyan-500 shadow-cyan-500/40'
          }`}>
            <Navigation className="w-3.5 h-3.5" />
          </div>
          <span className={`text-[9px] font-mono px-2 py-0.5 rounded mt-1 border ${
            isOutside ? 'bg-rose-950/90 text-rose-300 border-rose-500/40' : 'bg-slate-950/80 text-cyan-300 border-cyan-500/30'
          }`}>
            Live GPS ({geoFence.lastCheckedDistanceMeters}m distance)
          </span>
        </div>
      </div>

      {/* Info Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">जिओ-फेंस दायरा</span>
          <span className="font-mono font-bold text-white">{geoFence.radiusMeters} मीटर Radius</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">डेयरी केंद्र से दूरी</span>
          <span className={`font-mono font-bold ${isOutside ? 'text-rose-400' : 'text-emerald-400'}`}>
            {geoFence.lastCheckedDistanceMeters} मीटर
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 block">वर्तमान लोकेशन</span>
          <span className="text-slate-200 truncate block">{currentLocation.addressName}</span>
        </div>
      </div>

    </div>
  );
};
