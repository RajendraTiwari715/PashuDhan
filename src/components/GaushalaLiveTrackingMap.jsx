import React, { useState, useEffect } from 'react';
import {
  Navigation,
  Truck,
  MapPin,
  Radio,
  Compass,
  Gauge,
  Clock,
  ShieldCheck,
  Building2,
  Maximize2,
  RefreshCw,
  Volume2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const GaushalaLiveTrackingMap = ({ initialUnitId = 'ALPHA-1', onIntakeComplete }) => {
  const [selectedUnitId, setSelectedUnitId] = useState(initialUnitId);
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [zoomLevel, setZoomLevel] = useState('NORMAL');
  const [sirenActive, setSirenActive] = useState(false);
  const [intakeSuccess, setIntakeSuccess] = useState(false);

  // Active Response Fleet Data
  const [fleet, setFleet] = useState([
    {
      id: 'ALPHA-1',
      callsign: 'रेस्क्यू एम्बुलेंस Alpha-1',
      plate: 'MP-04-GAU-9012',
      driver: 'राजेश सिंह (चालक)',
      driverPhone: '98260 99881',
      assignedTag: 'TAG-1004',
      assignedBreed: 'हरियाणवी (Haryanvi)',
      lat: 23.2624,
      lng: 77.4185,
      speedKmh: 42,
      bearingDeg: 215,
      distanceKm: 1.4,
      etaMinutes: 6,
      status: 'En Route to Gaushala',
      statusColor: 'amber',
      routeProgressPercent: 78,
      destination: 'श्री गोपाल गोशाला, भोपाल'
    },
    {
      id: 'BRAVO-2',
      callsign: 'गौ-रक्षा वाहन Bravo-2',
      plate: 'MP-04-GAU-8841',
      driver: 'कमलेश यादव (रेस्क्यू इंचार्ज)',
      driverPhone: '98261 44321',
      assignedTag: 'TAG-1001',
      assignedBreed: 'साहीवाल (Sahiwal)',
      lat: 23.2710,
      lng: 77.4320,
      speedKmh: 35,
      bearingDeg: 190,
      distanceKm: 3.8,
      etaMinutes: 14,
      status: 'On-Scene Treatment / Boarding',
      statusColor: 'cyan',
      routeProgressPercent: 42,
      destination: 'श्री गोपाल गोशाला, भोपाल'
    }
  ]);

  const [telemetryLogs, setTelemetryLogs] = useState([
    {
      timestamp: new Date().toLocaleTimeString('en-IN'),
      topic: '/topic/live-locations',
      unitId: 'ALPHA-1',
      payload: 'LAT: 23.2624, LNG: 77.4185 | SPD: 42km/h | BRG: 215°'
    }
  ]);

  const currentUnit = fleet.find(f => f.id === selectedUnitId) || fleet[0];

  // Real-time telemetry simulation loop (mimicking STOMP / WebSocket telemetry ingestion)
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setFleet(prevFleet =>
        prevFleet.map(unit => {
          // Progress vehicle closer to destination
          const newDistance = Math.max(0.1, +(unit.distanceKm - 0.05).toFixed(2));
          const newEta = Math.max(1, Math.round(newDistance * 3.5));
          const speedVar = Math.floor(36 + Math.random() * 14);
          const newLat = +(unit.lat + (Math.random() - 0.5) * 0.0008).toFixed(4);
          const newLng = +(unit.lng + (Math.random() - 0.5) * 0.0008).toFixed(4);
          const newProgress = Math.min(98, Math.round(unit.routeProgressPercent + 1));

          return {
            ...unit,
            lat: newLat,
            lng: newLng,
            speedKmh: newDistance < 0.3 ? 12 : speedVar,
            distanceKm: newDistance,
            etaMinutes: newEta,
            routeProgressPercent: newProgress
          };
        })
      );

      // Append real-time STOMP telemetry broadcast log
      const timeStr = new Date().toLocaleTimeString('en-IN');
      setTelemetryLogs(prev => [
        {
          timestamp: timeStr,
          topic: `/topic/complaint.${currentUnit.assignedTag}.tracking`,
          unitId: currentUnit.id,
          payload: `GPS: ${currentUnit.lat}, ${currentUnit.lng} | SPD: ${currentUnit.speedKmh} km/h | ETA: ${currentUnit.etaMinutes}m`
        },
        ...prev.slice(0, 5)
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveActive, currentUnit]);

  const handlePingSiren = () => {
    setSirenActive(true);
    setTimeout(() => setSirenActive(false), 3000);
  };

  const handleCompleteGateIntake = () => {
    setIntakeSuccess(true);
    if (onIntakeComplete) {
      onIntakeComplete(currentUnit);
    }
    setTimeout(() => setIntakeSuccess(false), 4000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                STOMP / WebSocket LIVE
              </span>
              <span className="text-xs text-slate-400 font-mono">P99 Latency: 48ms</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1">
              गोशाला रेस्क्यू वाहन लाइव लोकेशन ट्रैकिंग (CAD Telemetry)
            </h2>
          </div>
        </div>

        {/* Unit Selector Buttons */}
        <div className="flex items-center gap-2">
          {fleet.map(u => (
            <button
              key={u.id}
              onClick={() => setSelectedUnitId(u.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                selectedUnitId === u.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{u.callsign.split(' ')[1] || u.id}</span>
            </button>
          ))}
          <button
            onClick={() => setIsLiveActive(!isLiveActive)}
            className={`p-2 rounded-xl text-xs font-bold transition-colors ${
              isLiveActive ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
            }`}
            title={isLiveActive ? 'लाइव स्ट्रीम चालू' : 'लाइव स्ट्रीम रुकी हुई'}
          >
            <RefreshCw className={`w-4 h-4 ${isLiveActive ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Telemetry Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar & Visual Map View (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative w-full h-80 sm:h-96 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
            
            {/* Grid Coordinates Texture */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
            
            {/* Range Rings from Gaushala Center */}
            <div className="absolute w-72 h-72 rounded-full border border-dashed border-emerald-500/30 animate-[spin_40s_linear_infinite] flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full border border-emerald-500/20"></div>
              <div className="w-24 h-24 rounded-full border border-emerald-500/20"></div>
            </div>

            {/* Sweep Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/5 to-transparent animate-[spin_8s_linear_infinite] pointer-events-none"></div>

            {/* Road Route Path Visualization (Simulated vector highway path) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Highway Route */}
              <path
                d="M 120 70 Q 220 180 340 190 T 520 280"
                fill="none"
                stroke="#334155"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 120 70 Q 220 180 340 190 T 520 280"
                fill="none"
                stroke="#0d9488"
                strokeWidth="3"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </svg>

            {/* Gaushala Central Base Station Pin */}
            <div className="absolute top-16 left-28 z-20 flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 border-2 border-white flex items-center justify-center shadow-lg shadow-rose-600/50 hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="bg-slate-900/90 text-rose-300 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold mt-1.5 border border-rose-500/40 shadow">
                श्री गोपाल गोशाला (Intake Gate)
              </div>
            </div>

            {/* Active Response Vehicle Pin (Dynamic Position) */}
            <div
              className="absolute z-30 transition-all duration-1000 flex flex-col items-center cursor-pointer"
              style={{
                top: `${Math.min(75, 25 + (100 - currentUnit.routeProgressPercent) * 0.5)}%`,
                left: `${Math.min(80, 20 + currentUnit.routeProgressPercent * 0.6)}%`
              }}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-amber-500 border-2 border-white flex items-center justify-center shadow-lg shadow-amber-500/60 animate-bounce">
                  <Truck className="w-6 h-6 text-slate-950 font-bold" />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping"></span>
              </div>
              <div className="bg-slate-900/95 text-amber-300 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold mt-1 border border-amber-500/50 shadow whitespace-nowrap">
                {currentUnit.callsign} ({currentUnit.speedKmh} km/h)
              </div>
            </div>

            {/* Map Overlay Stats & Compass */}
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                GPS: {currentUnit.lat}°N, {currentUnit.lng}°E
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                Heading: {currentUnit.bearingDeg}° SW
              </span>
            </div>

            {/* Bottom Actions inside Map */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
              <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                <span className="text-slate-400 font-semibold">गंतव्य:</span>
                <span className="font-bold text-white">{currentUnit.destination}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePingSiren}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                    sirenActive
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-slate-800/90 hover:bg-slate-700 text-rose-400 border border-slate-700'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{sirenActive ? 'साइरन एक्टिव' : 'रिमोट साइरन टेस्ट'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Route Progress Gauge Bar */}
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-emerald-400" />
                रूट प्रगति (Route Completion):
              </span>
              <span className="text-emerald-400 font-mono font-bold">{currentUnit.routeProgressPercent}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${currentUnit.routeProgressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Live Metrics & Control Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Driver & Unit Information Card */}
          <div className="bg-slate-800/70 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {currentUnit.callsign}
              </div>
              <span className="font-mono text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                {currentUnit.plate}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">चालक / रेस्क्यू दल:</span>
                <span className="text-white font-semibold">{currentUnit.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">संपर्क नंबर:</span>
                <a href={`tel:${currentUnit.driverPhone}`} className="text-cyan-400 font-mono hover:underline">
                  {currentUnit.driverPhone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">रेस्क्यू गौवंश टैग:</span>
                <span className="text-emerald-400 font-mono font-bold">{currentUnit.assignedTag} ({currentUnit.assignedBreed})</span>
              </div>
            </div>

            {/* Speed & ETA Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/80 text-center">
                <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1">
                  <Gauge className="w-3 h-3 text-cyan-400" /> गति
                </div>
                <div className="text-lg font-black text-cyan-300 font-mono mt-0.5">
                  {currentUnit.speedKmh} <span className="text-[10px] text-slate-400 font-normal">km/h</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/80 text-center">
                <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" /> अनुमानित समय
                </div>
                <div className="text-lg font-black text-amber-300 font-mono mt-0.5">
                  {currentUnit.etaMinutes} <span className="text-[10px] text-slate-400 font-normal">min</span>
                </div>
              </div>
            </div>

            {/* Distance remaining */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">गोशाला से शेष दूरी:</span>
              <span className="text-emerald-400 font-mono font-bold text-sm">{currentUnit.distanceKm} KM</span>
            </div>

            {/* Gate Intake Action */}
            <button
              onClick={handleCompleteGateIntake}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>गोशाला गेट इनटेक सत्यापित करें</span>
            </button>

            {intakeSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>वाहन इनटेक एवं कस्टडी ट्रांसफर सफल!</span>
              </div>
            )}
          </div>

          {/* Real-time STOMP WebSocket Live Packet Stream */}
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-700 pb-2">
              <span className="font-bold text-slate-300">STOMP Telemetry Log:</span>
              <span className="text-emerald-400 font-bold">200ms Feed</span>
            </div>

            <div className="space-y-1.5 font-mono text-[10px] max-h-32 overflow-y-auto">
              {telemetryLogs.map((log, idx) => (
                <div key={idx} className="p-1.5 bg-slate-900/80 rounded border border-slate-800 text-slate-300">
                  <div className="flex justify-between text-slate-400">
                    <span className="text-amber-400">{log.topic}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div className="text-emerald-300 truncate mt-0.5">{log.payload}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
